"use server";

import { getDocuments } from "@/firebase";

export async function getProducts() {
  const products: any = await getDocuments();
  return products;
}
