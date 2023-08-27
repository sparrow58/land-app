import { getLand } from "@/app/services/landService";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const data = await getLand(params.id);
  if (data === null) return NextResponse.json({ data: null }, { status: 404 });

  return NextResponse.json({ data: data }, { status: 200 });
}
