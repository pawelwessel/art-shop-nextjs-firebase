import { getDocuments } from "@/firebase";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const products = await getDocuments("products");
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
