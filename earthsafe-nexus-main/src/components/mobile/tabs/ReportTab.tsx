import { useState } from "react"
import { Camera, MapPin, Send, FileText, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { mockReports } from "@/lib/mock-data"

export function ReportTab() {
  const [activeSection, setActiveSection] = useState<'form' | 'reports'>('form')
  const [reportForm, setReportForm] = useState({
    type: '',
    title: '',
    description: '',
    location: '',
    severity: '',
    photo: null as File | null
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the report to your backend
    console.log('Submitting report:', reportForm)
    // Reset form
    setReportForm({
      type: '',
      title: '',
      description: '',
      location: '',
      severity: '',
      photo: null
    })
    // Show success message
    alert('Report submitted successfully!')
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-danger'
      case 'high':
        return 'text-warning'
      case 'medium':
        return 'text-info'
      case 'low':
        return 'text-safe'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'border-safe text-safe'
      case 'pending':
        return 'border-warning text-warning'
      case 'resolved':
        return 'border-info text-info'
      default:
        return 'border-muted text-muted-foreground'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Section Toggle */}
      <div className="p-4 border-b border-border">
        <div className="flex gap-2">
          <Button
            variant={activeSection === 'form' ? 'default' : 'outline'}
            onClick={() => setActiveSection('form')}
            className="flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            Report Incident
          </Button>
          <Button
            variant={activeSection === 'reports' ? 'default' : 'outline'}
            onClick={() => setActiveSection('reports')}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-2" />
            My Reports
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeSection === 'form' ? (
          /* Report Form */
          <div className="p-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Submit Incident Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Incident Type</Label>
                    <Select 
                      value={reportForm.type} 
                      onValueChange={(value) => setReportForm({...reportForm, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="incident">Incident</SelectItem>
                        <SelectItem value="damage">Damage</SelectItem>
                        <SelectItem value="help_needed">Help Needed</SelectItem>
                        <SelectItem value="road_closure">Road Closure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity</Label>
                    <Select 
                      value={reportForm.severity} 
                      onValueChange={(value) => setReportForm({...reportForm, severity: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={reportForm.title}
                      onChange={(e) => setReportForm({...reportForm, title: e.target.value})}
                      placeholder="Brief description of the incident"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={reportForm.description}
                      onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                      placeholder="Provide detailed information about the incident"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        value={reportForm.location}
                        onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                        placeholder="Enter location or address"
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" className="flex-1">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </Button>
                      <Button type="button" variant="outline" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Reports List */
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">My Reports</h3>
            
            {mockReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{report.title}</h4>
                    <Badge variant="outline" className={getStatusColor(report.status)}>
                      {report.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{report.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(report.timestamp)}</span>
                      </div>
                    </div>
                    <span className={`font-medium ${getSeverityColor(report.severity)}`}>
                      {report.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  {report.status === 'verified' && (
                    <div className="mt-3 flex items-center gap-1 text-safe text-xs">
                      <CheckCircle className="h-3 w-3" />
                      <span>Verified by authorities</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}