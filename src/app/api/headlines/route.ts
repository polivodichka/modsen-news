import { NextResponse } from "next/server";
import { getTopHeadlines } from "@/entities/article";

export async function GET() {
  const articles = await getTopHeadlines();
  return NextResponse.json(articles);
}