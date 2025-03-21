import AdminProducts from "./AdminProducts";
import Ranking from "./Ranking";

export default async function Page() {
  const products: any = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`
  ).then((res) => res.json());
  return (
    <div className="p-6 lg:p-16">
      <h1 className="text-3xl font-cardo text-black">Obrazy na stronie</h1>
      <Ranking data={products} />
      <AdminProducts data={products} />
    </div>
  );
}
