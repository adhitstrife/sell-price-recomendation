import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ recipes: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Recipe created", recipe: body }, { status: 201 });
}
