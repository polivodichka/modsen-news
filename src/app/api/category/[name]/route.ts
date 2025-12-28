import { NextResponse } from "next/server";
import { getArticlesByCategory } from "@/entities/article";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const articles = await getArticlesByCategory(name);
  return NextResponse.json(articles);
}
