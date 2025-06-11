// pages/dataset.tsx
import { useState } from 'react';
import axios from 'axios';

export default function UploadDataset() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('http://localhost:8000/upload_dataset', formData);
    setResult(res.data.drift);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-xl font-semibold">Upload Test Dataset (CSV)</h1>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="bg-purple-600 text-white px-4 py-2 rounded mt-2">
        Check Drift
      </button>

      {result && (
        <pre className="bg-white p-4 mt-4 border rounded shadow overflow-x-auto max-h-96">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
