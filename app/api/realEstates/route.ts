import { RealEstateFormData } from "@/app/dataObjects/RealEstateFormData";
import { createRealEstateAsync } from "@/app/services/reatState/createService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: RealEstateFormData = await req.json();
  const result = await createRealEstateAsync(data);
  const response = { message: "created", data: result, id: result.id };
  return NextResponse.json(response);
}
