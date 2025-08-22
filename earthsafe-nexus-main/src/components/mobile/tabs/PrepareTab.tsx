import { Shield, Phone, FileText, MapPin, AlertTriangle, Home, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function PrepareTab() {
  const emergencyContacts = [
    { name: "National Emergency Hotline", number: "911", type: "emergency" },
    { name: "Philippine Red Cross", number: "143", type: "relief" },
    { name: "NDRRMC", number: "(02) 8911-5061", type: "disaster" },
    { name: "Philippine Coast Guard", number: "137", type: "rescue" },
  ]

  const safetyGuidelines = [
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "During Flash Floods",
      items: [
        "Move to higher ground immediately",
        "Avoid walking/driving through flood water",
        "Stay away from electrical lines",
        "Monitor radio for updates"
      ]
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "During Typhoons",
      items: [
        "Stay indoors and away from windows",
        "Prepare emergency kit with 3 days supplies",
        "Charge all devices beforehand",
        "Secure loose objects outside"
      ]
    },
    {
      icon: <Home className="h-5 w-5" />,
      title: "During Earthquakes",
      items: [
        "Drop, Cover, and Hold On",
        "Stay away from heavy objects",
        "Exit building if safe to do so",
        "Avoid elevators and doorways"
      ]
    }
  ]

  const emergencyKit = [
    "Drinking water (1 gallon per person per day)",
    "Non-perishable food (3-day supply)",
    "Battery-powered radio",
    "Flashlight and extra batteries",
    "First aid kit",
    "Copies of important documents",
    "Cash in small bills",
    "Medications",
    "Change of clothing",
    "Personal hygiene items"
  ]

  const zones = [
    { name: "Zone A", risk: "High Risk", color: "text-danger", areas: ["Riverside Districts", "Low-lying Areas"] },
    { name: "Zone B", risk: "Medium Risk", color: "text-warning", areas: ["Hillside Communities", "Near Rivers"] },
    { name: "Zone C", risk: "Low Risk", color: "text-safe", areas: ["Elevated Areas", "Inland Districts"] },
  ]

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <Shield className="h-12 w-12 mx-auto mb-3 text-primary" />
        <h2 className="text-2xl font-bold">Emergency Preparedness</h2>
        <p className="text-muted-foreground">Knowledge is your best defense</p>
      </div>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">{contact.name}</h4>
                <p className="text-sm text-muted-foreground">{contact.type}</p>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="h-3 w-3 mr-1" />
                {contact.number}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Safety Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Safety Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {safetyGuidelines.map((guideline, index) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-2">
                {guideline.icon}
                <h4 className="font-medium">{guideline.title}</h4>
              </div>
              <ul className="space-y-1 ml-7">
                {guideline.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
              {index < safetyGuidelines.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emergency Kit Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Emergency Kit Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {emergencyKit.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Zones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Risk Zone Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {zones.map((zone, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{zone.name}</h4>
                <Badge className={zone.color}>
                  {zone.risk}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {zone.areas.map((area, areaIndex) => (
                  <Badge key={areaIndex} variant="outline" className="text-xs">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Download Emergency Plan Template
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MapPin className="h-4 w-4 mr-2" />
            Find Nearest Evacuation Centers
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Phone className="h-4 w-4 mr-2" />
            Local Barangay Contact Directory
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}