import { useState } from "react"
import { MapPin, Home, AlertTriangle, Users, Layers, Eye, EyeOff, Navigation, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Enhanced mock data for Tamil Nadu disaster zones
const disasterZones = [
  {
    id: '1',
    name: 'Kodambakkam',
    type: 'flood',
    severity: 'high',
    description: 'Flood zone with high water levels',
    coordinates: [80.2264, 13.0339],
    color: 'bg-blue-500',
    affected: 'Residential areas near Kodambakkam station'
  },
  {
    id: '2',
    name: 'Marina Beach',
    type: 'cyclone',
    severity: 'medium',
    description: 'Coastal area vulnerable to cyclones',
    coordinates: [80.2785, 13.0475],
    color: 'bg-purple-500',
    affected: 'Beachfront and nearby commercial areas'
  },
  {
    id: '3',
    name: 'Adyar River Bank',
    type: 'flood',
    severity: 'critical',
    description: 'Critical flood risk near river banks',
    coordinates: [80.2570, 13.0067],
    color: 'bg-red-500',
    affected: 'Riverside communities and bridges'
  },
  {
    id: '4',
    name: 'Kodaikanal',
    type: 'landslide',
    severity: 'medium',
    description: 'Hill station with moderate landslide risk',
    coordinates: [77.4890, 10.2381],
    color: 'bg-orange-500',
    affected: 'Hill slopes and tourist areas'
  }
]

const mockShelters = [
  {
    id: '1',
    name: 'Anna Nagar Community Center',
    address: 'Anna Nagar, Chennai',
    coordinates: [80.2010, 13.1190],
    capacity: 500,
    currentOccupancy: 120,
    status: 'open',
    contact: '+91 44 2618 2345'
  },
  {
    id: '2',
    name: 'Marina Beach Relief Center',
    address: 'Marina Beach, Chennai',
    coordinates: [80.2785, 13.0475],
    capacity: 300,
    currentOccupancy: 280,
    status: 'nearly_full',
    contact: '+91 44 2844 1234'
  },
  {
    id: '3',
    name: 'Kodambakkam School',
    address: 'Kodambakkam, Chennai',
    coordinates: [80.2264, 13.0339],
    capacity: 400,
    currentOccupancy: 400,
    status: 'full',
    contact: '+91 44 2472 5678'
  }
]

export function LiveMapTab() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [selectedShelter, setSelectedShelter] = useState<string | null>(null)
  const [mapLayers, setMapLayers] = useState({
    floodZones: true,
    cycloneZones: true,
    landslideZones: false,
    shelters: true,
    alerts: true
  })
  const [showLayerControls, setShowLayerControls] = useState(false)

  const toggleLayer = (layer: keyof typeof mapLayers) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }))
  }

  const getZoneColor = (type: string, severity: string) => {
    if (severity === 'critical') return 'border-red-500 bg-red-500'
    if (type === 'flood') return 'border-blue-500 bg-blue-500'
    if (type === 'cyclone') return 'border-purple-500 bg-purple-500'
    if (type === 'landslide') return 'border-orange-500 bg-orange-500'
    return 'border-gray-500 bg-gray-500'
  }

  const getShelterStatus = (status: string) => {
    switch (status) {
      case 'open':
        return { color: 'border-safe text-safe', label: 'OPEN' }
      case 'nearly_full':
        return { color: 'border-warning text-warning', label: 'NEARLY FULL' }
      case 'full':
        return { color: 'border-danger text-danger', label: 'FULL' }
      default:
        return { color: 'border-muted text-muted-foreground', label: 'UNKNOWN' }
    }
  }

  const selectedZoneData = disasterZones.find(zone => zone.id === selectedZone)
  const selectedShelterData = mockShelters.find(shelter => shelter.id === selectedShelter)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Tamil Nadu Disaster Zones</h1>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
              onClick={() => setShowLayerControls(true)}
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Zone Filter Tabs */}
      <div className="bg-white border-b p-2">
        <div className="flex gap-2 overflow-x-auto">
          <Button 
            variant={mapLayers.floodZones ? "default" : "outline"} 
            size="sm"
            onClick={() => toggleLayer('floodZones')}
            className="whitespace-nowrap"
          >
            Flood Zones
          </Button>
          <Button 
            variant={mapLayers.cycloneZones ? "default" : "outline"} 
            size="sm"
            onClick={() => toggleLayer('cycloneZones')}
            className="whitespace-nowrap"
          >
            Cyclone Zones
          </Button>
          <Button 
            variant={mapLayers.landslideZones ? "default" : "outline"} 
            size="sm"
            onClick={() => toggleLayer('landslideZones')}
            className="whitespace-nowrap"
          >
            Landslide Zones
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-green-50">
        {/* Interactive Map Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          {/* Simulated map with disaster zones */}
          <div className="relative w-full h-full overflow-hidden">
            {/* Background map pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-8 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-gray-300"></div>
                ))}
              </div>
            </div>

            {/* Disaster Zone Overlays */}
            {disasterZones.map((zone, index) => {
              const shouldShow = 
                (zone.type === 'flood' && mapLayers.floodZones) ||
                (zone.type === 'cyclone' && mapLayers.cycloneZones) ||
                (zone.type === 'landslide' && mapLayers.landslideZones)

              if (!shouldShow) return null

              return (
                <div
                  key={zone.id}
                  className={`absolute rounded-full border-4 ${getZoneColor(zone.type, zone.severity)} opacity-60 cursor-pointer hover:opacity-80 transition-opacity`}
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 15}%`,
                    width: '120px',
                    height: '120px',
                  }}
                  onClick={() => setSelectedZone(zone.id)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                    {zone.name}
                  </div>
                </div>
              )
            })}

            {/* Shelter Markers */}
            {mapLayers.shelters && mockShelters.map((shelter, index) => (
              <div
                key={shelter.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${15 + index * 30}%`,
                  top: `${60 + index * 10}%`,
                }}
                onClick={() => setSelectedShelter(shelter.id)}
              >
                <div className="bg-safe rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                  <Home className="h-5 w-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-lg p-3 shadow-md">
          <h4 className="text-xs font-semibold mb-2">Risk Levels</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500"></div>
              <span className="text-xs">Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500"></div>
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-safe"></div>
              <span className="text-xs">Safe Zone</span>
            </div>
          </div>
        </div>

        {/* Live Statistics */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg p-3 shadow-md">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Critical Zones</span>
              </div>
              <div className="font-bold text-red-600">3 Active</div>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-safe rounded-full"></div>
                <span>Safe Shelters</span>
              </div>
              <div className="font-bold text-safe">2 Open</div>
            </div>
          </div>
        </div>

        {/* Full View Button */}
        <div className="absolute bottom-4 right-4">
          <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
            <Navigation className="h-4 w-4 mr-2" />
            View Full Tamil Nadu
          </Button>
        </div>
      </div>

      {/* Zone Detail Dialog */}
      <Dialog open={!!selectedZone} onOpenChange={() => setSelectedZone(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              {selectedZoneData?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedZoneData && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge className="bg-warning text-warning-foreground">
                  Risk Level: {selectedZoneData.severity}
                </Badge>
                <Badge className="bg-muted text-muted-foreground">
                  Disaster Type: {selectedZoneData.type.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-sm">{selectedZoneData.description}</p>
              
              <div className="bg-muted rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Affected Areas:</h4>
                <p className="text-xs text-muted-foreground">{selectedZoneData.affected}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-safe hover:bg-safe/90 text-safe-foreground">
                  <Navigation className="h-4 w-4 mr-2" />
                  Safe Routes
                </Button>
                <Button variant="outline" onClick={() => setSelectedZone(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Shelter Detail Dialog */}
      <Dialog open={!!selectedShelter} onOpenChange={() => setSelectedShelter(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-safe" />
              {selectedShelterData?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedShelterData && (
            <div className="space-y-4">
              <div>
                <Badge variant="outline" className={getShelterStatus(selectedShelterData.status).color}>
                  {getShelterStatus(selectedShelterData.status).label}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedShelterData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Capacity: {selectedShelterData.currentOccupancy}/{selectedShelterData.capacity}</span>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    selectedShelterData.currentOccupancy / selectedShelterData.capacity > 0.8 
                      ? 'bg-warning' 
                      : 'bg-safe'
                  }`}
                  style={{ width: `${(selectedShelterData.currentOccupancy / selectedShelterData.capacity) * 100}%` }}
                ></div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline">
                  Call: {selectedShelterData.contact.slice(-4)}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Layer Controls Dialog */}
      <Dialog open={showLayerControls} onOpenChange={setShowLayerControls}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Map Layers</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="flood-layer" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  Flood Zones
                </Label>
                <Switch
                  id="flood-layer"
                  checked={mapLayers.floodZones}
                  onCheckedChange={() => toggleLayer('floodZones')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="cyclone-layer" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  Cyclone Zones
                </Label>
                <Switch
                  id="cyclone-layer"
                  checked={mapLayers.cycloneZones}
                  onCheckedChange={() => toggleLayer('cycloneZones')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="landslide-layer" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  Landslide Zones
                </Label>
                <Switch
                  id="landslide-layer"
                  checked={mapLayers.landslideZones}
                  onCheckedChange={() => toggleLayer('landslideZones')}
                />
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="shelters-layer" className="flex items-center gap-2">
                    <Home className="h-3 w-3" />
                    Shelters
                  </Label>
                  <Switch
                    id="shelters-layer"
                    checked={mapLayers.shelters}
                    onCheckedChange={() => toggleLayer('shelters')}
                  />
                </div>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={() => setShowLayerControls(false)}
            >
              Apply Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}