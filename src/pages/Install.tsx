import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, Monitor, Check, Share, Plus, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream);

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
              {isMobile ? (
                <Smartphone className="w-10 h-10 text-primary" />
              ) : (
                <Monitor className="w-10 h-10 text-primary" />
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Install Nova
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the full Nova experience with offline access, instant loading, and app-like navigation.
            </p>
          </motion.div>

          {isInstalled ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Already Installed</h2>
                  <p className="text-muted-foreground mb-6">
                    Nova is already installed on your device. Launch it from your home screen!
                  </p>
                  <Button asChild>
                    <a href="/nova">Open Nova</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {/* Native install button (Android/Desktop Chrome) */}
              {deferredPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="border-primary/20">
                    <CardContent className="p-8 text-center">
                      <Button size="lg" onClick={handleInstall} className="gap-2">
                        <Download className="w-5 h-5" />
                        Install Nova App
                      </Button>
                      <p className="text-sm text-muted-foreground mt-4">
                        One tap to add Nova to your home screen
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* iOS Instructions */}
              {isIOS && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        Install on iPhone/iPad
                      </CardTitle>
                      <CardDescription>
                        Follow these steps to add Nova to your home screen
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">1</span>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Tap the Share button</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            Look for the <Share className="w-4 h-4" /> icon at the bottom of Safari
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">2</span>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Tap "Add to Home Screen"</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            Scroll down and tap <Plus className="w-4 h-4" /> Add to Home Screen
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">3</span>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Tap "Add" to confirm</p>
                          <p className="text-sm text-muted-foreground">
                            Nova will appear on your home screen like a native app
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Android Instructions (fallback if no prompt) */}
              {!isIOS && !deferredPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        Install on Android
                      </CardTitle>
                      <CardDescription>
                        Add Nova to your home screen from Chrome
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">1</span>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Tap the menu button</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            Look for <MoreVertical className="w-4 h-4" /> in Chrome's top right corner
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">2</span>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Tap "Install app" or "Add to Home screen"</p>
                          <p className="text-sm text-muted-foreground">
                            You may see either option depending on your Chrome version
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">3</span>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Confirm the installation</p>
                          <p className="text-sm text-muted-foreground">
                            Nova will be added to your home screen
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Why Install Nova?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Offline Access</p>
                          <p className="text-sm text-muted-foreground">
                            View your metrics and protocols even without internet
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Instant Loading</p>
                          <p className="text-sm text-muted-foreground">
                            Launches instantly like a native app
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Full-Screen Experience</p>
                          <p className="text-sm text-muted-foreground">
                            No browser bars — immersive app experience
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Home Screen Access</p>
                          <p className="text-sm text-muted-foreground">
                            One tap to access Nova from your device
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Install;
