import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3";

export const uploadImage = async (name: string, base64: string) => {
  const command = new PutObjectCommand({
    Bucket: "solitary-glitter-6833",
    Key: "images/" + name,
    Body: Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64"),
    ContentType: "image/png",
  });

  await s3.send(command);
};
