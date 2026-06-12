import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ language: "id", lastRecipeId: null });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Settings saved", settings: body });
}
