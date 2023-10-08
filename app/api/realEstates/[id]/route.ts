import { RealEstateFormData } from "./../../../dataObjects/RealEstateFormData";
import { updateRealEstate } from "@/app/services/reatState/createService";
import { deleteRealEstate } from "@/app/services/reatState/deleteService";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: {
    id: string;
  };
}
export async function DELETE(request: Request, { params }: Props) {
  console.log("params", params);
  console.log("deleting item", params.id);
  const itemId = await deleteRealEstate(params.id);
  if (itemId) return NextResponse.json({ seccuss: true }, { status: 200 });
  return NextResponse.json({ seccuss: false }, { status: 404 });
}
export async function PUT(req: NextRequest, { params }: Props) {
  const data: RealEstateFormData = await req.json();

  console.log("params", params);
  console.log("updating item", params.id);
  const result = await updateRealEstate(data);
  const response = { message: "updated", data: result, id: result.id };
  return NextResponse.json(response);
}
