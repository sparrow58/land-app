"use client";
import React, { useState, useEffect } from "react";

const BOT_TOKEN = "6925724695:AAEPN2gg80P4ghM2DBPXkiLqH8NDuOhaNIs";

async function getFilePath(file_id: any) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${file_id}`;
  //console.log("getting file path", url);
  const response = await fetch(url);
  const data = await response.json();
  //console.log("file path", data.result.file_path);
  return data.result.file_path;
}

async function fetchImageUrl(file_id: any) {
  try {
    const filePath = await getFilePath(file_id);
    const url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
    return url;
  } catch (error) {
    console.error("Error fetching image URL:", error);
  }
}
async function fetchFilePaths(photos: any) {
  const filePaths = [];
  for (const photo of photos) {
    const url = await fetchImageUrl(photo.file_id);
    console.log("file path", url);
    filePaths.push(url);
  }
  return filePaths;
}

function TestComp() {
  const [images, setImages] = useState<any>();
  const getData = async () => {
    console.log("calling Channel messages");

    try {
      const allowedUpdates = JSON.stringify(["channel_post"]);
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?allowed_updates=${allowedUpdates}`
      );
      const data = await response.json();
      console.log("results", data?.result);
      const photos = data.result
        .filter((item: any) => item.channel_post && item.channel_post.photo)
        .map(
          (item: any) =>
            item.channel_post.photo[item.channel_post.photo.length - 1]
        )
        .slice(-6);
      console.log("Channel photos:", photos);

      const filePaths = await fetchFilePaths(photos);
      setImages(filePaths);
      console.log("filepaths", filePaths);
    } catch (error) {
      console.error("Error fetching channel messages:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {images?.map((imageUrl: any) => (
          <div key={imageUrl}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Telegram Image"
                className="w-full h-auto"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default TestComp;
