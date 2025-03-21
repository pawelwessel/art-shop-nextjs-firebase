import Image from "next/image";
import { Post } from "@/types";
import { getDocuments } from "@/firebase";

export default async function Page() {
  const posts: any = await getDocuments("blog");
  return (
    <div className="p-12">
      <h1 className="text-2xl text-white">Blog</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 ">
        {posts &&
          posts?.map((post: Post, i: number) => (
            <div
              key={i}
              className="cursor-pointer group relative aspect-square h-max flex flex-col hover:bg-green-300 hover:p-1 duration-300 ease-in-out rounded-lg shadow-md  shadow-zinc-700"
            >
              <div className="w-full overflow-hidden flex items-start">
                <Image
                  src={post.mainImage}
                  width={1024}
                  height={1024}
                  alt=""
                  className="w-full object-contain rounded-lg shadow-md shadow-zinc-700"
                />
              </div>
              <h1 className="group-hover:bg-gray-200 duration-300 group-hover:p-4 absolute bottom-3 left-3 right-3 text-base lg:text-xl  drop-shadow-xl shadow-black mt-3 bg-white text-zinc-700 font-bold  text-left p-3 rounded-lg">
                {post.title}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
}
