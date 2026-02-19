import { CATEGORY_TO_GUARDIAN_SECTION } from "@/entities/article/config";
import { Category, MOCK_ARTICLES } from "@/entities/article/model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { path } = await params;
  const { searchParams } = req.nextUrl;
  const routePath = path.join("/");

  // GET /search
  if (routePath === "search") {
    const section = searchParams.get("section");

    const category = Object.keys(CATEGORY_TO_GUARDIAN_SECTION).find(
      (category) =>
        CATEGORY_TO_GUARDIAN_SECTION[category as Category] === section
    );

    const results = section
      ? MOCK_ARTICLES.filter(({ sectionName }) => sectionName === category)
      : MOCK_ARTICLES;

    return NextResponse.json({
      response: {
        status: "ok",
        total: results.length,
        results,
      },
    });
  }

  // GET /{section}/{year}/{month}/{day}/{slug}
  const article = MOCK_ARTICLES.find(({ id }) => id === routePath);

  if (article) {
    return NextResponse.json({
      response: {
        status: "ok",
        content: article,
      },
    });
  }

  return NextResponse.json({
    response: {
      status: "ok",
      content: undefined,
    },
  });
}
