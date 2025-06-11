// pages/index.tsx
import { useState } from 'react';
import axios from 'axios';

export default function UploadModel() {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('http://localhost:8000/upload_model', formData);
    setMsg(res.data.status);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Upload Your ML Model (.pkl)</h1>
      <input type="file" accept=".pkl" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">
        Upload
      </button>
      {msg && <p className="text-green-600">{msg}</p>}
    </div>
  );
}
