"use client";
import { addDocument } from "@/firebase";
import { setModalVisible } from "@/redux/slices/actionSlice";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
export default function Cta({ label }: { label: string }) {
  const dispatch = useDispatch();

  function setModalVisibility(action: string) {
    dispatch(setModalVisible(action));
  }
  return (
    <button
      onClick={() => {
        const id = uuid();
        setModalVisibility("client");
        addDocument("formEngagements", id, {
          createdAt: new Date(),
          id,
        });
      }}
      className="z-20 bg-black text-white py-3 px-6 shadow-md transition duration-300 hover:bg-gray-800"
    >
      {label}
    </button>
  );
}
