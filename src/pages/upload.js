import { useState } from "react";
import { uploadFile } from "../utils/uploadFile";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setStatus("Uploading...");
    try {
      await uploadFile(file);
      setStatus("Uploaded!");
    } catch (err) {
      console.error(err);
      setStatus("Error!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Upload to Firebase Storage</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="ml-2 bg-blue-500 px-4 py-1 rounded text-white">
        Upload
      </button>
      <p className="mt-2">{status}</p>
    </div>
  );
}
