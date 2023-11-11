import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useConnectWalletStateStore } from "~/lib/states/connect_wallet_state";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { AlertTriangle } from "lucide-react";
import { addrShort, bytesToMB } from "~/lib/utils";
import { useRouter } from "next/router";
import Link from "next/link";

const featureData = [
  {
    id: 1,
    label: "Description",
    basic: "I will do this but only this",
    premium: "I will do this but also do this",
    deluxe: "I will do everything",
  },
  {
    id: 2,
    label: "Duration",
    basic: "5 days",
    premium: "3 days",
    deluxe: "2 days",
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
  console.log(props);
  const router = useRouter();
  const isEditPage = ["/edit/[id]", "/create"].includes(router.pathname);

  console.log(isEditPage, router.pathname);
  const walletState = useConnectWalletStateStore();
  const [isWalletAva, setIsWalletAva] = useState(false);
  const inputThumImgRef = useRef<HTMLInputElement | null>(null);

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
    <div className="flex flex-col gap-5 p-5 items-center">
      {props.user && walletState.pubkey === props.user && (
        <div className="btn-group">
          <button onClick={() => void deleteHandler()} className="btn">
            Delete
          </button>
          <Link href={`/edit/${props.id}`} className="btn">
            Edit
          </Link>
        </div>
      )}
      <form
        className="flex flex-col gap-5 p-5"
        onSubmit={(e) => void submitHandler(e)}
      >
        <div className="flex flex-col gap-5 lg:flex-row xl:mx-20">
          <div className="flex flex-col gap-5">
            <p className="ml-5 w-fit rounded-xl bg-violet-400 p-2 px-10 font-bold text-black">
              Sell Post
            </p>
            {isEditPage ? (
              <input
                type="text"
                placeholder="Enter your title"
                className="input input-bordered w-full"
                name="title"
                defaultValue={props.title}
                required
              />
            ) : (
              <p className="ml-5 mt-5 text-2xl font-medium text-white">
                {props.title}
              </p>
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
              <div className="m-2 mx-28 flex flex-col gap-2">
                <div className="inputField">
                  <span className="w-[18.4rem]">Upload thumbnail</span>
                  <div className="w-full">
                    <input
                      ref={inputThumImgRef}
                      onChange={handlerThumbImage}
                      required
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
                <span className="text-sm tracking-wider text-gray-500">
                  Thumbnail image
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

          <div className="mt-24 overflow-x-auto rounded-md border-2 lg:max-w-lg xl:max-w-xl">
            <table className="table">
              <thead>
                <tr className="bg-zinc-500 font-extrabold text-black">
                  <th></th>
                  <th colSpan={2}>Features</th>
                  <th>Basic</th>
                  <th>Premium</th>
                  <th>Deluxe</th>
                </tr>
              </thead>
              <tbody>
                {featureData.map((item) => (
                  <tr key={item.id} className="hover">
                    <th>{item.id}</th>
                    <td colSpan={2}>{item.label}</td>
                    <td>
                      {isEditPage ? (
                        <input
                          type="text"
                          placeholder="Enter your basic"
                          className="input input-bordered w-full"
                          name={`basic-${item.id}`}
                          defaultValue={
                            props.id ? props.plans[item.id]?.basic : item.basic
                          }
                          required
                        />
                      ) : (
                        <span>{item.basic}</span>
                      )}
                    </td>
                    <td>
                      {isEditPage ? (
                        <input
                          type="text"
                          placeholder="Enter your premium"
                          className="input input-bordered w-full"
                          name={`premium-${item.id}`}
                          defaultValue={
                            props.id
                              ? props.plans[item.id]?.premium
                              : item.premium
                          }
                          required
                        />
                      ) : (
                        <span>{item.premium}</span>
                      )}
                    </td>
                    <td>
                      {isEditPage ? (
                        <input
                          type="text"
                          placeholder="Enter your deluxe"
                          className="input input-bordered w-full"
                          name={`deluxe-${item.id}`}
                          defaultValue={
                            props.id
                              ? props.plans[item.id]?.deluxe
                              : item.deluxe
                          }
                          required
                        />
                      ) : (
                        <span>{item.deluxe}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
