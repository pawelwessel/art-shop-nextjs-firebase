import { getDocuments } from "@/firebase";
import Image from "next/image";

export default async function Page() {
  const products: any = await getDocuments("products");
  return (
    <div>
      <h1>Obrazy na stronie</h1>
      <div className="flex flex-row flex-wrap h-max bg-rose-200">
        {products?.length > 0 &&
          products?.map((item: any, i: any) => (
            <div className={`flex flex-col relative h-max`} key={i}>
              <Image
                className={`max-h-[300px] w-auto space-x-3 bg-gray-300`}
                width={1024}
                height={1024}
                src={item.images[0].src}
                alt=""
                key={i}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
