import { useState } from "react"
import { UploadCloud } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { toast } from "sonner"
import axios from "axios"

export default function UploadModel() {
  const [modelFile, setModelFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
// No code needed here - toast is already imported from sonner

  const handleUpload = async () => {
    if (!modelFile) return
    setLoading(true)
    const formData = new FormData()
    formData.append("file", modelFile)

    try {
      await axios.post("http://localhost:8000/upload_model", formData)
      toast.success("✅ Upload Successful", {
        description: `${modelFile.name} uploaded.`,
      })
    } catch (err) {
      toast.error("❌ Upload Failed", {
        description: "Check backend or file format.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-xl mx-auto p-4">
      <CardHeader>
        <CardTitle>Upload Model (.pkl)</CardTitle>
        <CardDescription>Track ML performance over time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Choose .pkl file</Label>
          <Input type="file" accept=".pkl" onChange={(e) => setModelFile(e.target.files?.[0] || null)} />
        </div>
        <Button onClick={handleUpload} disabled={loading || !modelFile}>
          <UploadCloud className="mr-2 h-4 w-4" />
          {loading ? "Uploading..." : "Upload Model"}
        </Button>
      </CardContent>
    </Card>
  )
}
