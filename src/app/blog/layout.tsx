import Orders from "../../components/Home/Orders";
import ShopFooter from "../../components/Home/ShopFooter";
import PrepareCart from "../../components/Home/PrepareCart";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white overflow-hidden">
      {" "}
      <PrepareCart />
      {children}
      <div className="mt-12">
        <Orders />
      </div>
      <ShopFooter />
    </div>
  );
}
