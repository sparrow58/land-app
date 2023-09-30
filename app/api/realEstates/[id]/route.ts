import { deleteRealEstate } from "@/app/services/reatState/deleteService";
import { NextResponse } from "next/server";
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
