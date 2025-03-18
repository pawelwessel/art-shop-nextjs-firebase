import { getDocuments } from "@/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getDocuments("products");
  return NextResponse.json(products);
}
