import { useState } from "react"
import { Activity } from "lucide-react"
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

export default function Drift() {
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [driftData, setDriftData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleDriftCheck = async () => {
    if (!csvFile) return
    setLoading(true)
    const formData = new FormData()
    formData.append("file", csvFile)

    try {
      const res = await axios.post("http://localhost:8000/check_drift", formData)
      setDriftData(res.data)
      toast.success("Drift Check Complete", {
        description: "Drift metrics loaded below."
      })
    } catch (err) {
      toast.error("Drift Check Failed", {
        description: "Please try again."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto p-4">
      <CardHeader>
        <CardTitle>Drift Detection</CardTitle>
        <CardDescription>Upload a dataset to monitor data shift</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>CSV Dataset</Label>
          <Input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files?.[0] || null)} />
        </div>
        <Button onClick={handleDriftCheck} disabled={!csvFile || loading}>
          <Activity className="mr-2 h-4 w-4" />
          {loading ? "Running..." : "Run Drift Check"}
        </Button>

        {driftData && (
          <div className="mt-4 bg-muted p-4 rounded-md text-sm">
            <pre>{JSON.stringify(driftData, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
