import getImagesService from "@/app/services/reatState/getImagesService";
import { NextRequest, NextResponse } from "next/server";
import { addRealEstateImageUrlAsync } from "@/app/services/reatState/createService";
import { del, put } from "@vercel/blob";
import deleteImageAsync from "@/app/services/reatState/deleteImageService";
import { ApiResponse } from "@/app/Props/CommonProps";
interface Props {
  params: {
    id: string;
  };
}
export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const data = await req.formData();

  const file: File | null = data.get("image") as unknown as File;

  if (!file) return NextResponse.json({ success: false });

  const blob = await put(file.name, file, {
    access: "public",
  });

  // const { relativePath } = await uploadFile(file, "REImages");
  // const imageUrl = join(req.nextUrl.origin, relativePath);

  const imageUrl = blob.url;
  await addRealEstateImageUrlAsync(id, imageUrl);

  return NextResponse.json({
    success: true,
    data: { url: imageUrl },
  });
}

export async function GET(_req: NextRequest, { params: { id } }: Props) {
  const data = await getImagesService(id);
  if (data) {
    const response: ApiResponse<string[]> = {
      success: true,
      data: data.images,
    };
    return NextResponse.json(response);
  }
}
export async function DELETE(request: Request, { params: { id } }: Props) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get("url");

  if (urlToDelete) {
    const item = await deleteImageAsync(id, urlToDelete);
    if (item) {
      await del(urlToDelete);
      return NextResponse.json(
        { success: true, data: { url: urlToDelete } },
        { status: 200 }
      );
    } else {
      console.error("no image found");
      return NextResponse.json({ success: false }, { status: 404 });
    }
  }
  return NextResponse.json({ success: false }, { status: 404 });
}
