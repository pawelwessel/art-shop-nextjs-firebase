"use server";

import { getDocuments } from "@/firebase";

export async function getProducts() {
  const products: any = getDocuments("products");
  return products;
}
