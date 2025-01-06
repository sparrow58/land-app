import { RealEstateFormData } from "@/app/fromSchemas/realEstateFormSchema";
import { createRealEstateAsync } from "@/app/services/reatState/createService";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({ req: req });
  if (!token) {
    return NextResponse.error();
  }
  const data: RealEstateFormData = await req.json();
  const result = await createRealEstateAsync(data, token.id);
  const response = { message: "created", data: result, id: result.id };
  return NextResponse.json(response);
}
