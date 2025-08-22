import { useState } from "react"
import { AlertTriangle, Map, FileText, Users, Shield } from "lucide-react"
import {
  NavigationTabs,
  NavigationTabsList,
  NavigationTabsTrigger,
  NavigationTabsContent,
} from "@/components/ui/navigation-tabs"
import { AlertsTab } from "./tabs/AlertsTab"
import { LiveMapTab } from "./tabs/LiveMapTab"
import { ReportTab } from "./tabs/ReportTab"
import { CommunityTab } from "./tabs/CommunityTab"
import { PrepareTab } from "./tabs/PrepareTab"

export function MobileApp() {
  const [activeTab, setActiveTab] = useState("alerts")

  const tabs = [
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
    { id: "map", label: "Live Map", icon: Map },
    { id: "report", label: "Report", icon: FileText },
    { id: "community", label: "Community", icon: Users },
    { id: "prepare", label: "Prepare", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto border-x border-border">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">EcoSentinel</h1>
            <p className="text-sm opacity-90">Stay Safe, Stay Informed</p>
          </div>
          <div className="h-10 w-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Shield className="h-5 w-5" />
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <NavigationTabs className="flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <NavigationTabsContent value="alerts" isActive={activeTab === "alerts"}>
            <AlertsTab />
          </NavigationTabsContent>
          
          <NavigationTabsContent value="map" isActive={activeTab === "map"}>
            <LiveMapTab />
          </NavigationTabsContent>
          
          <NavigationTabsContent value="report" isActive={activeTab === "report"}>
            <ReportTab />
          </NavigationTabsContent>
          
          <NavigationTabsContent value="community" isActive={activeTab === "community"}>
            <CommunityTab />
          </NavigationTabsContent>
          
          <NavigationTabsContent value="prepare" isActive={activeTab === "prepare"}>
            <PrepareTab />
          </NavigationTabsContent>
        </div>

        {/* Bottom Navigation */}
        <NavigationTabsList className="grid grid-cols-5 h-20 rounded-none border-t">
          {tabs.map((tab) => (
            <NavigationTabsTrigger
              key={tab.id}
              value={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-col gap-1 h-full"
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-xs">{tab.label}</span>
            </NavigationTabsTrigger>
          ))}
        </NavigationTabsList>
      </NavigationTabs>
    </div>
  )
}