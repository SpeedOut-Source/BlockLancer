/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useConnectWalletStateStore } from "~/lib/states/connect_wallet_state";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { AlertTriangle } from "lucide-react";
import { addrShort, bytesToMB } from "~/lib/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { transactionCreate } from "~/lib/stellar/utils";
import useSWR from "swr";

const featureData = [
  {
    id: 1,
    label: "Description",
    basic: "What will you provide?",
    premium: "What will you provide?",
    deluxe: "What will you provide?",
  },
  {
    id: 2,
    label: "Duration",
    basic: "?? days",
    premium: "?? days",
    deluxe: "?? days",
  },
  { id: 3, label: "Revisions", basic: "None", premium: "2", deluxe: "4" },
  { id: 4, label: "Feature 1", basic: "❌", premium: "✔️", deluxe: "✔️" },
  { id: 5, label: "Feature 2", basic: "❌", premium: "✔️", deluxe: "✔️" },
  { id: 6, label: "Feature 3", basic: "❌", premium: "❌", deluxe: "✔️" },
  {
    id: 7,
    label: "Price",
    basic: "500 XLM",
    premium: "1000 XLM",
    deluxe: "1200 XLM",
  },
];

export interface GigType {
  id: string;
  title: string;
  img: string;
  user: string;
  date: string;
  plans: {
    id: number;
    basic: string;
    premium: string;
    deluxe: string;
  }[];
}

const SellGig = (props: GigType) => {
  const session = useSession();
  const router = useRouter();
  const isEditPage = ["/edit/[id]", "/create"].includes(router.pathname);

  const walletState = useConnectWalletStateStore();
  const [isWalletAva, setIsWalletAva] = useState(false);
  const inputThumImgRef = useRef<HTMLInputElement | null>(null);

  // get data from buyinfo using swr get request
  const { data: orderData } = useSWR<{
    data: { data: { id: string; secret: string; gigId: string }[] };
  }>(`/api/buyInfo?gigId=${props.id}`, axios);

  useEffect(() => {
    setIsWalletAva(walletState.isAva);
  }, [walletState.isAva]);

  const [isLoadingThum, setIsLoadingThum] = useState(false);
  const [imageThumUrl, setImageThumUrl] = useState<string | ArrayBuffer | null>(
    props.img,
  );

  const handlerThumbImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let file: File;

    if (files?.[0]) {
      file = files[0];

      const limitBytes = 1048576;

      if (file.size > limitBytes) {
        inputThumImgRef.current!.value = "";
        toast.error(`File size exceeds limit of ${bytesToMB(limitBytes)}MB`);
        return;
      }
    } else {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onloadstart = () => setIsLoadingThum(true);
    fileReader.onload = () => {
      setImageThumUrl(fileReader.result);
      setIsLoadingThum(false);
    };

    fileReader.onerror = () => {
      toast.error("Error loading the image");
      setIsLoadingThum(false);
    };

    fileReader.readAsDataURL(file);
  };

  async function buy(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    amount: string,
  ) {
    e.preventDefault();

    const { issuerAcc } = await transactionCreate(walletState.pubkey, amount);

    const id = Math.random().toString(36).substring(7);

    await toast.promise(
      axios.post("/api/buy", {
        id,
        secret: issuerAcc.secret(),
        gigId: props.id,
      }),
      {
        loading: "Saving order info...",
        success: <b>success</b>,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error: (e) => <b>{e.response.data.message}</b>,
      },
    );
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const plans = [];

    for (let index = 1; index <= 7; index++) {
      const basic = data[`basic-${index}`];
      const premium = data[`premium-${index}`];
      const deluxe = data[`deluxe-${index}`];

      plans.push({ id: index, basic, premium, deluxe });
    }

    try {
      const res = await toast.promise(
        axios.post("/api/create", {
          user: walletState.pubkey,
          img: imageThumUrl,
          title: data.title,
          plans,
          date: new Date().valueOf().toString(),
          id: router.query.id as string,
        } as GigType),
        {
          loading: "Uploading...",
          success: <b>Added file info!</b>,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          error: (e) => <b>{e.response.data.message}</b>,
        },
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      await router.push(`/view/${res.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  async function deleteHandler() {
    try {
      await toast.promise(
        axios.get("/api/delete", {
          params: {
            id: router.query.id as string,
          },
        }),
        {
          loading: "Deleting...",
          success: <b>Deleted file info!</b>,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          error: (e) => <b>{e.response.data.message}</b>,
        },
      );
      router.back();
    } catch (error) {
      console.error(error);
    }
  }

  if (isEditPage && !isWalletAva) {
    return (
      <div className="alert alert-warning">
        <AlertTriangle className="mr-2 h-5 w-5" />
        <span>Connect your wallet!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <div className="btn-group ">
        {session.status === "authenticated" && (
          <button className="btn-glass btn bg-red-700 font-extrabold">
            Admin
          </button>
        )}

        {((props.user && isWalletAva && walletState.pubkey === props.user) ||
          session.status === "authenticated") && (
          <>
            <button
              onClick={() => void deleteHandler()}
              className="btn bg-red-500"
            >Delete
            </button>
            <Link href={`/edit/${props.id}`} className="btn bg-amber-700">
              Edit
            </Link>
          </>
        )}
      </div>
      <form
        className="flex flex-col gap-5 p-5"
        onSubmit={(e) => void submitHandler(e)}
      >
        <div className="flex flex-col gap-5 lg:flex-row xl:mx-20">
          <div className="flex flex-col gap-5">
            <p className="w-fit rounded-xl bg-gradient-to-l from-purple-400 via-purple-600 to-purple-800 p-2 px-10 font-bold text-white">
              Sell Post
            </p>
            {isEditPage ? (
              <input
                type="text"
                placeholder="Enter GIG title"
                className="input input-bordered w-full"
                name="title"
                defaultValue={props.title}
                required
              />
            ) : (
              <div>
                <p className="ml-5 mt-5 text-2xl font-medium text-white">
                  {props.title}
                </p>
                <p className="mt-2 text-sm font-medium text-white/60">
                  GIG ID: {props.id}
                </p>
              </div>
            )}

            <div className="ml-5 mr-10 flex items-center justify-between">
              <p className="mt-2.5 text-gray-400">
                User: {addrShort(isEditPage ? walletState.pubkey : props.user)}
              </p>
              {props.date && (
                <p className="mt-2.5 text-gray-400">
                  Date: {new Date(+props.date).toLocaleDateString()}
                </p>
              )}
            </div>
            {isEditPage && (
              <div className="m-2 mr-36 flex flex-col gap-2">
                <div className="inputField">
                  <span className="w-[18.4rem] text-amber-100">
                    Upload GIG thumbnail
                  </span>
                  <div className="w-full">
                    <input
                      ref={inputThumImgRef}
                      onChange={handlerThumbImage}
                      className="file-input w-full text-sm text-gray-500"
                      type="file"
                      accept="image/jpeg, image/png"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="mt-5 flex items-center">
              <div
                className={`rounded-2xl border border-white/80 p-3 backdrop-blur`}
              >
                <span className="text-sm tracking-wider text-gray-200">
                  What people will see:
                </span>
                <div
                  style={{
                    backgroundImage: `url(${imageThumUrl as string})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className="group relative flex h-72 w-72 rounded-3xl border-8 border-white/40 lg:mt-10 xl:mt-10"
                >
                  {isLoadingThum ? (
                    <span className="btn btn-circle loading mx-auto my-auto" />
                  ) : (
                    imageThumUrl === null && (
                      <PhotoIcon className="flex h-full w-full justify-center text-white/40" />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <table className="table mt-8 overflow-x-auto rounded-md border-2 md:mt-24 lg:max-w-lg xl:max-w-xl">
              <thead>
                <tr className="bg-zinc-500 font-extrabold text-white">
                  <th></th>
                  <th colSpan={2} className="font-extrabold">
                    Features
                  </th>
                  <th>Basic</th>
                  <th>Premium</th>
                  <th>Deluxe</th>
                </tr>
              </thead>
              <tbody>
                {featureData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover bg-white/40 font-bold text-white"
                  >
                    <th className="font-extrabold">{item.id}</th>
                    <td colSpan={2}>{item.label}</td>
                    <td>
                      {isEditPage ? (
                        <input
                          type={item.label == "Price" ? "number" : "text"}
                          placeholder="Basic plan price"
                          className="input input-bordered w-full font-extralight text-white/50"
                          name={`basic-${item.id}`}
                          defaultValue={
                            props.id
                              ? props.plans[item.id - 1]?.basic
                              : item.basic
                          }
                          required
                        />
                      ) : (
                        <span>{props.plans[item.id - 1]?.basic}</span>
                      )}
                    </td>
                    <td>
                      {isEditPage ? (
                        <input
                          type={item.label == "Price" ? "number" : "text"}
                          placeholder="Premium plan price"
                          className="input input-bordered w-full  font-extralight text-white/50"
                          name={`premium-${item.id}`}
                          defaultValue={
                            props.id
                              ? props.plans[item.id - 1]?.premium
                              : item.premium
                          }
                          required
                        />
                      ) : (
                        <span>{props.plans[item.id - 1]?.premium}</span>
                      )}
                    </td>
                    <td>
                      {isEditPage ? (
                        <input
                          type={item.label == "Price" ? "number" : "text"}
                          placeholder="Deluxe Plan Price"
                          className="input input-bordered w-full  font-extralight text-white/50"
                          name={`deluxe-${item.id}`}
                          defaultValue={
                            props.id
                              ? props.plans[item.id - 1]?.deluxe
                              : item.deluxe
                          }
                          required
                        />
                      ) : (
                        <span>{props.plans[item.id - 1]?.deluxe}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {orderData && orderData.data.data.length !== 0 && (
          <div className="text-center text-white">Orders</div>
        )}

        {orderData &&
          orderData.data.data.map((item) => (
            <div key={item.id} className="collapse bg-base-100">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                {item.id}
              </div>
              <div className="collapse-content">
                <p>Secret: {item.secret}</p>
              </div>
            </div>
          ))}

        {props.id && (
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-xl bg-white/70 px-10 py-4">
              <div className="mb-2 font-extrabold text-stone-950">
                Choose your order
              </div>
              <div className="flex gap-x-5">
                <button
                  onClick={(e) => {
                    void buy(e, props.plans[6]!.basic);
                  }}
                  className="btn btn-primary btn-outline"
                >
                  Basic
                </button>
                <button
                  onClick={(e) => {
                    void buy(e, props.plans[6]!.premium);
                  }}
                  className="btn btn-secondary btn-outline"
                >
                  Premium
                </button>
                <button
                  onClick={(e) => {
                    void buy(e, props.plans[6]!.deluxe);
                  }}
                  className="btn btn-accent btn-outline"
                >
                  Deluxe
                </button>
              </div>
            </div>
          </div>

          // Get buy info list
        )}

        {isEditPage && (
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default SellGig;
