import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { uploadFile } from "@/app/helpers/uploadHelper";
import { addRealEstateImageUrlAsync } from "@/app/services/reatState/createService";
interface Props {
  params: {
    id: string;
  };
}
export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const data = await req.formData();
  console.log("data", data);
  console.log("host: ", req.nextUrl.origin);
  const file: File | null = data.get("image") as unknown as File;

  if (!file) return NextResponse.json({ success: false });

  // const blob = await put(file.name, file, {
  //   access: "public",
  // });
  const { relativePath } = await uploadFile(file, "REImages");

  const imageUrl = join(req.nextUrl.origin, relativePath);

  console.log("image Url: ", imageUrl);

  const updated = await addRealEstateImageUrlAsync(id, imageUrl);

  console.log("updated item", updated);
  return NextResponse.json({
    success: true,
    data: { imageUrl: imageUrl },
  });
}
