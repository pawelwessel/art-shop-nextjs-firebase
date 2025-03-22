import { getDocuments } from "@/firebase";
import { Metadata } from "next";
import VisitsChart from "./VisitsChart";
import { getPolishCurrency } from "../../../utils/getPolishCurrency";
import Link from "next/link";
import moment from "moment";
import "moment/locale/pl";
export const metadata: Metadata = {
  title: "Panel administracyjny",
};
export default async function Admin() {
  const pageViews = await getDocuments("page-views");
  const orders = await getDocuments("orders");
  return (
    <div className="p-6 lg:p-16">
      <div className="p-3 lg:p-6 bg-gray-100 border-gray-200 border mb-12">
        <h1 className="text-4xl font-cardo text-black">Cześć Eliza!</h1>
        <p className="text-justify text-gray-700">
          To jest Twój panel administracyjny. Posiadasz wgląd do aktywności
          użytkowników, zamówień i zapytań o obrazy. Możesz dodawać i zarządzać
          swoimi produktami na sklepie.
        </p>
      </div>
      <VisitsChart pageViews={pageViews} />
      <div className="mt-12">
        <h2 className="text-2xl font-cardo text-black mb-3">Zamówienia</h2>
        {orders
          .filter((order) => !order.finished)
          .sort((a, b) => b.creationTime - a.creationTime)
          .slice(0, 3)
          .map((order) => (
            <Link
              href="/admin/shop/orders"
              key={order.id}
              className="hover:bg-gray-200 duration-300 block mb-4 p-4 border border-gray-200"
            >
              <p className="text-gray-700">
                Klient: {JSON.parse(order.customerInfo).firstName}{" "}
                {JSON.parse(order.customerInfo).lastName}
              </p>
              <p className="text-gray-700">
                Kwota: {getPolishCurrency(order.price / 100)}
              </p>
              <p className="text-gray-700">
                Zamówiono: {moment(order.creationTime).fromNow()}
              </p>
              <p
                className={`text-gray-700 ${
                  moment().isAfter(moment(order.creationTime).add(2, "days"))
                    ? "text-red-500"
                    : moment().isAfter(
                        moment(order.creationTime).add(1, "days")
                      )
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                Zrealizuj do:{" "}
                {moment(order.creationTime).add(2, "days").format("LLL")}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
