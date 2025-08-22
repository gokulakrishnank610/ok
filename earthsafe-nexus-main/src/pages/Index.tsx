import { useState } from "react"
import { Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileApp } from "@/components/mobile/MobileApp"
import { WebDashboard } from "@/components/web/WebDashboard"

const Index = () => {
  const [viewMode, setViewMode] = useState<'mobile' | 'web'>('mobile')

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Mode Selector */}
      <div className="fixed top-4 right-4 z-50">
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Demo Mode</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Citizen App
              </Button>
              <Button
                variant={viewMode === 'web' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('web')}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Authority Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Render Current View */}
      {viewMode === 'mobile' ? <MobileApp /> : <WebDashboard />}
    </div>
  )
};

export default Index;
