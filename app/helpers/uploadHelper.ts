import { existsSync } from "fs";
import { join } from "path";
import { writeFile, mkdir } from "fs/promises";
export async function uploadFile(file: File, folder: string) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  const relativeDirectory = join("uploads", folder);

  const relativeFilePath = join(relativeDirectory, filename);

  const basePath = join(process.cwd(), "public");
  const absolutFilePath = join(basePath, relativeFilePath);

  const absoluteDirctory = join(basePath, relativeDirectory);
  if (!existsSync(absoluteDirctory)) {
    await mkdir(absoluteDirctory);
  }
  await writeFile(absolutFilePath, buffer);

  return { relativePath: relativeFilePath };
}
