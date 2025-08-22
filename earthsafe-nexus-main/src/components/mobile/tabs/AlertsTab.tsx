import { AlertTriangle, Clock, MapPin, Navigation } from "lucide-react"
import { AlertCard, AlertCardTitle, AlertCardDescription } from "@/components/ui/alert-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockAlerts } from "@/lib/mock-data"

export function AlertsTab() {
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

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Active Alerts</h2>
        <Badge variant="outline" className="bg-danger/10 text-danger border-danger/30">
          {mockAlerts.length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <AlertCard key={alert.id} variant={getSeverityVariant(alert.severity)}>
            <AlertTriangle className="h-4 w-4" />
            <AlertCardTitle className="flex items-center justify-between">
              <span>{alert.title}</span>
              <Badge className={getSeverityBadge(alert.severity)}>
                {alert.severity.toUpperCase()}
              </Badge>
            </AlertCardTitle>
            <AlertCardDescription>
              <p className="mb-3">{alert.description}</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>{alert.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimestamp(alert.timestamp)}</span>
                </div>
              </div>

              {alert.affectedAreas && alert.affectedAreas.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium mb-1">Affected Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {alert.affectedAreas.map((area, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {alert.safeRoutes && alert.safeRoutes.length > 0 && (
                <div className="mt-3">
                  <Button 
                    size="sm" 
                    className="w-full bg-safe hover:bg-safe/90 text-safe-foreground"
                  >
                    <Navigation className="h-3 w-3 mr-2" />
                    View Safe Routes
                  </Button>
                </div>
              )}
            </AlertCardDescription>
          </AlertCard>
        ))}
      </div>

      {mockAlerts.length === 0 && (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-muted-foreground">No Active Alerts</h3>
          <p className="text-sm text-muted-foreground">Stay safe! We'll notify you of any new alerts.</p>
        </div>
      )}
    </div>
  )
}