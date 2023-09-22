import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { uploadFile } from "@/app/helpers/uploadHelper";
import { addRealEstateImageUrlAsync } from "@/app/services/reatState/createService";
import { put } from "@vercel/blob";
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

  const blob = await put(file.name, file, {
    access: "public",
  });

  // const { relativePath } = await uploadFile(file, "REImages");
  console.log(blob);
  // const imageUrl = join(req.nextUrl.origin, relativePath);

  const imageUrl = blob.url;
  const updated = await addRealEstateImageUrlAsync(id, imageUrl);

  return NextResponse.json({
    success: true,
    data: { imageUrl: imageUrl },
  });
}
