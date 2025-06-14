import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

export async function uploadFile(file) {
  const fileRef = ref(storage, `uploads/${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  return snapshot;
}
