"use server";
export async function getProducts() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
    next: { revalidate: 60 },
  });
  const products = await req.json();
  return products;
}
