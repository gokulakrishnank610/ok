import { useState } from "react"
import { AlertTriangle, Clock, MapPin, Navigation, CheckCircle, X, Flame, Mountain } from "lucide-react"
import { AlertCard, AlertCardTitle, AlertCardDescription } from "@/components/ui/alert-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Enhanced mock data with location-based alerts
const locationAlerts = [
  {
    id: '1',
    type: 'fire',
    severity: 'critical',
    title: 'Fire Alert',
    description: 'Fire detected in the building.',
    location: 'Anna Nagar, Chennai',
    timestamp: '2025-01-20T10:30:00Z',
    coordinates: [80.2010, 13.1190],
    icon: Flame,
    color: 'text-danger'
  },
  {
    id: '2',
    type: 'landslide',
    severity: 'medium',
    title: 'Landslide Risk',
    description: 'Hill station with moderate risk of landslides during heavy rainfall periods.',
    location: 'Kodaikanal',
    timestamp: '2025-01-20T09:15:00Z',
    coordinates: [77.4890, 10.2381],
    icon: Mountain,
    color: 'text-warning'
  },
  {
    id: '3',
    type: 'flood',
    severity: 'high',
    title: 'Flood Warning',
    description: 'Heavy rainfall expected to cause flooding in low-lying areas.',
    location: 'Kodambakkam, Chennai',
    timestamp: '2025-01-20T08:45:00Z',
    coordinates: [80.2264, 13.0339],
    icon: AlertTriangle,
    color: 'text-info'
  }
]

const riskPrediction = {
  location: 'Anna Nagar',
  weather: 'overcast clouds',
  temperature: '26.48°C',
  humidity: '70%',
  windSpeed: '8.25 m/s',
  coordinates: '13.1190, 80.2010',
  lastUpdated: 'Aug 15, 2025 7:14 PM',
  riskLevel: 'No immediate risk',
  riskPercentage: '0.0%'
}

export function AlertsTab() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [showLocationUpdate, setShowLocationUpdate] = useState(false)

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'danger'
      case 'high':
        return 'warning'
      case 'medium':
        return 'info'
      case 'low':
        return 'safe'
      default:
        return 'default'
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-danger text-danger-foreground'
      case 'high':
        return 'bg-warning text-warning-foreground'
      case 'medium':
        return 'bg-info text-info-foreground'
      case 'low':
        return 'bg-safe text-safe-foreground'
      default:
        return 'bg-muted text-muted-foreground'
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

  const selectedAlertData = locationAlerts.find(alert => alert.id === selectedAlert)

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Weather Disaster Prediction</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20"
            onClick={() => setShowLocationUpdate(true)}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Update Location
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Disaster Risk Prediction Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-red-600">Disaster Risk Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-safe rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-safe">Disaster Risk: {riskPrediction.riskLevel}</h3>
                <p className="text-sm text-muted-foreground">
                  Risk Prediction: {riskPrediction.riskPercentage} chance of disaster
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location & Weather Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Location & Weather Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Location:</span> {riskPrediction.location}
              </div>
              <div>
                <span className="font-medium">Weather:</span> {riskPrediction.weather}
              </div>
              <div>
                <span className="font-medium">Temperature:</span> {riskPrediction.temperature}
              </div>
              <div>
                <span className="font-medium">Humidity:</span> {riskPrediction.humidity}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Wind Speed:</span> {riskPrediction.windSpeed}
              </div>
            </div>
            <div className="pt-2 border-t text-xs text-muted-foreground">
              <p>Coordinates: {riskPrediction.coordinates}</p>
              <p>Last updated: {riskPrediction.lastUpdated}</p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Alerts Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Emergency Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {locationAlerts.length > 0 ? (
              <div className="space-y-3">
                {locationAlerts.map((alert) => (
                  <AlertCard 
                    key={alert.id} 
                    variant={getSeverityVariant(alert.severity)}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedAlert(alert.id)}
                  >
                    <alert.icon className={`h-4 w-4 ${alert.color}`} />
                    <AlertCardTitle className="flex items-center justify-between">
                      <span>{alert.title}</span>
                      <Badge className={getSeverityBadge(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </AlertCardTitle>
                    <AlertCardDescription>
                      <p className="mb-2">{alert.description}</p>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimestamp(alert.timestamp)}</span>
                        </div>
                      </div>
                    </AlertCardDescription>
                  </AlertCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No active alerts at the moment</h3>
                <p className="text-sm text-muted-foreground">Stay safe! We'll notify you of any new alerts.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Safety Guidelines & Videos */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">▶</span>
              </div>
              Safety Guidelines & Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 mb-3">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">▶</span>
                </div>
              </div>
              <h4 className="font-medium mb-1">Emergency Response Guide</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Learn essential safety procedures for various disaster scenarios
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <span className="mr-2">▶</span>
                Watch Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Detail Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAlertData?.icon && <selectedAlertData.icon className={`h-5 w-5 ${selectedAlertData.color}`} />}
              {selectedAlertData?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedAlertData && (
            <div className="space-y-4">
              <div>
                <Badge className={getSeverityBadge(selectedAlertData.severity)}>
                  Risk Level: {selectedAlertData.severity}
                </Badge>
                {selectedAlertData.type === 'landslide' && (
                  <Badge className="ml-2 bg-muted text-muted-foreground">
                    Disaster Type: LANDSLIDE
                  </Badge>
                )}
              </div>
              
              <p className="text-sm">{selectedAlertData.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedAlertData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimestamp(selectedAlertData.timestamp)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-safe hover:bg-safe/90 text-safe-foreground">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" onClick={() => setSelectedAlert(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Location Update Dialog */}
      <Dialog open={showLocationUpdate} onOpenChange={setShowLocationUpdate}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Update Location</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Allow location access to get personalized disaster risk predictions for your area.
            </p>
            <div className="flex gap-2">
              <Button className="flex-1 bg-red-600 hover:bg-red-700">
                <MapPin className="h-4 w-4 mr-2" />
                Update Location
              </Button>
              <Button variant="outline" onClick={() => setShowLocationUpdate(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}