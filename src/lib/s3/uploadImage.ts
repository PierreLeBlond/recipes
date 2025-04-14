import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3";

export const uploadImage = async (name: string, base64: string) => {
  try {
    console.log(
      "Starting upload with config:",
      JSON.stringify({
        endpoint: process.env.S3_ENDPOINT,
        bucket: process.env.S3_BUCKET_NAME,
        region: process.env.S3_REGION,
      }),
    );

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${process.env.S3_PUBLIC_REPOSITORY}/images/${name}`,
      Body: Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64",
      ),
      ContentType: "image/png",
    });

    console.log("Created command:", JSON.stringify(command));

    const response = await s3.send(command);
    console.log("Upload successful:", JSON.stringify(response));
    return response;
  } catch (error) {
    console.error("Upload failed with error:", JSON.stringify(error));
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    throw new Error("Failed to upload image");
  }
};
