import { promises } from "fs";

async function loadMonoCounter() {
  const data = await promises.readFile("public/privacy-policy.md", "utf8");
  return Buffer.from(data);
}
export async function PrivacyServer() {
  const data = (await loadMonoCounter()).toString();
  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}
