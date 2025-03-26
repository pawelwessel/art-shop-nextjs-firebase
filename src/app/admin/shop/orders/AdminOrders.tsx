"use client";
import { removeDocument, updateDocument } from "@/firebase";
import moment from "moment";
import "moment/locale/pl";
import { getPolishCurrency } from "../../../../../utils/getPolishCurrency";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

interface Order {
  id: string;
  creationTime: string;
  customerInfo: string;
  productName: string;
  price: number;
  finished?: boolean;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
}

const OrderCard = ({
  order,
  setOrders,
}: {
  order: Order;
  setOrders: Function;
}) => {
  const {
    firstName,
    lastName,
    street,
    houseNumber,
    postalCode,
    city,
    phoneNumber,
  }: CustomerInfo = JSON.parse(order.customerInfo);

  return (
    <div key={order.id} className="bg-white p-4 shadow-md relative">
      {order.finished && (
        <div className="absolute left-0 top-0 gap-4 w-full h-full bg-black/70 flex-col justify-center items-center flex text-center">
          <FaCheckCircle className="w-12 h-12 text-green-600" />
          <h3 className="text-3xl text-white">Zrealizowano</h3>
        </div>
      )}
      <div className="mb-2">
        <span className="font-bold">Data zamówienia:</span>{" "}
        {moment(order.creationTime).format("LLL")}
      </div>
      <div className="mb-2">
        <span className="font-bold">Klient:</span> {firstName} {lastName}
      </div>
      <div className="mb-2">
        <span className="font-bold">Adres:</span> {street} {houseNumber},{" "}
        {postalCode} {city}
      </div>
      <div className="mb-2">
        <span className="font-bold">Telefon:</span> {phoneNumber}
      </div>
      <div className="mb-2">
        <span className="font-bold">Produkt:</span> {order.productName}
      </div>
      <div className="mb-2">
        <span className="font-bold">Cena:</span>{" "}
        {getPolishCurrency(order.price / 100)}
      </div>
      {!order?.finished && (
        <button
          onClick={() =>
            updateDocument(["finished"], [true], "orders", order.id).then(
              () => {
                setOrders((prevOrders: Order[]) =>
                  prevOrders.map((o) =>
                    o.id === order.id ? { ...o, finished: true } : o
                  )
                );
                toast.success("Zrealizowano zamówienie pomyślnie!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                });
              }
            )
          }
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
        >
          Oznacz jako zrealizowane
        </button>
      )}
    </div>
  );
};

export default function AdminOrders({
  data,
  data2,
}: {
  data: Order[];
  data2: any;
}) {
  const [orders, setOrders] = useState(data);
  const [leads, setLeads] = useState(data2);
  return (
    <div className="min-h-screen w-full bg-gray-200 pt-24 px-3 lg:px-6">
      <div className="flex flex-col">
        <h2 className="font-cardo text-3xl font-bold mb-6 text-gray-800">
          Zamówienia
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} setOrders={setOrders} />
        ))}
      </div>
      <h2 className="font-cardo text-3xl font-bold mb-6 text-gray-800 mt-12">
        Wyceny
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {leads.map((lead: any) => (
          <LeadCard key={lead.id} lead={lead} setLeads={setLeads} />
        ))}
      </div>
    </div>
  );
}

const LeadCard = ({ lead, setLeads }: { lead: any; setLeads: Function }) => {
  const [remove, setRemove] = useState(false);
  return (
    <div key={lead.id} className="bg-white p-4 shadow-md relative">
      {remove && (
        <div className="absolute left-0 top-0 gap-4 w-full h-full bg-black/70 flex-col justify-center items-center flex text-center">
          <div className="font-ubuntu flex flex-col w-max max-w-full bg-white text-black p-3">
            <h1 className="font-bold">Czy chcesz usunąć?</h1>
            <div className="gap-4 grid grid-cols-2 mt-4">
              <button
                onClick={() => setRemove(false)}
                className="font-light p-3 bg-gray-200"
              >
                Nie
              </button>
              <button
                onClick={() =>
                  removeDocument("leads", lead.id).then(() => {
                    setLeads((prevLeads: any[]) =>
                      prevLeads.filter((l) => l.id !== lead.id)
                    );
                    toast.success("Usunięto wycenę pomyślnie!", {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                    });
                  })
                }
                className="font-light p-3 bg-red-500 hover:bg-red-600 duration-150 text-white"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
      {lead.finished && (
        <div className="absolute left-0 top-0 gap-4 w-full h-full bg-black/70 flex-col justify-center items-center flex text-center">
          <FaCheckCircle className="w-12 h-12 text-green-600" />
          <h3 className="text-3xl text-white font-cardo font-bold">
            Sprawdzono
          </h3>
        </div>
      )}
      <div className="flex flex-col gap-4 text-sm font-ubuntu font-light">
        <div>
          <span className="font-bold">Imię:</span> {lead.name}
        </div>
        <div>
          <span className="font-bold">Płótno:</span> {lead.base}
        </div>
        <div>
          <span className="font-bold">Kolor:</span> {lead.color}
        </div>
        <div>
          <span className="font-bold">Rozmiar:</span> {lead.size}
        </div>
        <div>
          <span className="font-bold">Styl:</span> {lead.style}
        </div>
        <div>
          <span className="font-bold">Technika:</span> {lead.technique}
        </div>
        <div>
          <span className="font-bold">Telefon:</span> {lead.phone}
        </div>
      </div>
      <div className="grid grid-cols-2 font-ubuntu mt-6 gap-4">
        {!lead?.finished && (
          <button
            onClick={() =>
              updateDocument(["finished"], [true], "leads", lead.id).then(
                () => {
                  setLeads((prevLeads: any[]) =>
                    prevLeads.map((l) =>
                      l.id === lead.id ? { ...l, finished: true } : l
                    )
                  );
                  toast.success("Sprawdzono zamówienie pomyślnie!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
                }
              )
            }
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 font-light"
          >
            Oznacz jako sprawdzone
          </button>
        )}
        <button
          onClick={() => setRemove(true)}
          className="bg-gray-200 text-black hover:bg-red-600 hover:text-white duration-500 p-3 font-light"
        >
          Usuń
        </button>
      </div>
    </div>
  );
};
