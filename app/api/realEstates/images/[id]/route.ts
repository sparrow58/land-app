import { existsSync, mkdirSync, writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile, mkdir } from "fs/promises";
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

  const { relativePath } = await uploadFile(file, "REImages");

  const imageUrl = join(req.nextUrl.origin, relativePath);

  console.log("image Url: ", imageUrl);

  return NextResponse.json({ success: true, data: { imageUrl: imageUrl } });
}
async function uploadFile(file: File, folder: string) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  console.log(filename);
  const relativeDirectory = join("uploads", folder);

  const relativeFilePath = join(relativeDirectory, filename);

  const basePath = join(process.cwd(), "public");
  const absolutFilePath = join(basePath, relativeFilePath);

  const absoluteDirctory = join(basePath, relativeDirectory);
  if (!existsSync(absoluteDirctory)) {
    await mkdir(absoluteDirctory);
  }
  await writeFile(absolutFilePath, buffer);
  console.log("File path", absolutFilePath);

  return { relativePath: relativeFilePath };
}
