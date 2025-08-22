import { useState } from "react"
import { MapPin, Home, AlertTriangle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { mockShelters, mockAlerts } from "@/lib/mock-data"

export function LiveMapTab() {
  const [selectedShelter, setSelectedShelter] = useState<string | null>(null)

  return (
    <div className="h-full flex flex-col">
      {/* Map Container */}
      <div className="flex-1 relative bg-muted">
        {/* Placeholder for Mapbox integration */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
          <div className="text-center p-6">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
            <p className="text-sm text-muted-foreground">
              Mapbox integration will show:
              <br />• Risk zones (heatmap)
              <br />• Safe shelters (markers)
              <br />• Your location
              <br />• Real-time alerts
            </p>
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur rounded-lg p-3 shadow-md">
          <h4 className="text-xs font-semibold mb-2">Risk Levels</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-danger"></div>
              <span className="text-xs">Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-warning"></div>
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-info"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-safe"></div>
              <span className="text-xs">Safe</span>
            </div>
          </div>
        </div>

        {/* Active Alerts Count */}
        <div className="absolute top-4 right-4 bg-danger text-danger-foreground rounded-full px-3 py-1 shadow-md">
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span className="text-xs font-medium">{mockAlerts.length} Active</span>
          </div>
        </div>
      </div>

      {/* Bottom Sheet - Nearby Shelters */}
      <div className="bg-background border-t border-border p-4 max-h-64 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Home className="h-4 w-4" />
            Nearby Shelters
          </h3>
          <Button variant="outline" size="sm">
            <MapPin className="h-3 w-3 mr-1" />
            Find Nearest
          </Button>
        </div>

        <div className="space-y-2">
          {mockShelters.map((shelter) => (
            <Card 
              key={shelter.id} 
              className={`cursor-pointer transition-colors ${
                selectedShelter === shelter.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedShelter(selectedShelter === shelter.id ? null : shelter.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{shelter.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{shelter.address}</p>
                    
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{shelter.currentOccupancy}/{shelter.capacity}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          shelter.status === 'open' 
                            ? 'border-safe text-safe' 
                            : shelter.status === 'full'
                            ? 'border-warning text-warning'
                            : 'border-danger text-danger'
                        }
                      >
                        {shelter.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <MapPin className="h-3 w-3" />
                  </Button>
                </div>

                {selectedShelter === shelter.id && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs font-medium mb-1">Amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {shelter.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" className="flex-1">
                        Get Directions
                      </Button>
                      <Button variant="outline" size="sm">
                        Call: {shelter.contact}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}