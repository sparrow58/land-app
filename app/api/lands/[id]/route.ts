import { getLand } from "@/app/services/landService";
import { NextResponse } from "next/server";
interface Props {
  params: {
    id: string;
  };
}
export async function GET(request: Request, { params: { id } }: Props) {
  const data = await getLand(id);
  if (data === null) return NextResponse.json({ data: null }, { status: 404 });

  return NextResponse.json({ data: data }, { status: 200 });
}
