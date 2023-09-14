import { getLands } from "@/app/services/landService";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("getting lands");
  const data = await getLands();
  return NextResponse.json({ data: data }, { status: 200 });
}
