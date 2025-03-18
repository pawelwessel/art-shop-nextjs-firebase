"use client";
import { setModalVisible } from "@/redux/slices/actionSlice";
import { useDispatch } from "react-redux";

export default function Cta({ label }: { label: string }) {
  const dispatch = useDispatch();

  function setModalVisibility(action: string) {
    dispatch(setModalVisible(action));
  }
  return (
    <button
      onClick={() => setModalVisibility("client")}
      className="z-20 bg-black text-white py-3 px-6 shadow-md transition duration-300 hover:bg-gray-800"
    >
      {label}
    </button>
  );
}
