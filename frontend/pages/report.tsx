import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export default function Report() {
  const [modelId, setModelId] = useState("")

  const handleDownload = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/export_pdf/${modelId}`, {
        responseType: "blob",
      })

      const blob = new Blob([res.data], { type: "application/pdf" })
      const link = document.createElement("a")
      link.href = window.URL.createObjectURL(blob)
      link.download = `${modelId}_report.pdf`
      link.click()

      toast.success("Report Generated", {
        description: "PDF is downloading..."
      })
    } catch (err) {
      toast.error("Failed to Download", {
        description: "Check the model ID or server logs."
      })
    }
  }

  return (
    <Card className="max-w-xl mx-auto p-4">
      <CardHeader>
        <CardTitle>Export Model Report</CardTitle>
        <CardDescription>Generate a PDF summary of model metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>Model Name or ID</Label>
        <Input value={modelId} onChange={(e) => setModelId(e.target.value)} placeholder="e.g., model_001" />
        <Button onClick={handleDownload} disabled={!modelId}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </CardContent>
    </Card>
  )
}
