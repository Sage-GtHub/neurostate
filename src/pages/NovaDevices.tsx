import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Watch, Activity, Shield, Lock, Eye, Database } from "lucide-react";

export default function NovaDevices() {
  const devices = [
    {
      name: "Oura Ring Gen 3",
      status: "Connected",
      lastSync: "2 minutes ago",
      battery: 78,
      icon: <div className="w-6 h-6 rounded-full border-2 border-carbon" />,
    },
    {
      name: "Apple Watch Ultra",
      status: "Connected",
      lastSync: "5 minutes ago",
      battery: 92,
      icon: <Watch className="w-6 h-6 text-carbon" />,
    },
    {
      name: "Whoop 4.0",
      status: "Offline",
      lastSync: "Never",
      battery: null,
      icon: <Activity className="w-6 h-6 text-carbon" />,
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      {/* Header */}
      <div className="border-b border-mist bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          <h1 className="text-h2 font-semibold text-carbon mb-3">Connected Devices</h1>
          <p className="text-body text-ash">Manage your wearable integrations and data sync preferences</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="space-y-8">
          {/* Devices Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {devices.map((device, index) => (
              <Card key={index} className={device.status === "Offline" ? "opacity-60" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-pearl flex items-center justify-center">
                      {device.icon}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      device.status === "Connected" 
                        ? "bg-[#10b981]/10 text-[#10b981]" 
                        : "bg-ash/10 text-ash"
                    }`}>
                      {device.status}
                    </div>
                  </div>

                  <h3 className="text-body font-semibold text-carbon mb-2">{device.name}</h3>
                  
                  <div className="space-y-2 text-sm text-ash mb-4">
                    <div>Last Sync {device.lastSync}</div>
                    {device.battery && <div>Battery {device.battery}%</div>}
                  </div>

                  <Button 
                    variant={device.status === "Connected" ? "outline" : "default"} 
                    className="w-full"
                  >
                    {device.status === "Connected" ? "Sync Now" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Data Syncing */}
          <Card className="bg-carbon text-ivory">
            <CardContent className="p-8">
              <h2 className="text-h3 font-semibold mb-3">Data Syncing</h2>
              <p className="text-sm text-pearl mb-8 leading-relaxed">
                Nova continuously analyses your biometric data to provide personalised insights
              </p>
              
              <div className="grid sm:grid-cols-3 gap-8">
                <div>
                  <div className="text-caption text-pearl uppercase tracking-wider mb-2">Data Points Today</div>
                  <div className="text-[2.5rem] font-semibold">1,247</div>
                </div>
                <div>
                  <div className="text-caption text-pearl uppercase tracking-wider mb-2">Insights Generated</div>
                  <div className="text-[2.5rem] font-semibold">18</div>
                </div>
                <div>
                  <div className="text-caption text-pearl uppercase tracking-wider mb-2">Recommendations</div>
                  <div className="text-[2.5rem] font-semibold">5</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-carbon" />
                <h2 className="text-h3 font-semibold text-carbon">Privacy & Security</h2>
              </div>
              
              <p className="text-sm text-ash mb-8 leading-relaxed">
                Your data is encrypted and never shared with third parties
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-carbon mb-1">End-to-end encryption</h3>
                    <p className="text-sm text-ash">All data is encrypted in transit and at rest</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-carbon mb-1">Data anonymisation</h3>
                    <p className="text-sm text-ash">Personal identifiers are removed from analytics</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-carbon mb-1">GDPR compliant</h3>
                    <p className="text-sm text-ash">Full compliance with data protection regulations</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-carbon mb-1">You control your data</h3>
                    <p className="text-sm text-ash">Export or delete your data anytime</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
