"use client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDocument, storage } from "../../../../firebase/index";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";
import { ArtworkData } from "@/types";
import { v4 as uuid } from "uuid";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
const ReactQuill = dynamic(() => import("react-quill-new"));

export const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["clean"],
];
export default function AddProduct() {
  const [isLoading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [artworkData, setArtworkData] = useState<any>({
    title: "",
    images: [],
    tags: [],
    price: 0,
    description: "",
    dimensions: "",
    mainImage: "",
  });
  function add() {
    if (!artworkData.mainImage) {
      return toast.error("Proszę wybrać obrazek główny!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    setLoading(true);
    const randId = `image-${uuid()}`;
    addDocument("products", randId, {
      ...artworkData,
      category: "paintings",
      id: randId,
    }).then(() => {
      toast.success("Dodano do sklepu pomyślnie!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
    });
    setIsAdded(true);
  }

  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState();
  async function upload(files: any) {
    setUploadCount(files.length);
    setUploading(true);
    const localImagesArray: any = [];
    const uploadFile = async (file: any) => {
      const randId = uuid();
      const imageRef = ref(storage, randId);
      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        const data = {
          src: url,
        };
        localImagesArray.push(data);
      } catch (error) {
        return;
      }
    };

    // Iterate through each file and upload
    const uploadPromises = files.map(uploadFile);

    try {
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      setArtworkData((prevData: any) => ({
        ...prevData,
        images: [...prevData.images, ...localImagesArray],
      }));

      setLoading(false);
      setUploading(false);
    } catch (error) {
      setLoading(false);
      setUploading(false);
      return;
    }
  }
  function handleArtworkDataChange(key: keyof ArtworkData, value: any) {
    setArtworkData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  }

  return (
    <div className="relative p-3 lg:p-16 bg-slate-600 min-h-screen">
      {isUploading && (
        <div className="z-[50] bg-black/70 text-white text-3xl font-light fixed left-0 top-0 w-full h-screen flex items-center justify-center text-center">
          Dodawanie {uploadCount} obrazów...
        </div>
      )}
      {isLoading && (
        <div className="z-[50] bg-black/70 text-white text-3xl font-light fixed left-0 top-0 w-full h-screen flex items-center justify-center text-center">
          Poczekaj...
        </div>
      )}
      <div className="w-full">
        <h1 className="text-center text-2xl lg:text-4xl font-bold text-white">
          Dodajesz nowy obraz
        </h1>
        <div className="p-4 rounded-lg bg-[#222430] w-full mt-12">
          <div className="flex flex-col">
            <span className="font-bold mb-3 text-xl text-white">Nazwa</span>
            <input
              className={`text-zinc-700 p-2 rounded-md ${
                artworkData.title ? "border-2 border-green-500" : "border-2"
              }`}
              type="text"
              value={artworkData.title}
              onChange={(e) => handleArtworkDataChange("title", e.target.value)}
            />
          </div>
        </div>
        <div className="p-4 rounded-lg bg-[#222430] w-full mt-4">
          <div className="flex flex-col">
            <span className="font-bold mb-3 text-xl text-white">Opis</span>
            <ReactQuill
              placeholder=""
              className={`border rounded-md border-primaryStart/70 text-black bg-white w-full`}
              value={artworkData?.description}
              onChange={(e) => {
                setArtworkData({
                  ...artworkData,
                  description: e,
                });
              }}
            />
          </div>
        </div>
        <div className="mt-4 bg-[#222430] p-4 rounded-lg w-full">
          <div>
            <p className="font-bold mb-3 text-xl text-white">
              {artworkData.images.length ? "Wybrane zdjęcia" : "Dodaj zdjęcia"}
            </p>
            {artworkData.images.length > 0 && !artworkData.mainImage && (
              <p className="text-white text-sm">
                Wybierz zdjęcie główne klikając na obrazek
              </p>
            )}
          </div>
          <div className="min-w-full flex flex-row space-x-2 mt-2">
            {artworkData?.images?.map((item: any, i: any) => (
              <div key={i} className="relative h-[150px] w-auto aspect-square">
                <Image
                  onClick={() =>
                    setArtworkData({ ...artworkData, mainImage: item.src })
                  }
                  src={item.src}
                  width={256}
                  height={256}
                  alt=""
                  className={`${
                    isLoading ? "blur-sm" : "blur-none"
                  } absolute inset-0 object-cover w-full h-full border-2 bg-slate-100 rounded-lg ${
                    artworkData.mainImage === item.src
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => {
                    setArtworkData((prevData: any) => ({
                      ...prevData,
                      images: prevData.images.filter(
                        (_: any, index: any) => index !== i
                      ),
                    }));
                  }}
                >
                  Usuń
                </button>
              </div>
            ))}
            <label
              htmlFor="fileUpload"
              className="h-[150px] aspect-square text-center flex w-max flex-col relative items-center justify-center bg-white rounded-lg"
            >
              <FaUpload className="text-4xl text-[#222430]" />
              <span className="text-lg"></span>
            </label>
            <input
              className="hidden"
              id="fileUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={(e: any) => {
                const files = e.target.files;
                const imageFiles = Array.from(files).filter((file: any) =>
                  file.type.startsWith("image/")
                );
                upload(imageFiles);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-[#222430] w-full mt-4">
            <span className="font-bold text-xl text-white mb-3 block">
              Tagi
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem(
                  "tagInput"
                ) as HTMLInputElement;
                const newTag = input.value;
                if (newTag && !artworkData.tags.includes(newTag)) {
                  setArtworkData((prevData: any) => ({
                    ...prevData,
                    tags: [...prevData.tags, newTag],
                  }));
                }
                input.value = "";
              }}
              className="flex flex-col"
            >
              <input
                type="text"
                name="tagInput"
                placeholder="Dodaj tag"
                className="text-zinc-700 p-2 rounded-md"
              />
              <div className="flex flex-wrap gap-2 mt-2"></div>
              {artworkData?.tags?.map((tag: any, i: any) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className="text-white">{tag}</span>
                  <button
                    type="button"
                    className="ml-3 text-red-500"
                    onClick={() => {
                      setArtworkData((prevData: any) => ({
                        ...prevData,
                        tags: prevData.tags.filter(
                          (_: any, index: any) => index !== i
                        ),
                      }));
                    }}
                  >
                    Usuń
                  </button>
                </div>
              ))}

              <button
                type="submit"
                className="rounded-md bg-blue-500 text-white py-1.5 px-3 block"
              >
                Dodaj tag
              </button>
            </form>
          </div>

          <div className="p-4 rounded-lg bg-[#222430] w-full mt-4">
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white">Cena</span>
              <p className="text-white text-sm">
                Jeśli nie podasz ceny, pojawi się przycisk kontaktu
              </p>
              <input
                className={`mt-1.5 font-bold text-zinc-700 p-2 rounded-md ${
                  artworkData.price ? "border-2 border-green-500" : "border-2"
                }`}
                min={0}
                max={99999999}
                type="number"
                value={artworkData.price}
                onChange={(e) =>
                  handleArtworkDataChange("price", parseInt(e.target.value))
                }
              />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#222430] w-full mt-4">
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white">Wymiary</span>
              <p className="text-white text-sm">(100x40)</p>
              <input
                className={`mt-1.5 font-bold text-zinc-700 p-2 rounded-md ${
                  artworkData.dimensions
                    ? "border-2 border-green-500"
                    : "border-2"
                }`}
                type="text"
                value={artworkData.dimensions}
                onChange={(e) =>
                  handleArtworkDataChange("dimensions", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-4 mx-auto w-max mb-4 space-x-6">
          {!isAdded && (
            <button
              disabled={isLoading}
              onClick={() => {
                add();
              }}
              className="rounded-lg px-6 bg-green-500 hover:bg-green-400 p-2 duration-200 text-white text-lg disabled:cursor-not-allowed disabled:bg-green-200"
            >
              {isLoading ? "ŁADOWANIE" : "Dodaj do sklepu"}
            </button>
          )}
          {isAdded && (
            <button
              disabled={isLoading}
              onClick={() => {
                window.location.reload();
              }}
              className="rounded-lg px-6 bg-gray-500 hover:bg-gray-400 p-2 duration-200 text-white text-lg disabled:cursor-not-allowed disabled:bg-green-200"
            >
              Dodaj następny
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
