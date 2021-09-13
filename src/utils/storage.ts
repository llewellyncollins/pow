import { storage } from "@/firebase";
import { v4 as uuidv4 } from "uuid";

const storageRef = storage.ref();

export const upload = (
  file: File,
  docId: string,
  tag: string,
  title: string,
  description: string
): Promise<[string, string]> => {
  return new Promise((resolve, reject) => {
    try {
      const extention = file.name.split(".").pop();
      const imageRef = storageRef.child(`uploads/${uuidv4()}.${extention}`);
      imageRef
        .put(file, {
          docId,
          tag,
          title,
          description,
        } as any)
        .then(() => {
          return imageRef.getDownloadURL();
        })
        .then((url) => resolve([url, imageRef.fullPath]));
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteImage = async (imagePath: string) => {
  await storageRef.child(imagePath).delete();
};
