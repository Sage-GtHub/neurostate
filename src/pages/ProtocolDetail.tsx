import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Edit2, Save, X, Trash2, Shield, FlaskConical, Clock, AlertTriangle, Sparkles } from "lucide-react";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Product {
  product_name: string;
  dose: string;
  time: string;
  purpose?: string;
  evidence_grade?: string;
  key_studies?: string;
}

interface Protocol {
  id: string;
  protocol_name: string;
  goal: string;
  status: string;
  completion_percentage: number;
  started_at: string;
  products: Product[];
}

const GRADE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  A: { bg: 'bg-emerald-500/10 border-emerald-500/30', text: 'text-emerald-400', label: 'Strong RCT Evidence' },
  B: { bg: 'bg-teal-500/10 border-teal-500/30', text: 'text-teal-400', label: 'Good Clinical Evidence' },
  C: { bg: 'bg-sky-500/10 border-sky-500/30', text: 'text-sky-400', label: 'Observational Evidence' },
  D: { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', label: 'Preliminary Evidence' },
  E: { bg: 'bg-orange-500/10 border-orange-500/30', text: 'text-orange-400', label: 'Mechanistic Only' },
  F: { bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-400', label: 'Traditional Use' },
};

export default function ProtocolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProducts, setEditedProducts] = useState<Product[]>([]);
  const [editedName, setEditedName] = useState("");
  const [editedCompletion, setEditedCompletion] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [assessmentMeta, setAssessmentMeta] = useState<{ synergy_notes?: string; contraindications?: string } | null>(null);

  useEffect(() => {
    loadProtocol();
    loadAssessmentMeta();
  }, [id]);

  const loadProtocol = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_protocols')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      const protocolData = {
        ...data,
        products: data.products as unknown as Product[]
      } as Protocol;

      setProtocol(protocolData);
      setEditedProducts(data.products as unknown as Product[]);
      setEditedName(data.protocol_name);
      setEditedCompletion(data.completion_percentage);
    } catch (error) {
      console.error("Error loading protocol:", error);
      toast({ title: "Error", description: "Failed to load protocol", variant: "destructive" });
      navigate("/nova/protocols");
    }
  };

  const loadAssessmentMeta = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('protocol_assessments')
        .select('lifestyle_factors')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (data?.lifestyle_factors) {
        setAssessmentMeta(data.lifestyle_factors as any);
      }
    } catch { /* ignore */ }
  };

  const handleSave = async () => {
    if (!protocol) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_protocols')
        .update({
          protocol_name: editedName,
          products: editedProducts as any,
          completion_percentage: editedCompletion,
          updated_at: new Date().toISOString(),
        })
        .eq('id', protocol.id);
      if (error) throw error;
      toast({ title: "Protocol updated", description: "Your changes have been saved" });
      setIsEditing(false);
      loadProtocol();
    } catch (error) {
      console.error("Error updating protocol:", error);
      toast({ title: "Error", description: "Failed to update protocol", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!protocol) return;
    try {
      const { error } = await supabase.from('user_protocols').delete().eq('id', protocol.id);
      if (error) throw error;
      toast({ title: "Protocol deleted", description: "Protocol has been removed" });
      navigate("/nova/protocols");
    } catch (error) {
      console.error("Error deleting protocol:", error);
      toast({ title: "Error", description: "Failed to delete protocol", variant: "destructive" });
    }
  };

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    const updated = [...editedProducts];
    updated[index] = { ...updated[index], [field]: value };
    setEditedProducts(updated);
  };

  const removeProduct = (index: number) => {
    setEditedProducts(editedProducts.filter((_, i) => i !== index));
  };

  const addProduct = () => {
    setEditedProducts([...editedProducts, { product_name: "", dose: "", time: "" }]);
  };

  const hasEvidenceGrades = protocol?.products?.some(p => p.evidence_grade);

  if (!protocol) {
    return (
      <div className="min-h-screen bg-background">
        <NovaNav />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          <p className="text-muted-foreground">Loading protocol...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${protocol.protocol_name} | Protocol Detail | NeuroState`}
        description={`Track your ${protocol.protocol_name} protocol progress. Goal: ${protocol.goal}. ${protocol.products.length} products in your daily stack.`}
        noindex={true}
      />
      <NovaNav />

      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/nova/protocols")} className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Protocols
          </Button>

          <div className="flex items-center justify-between">
            <div>
              {isEditing ? (
                <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} className="text-xl font-semibold mb-2 max-w-md" />
              ) : (
                <h1 className="text-xl font-semibold text-foreground">{protocol.protocol_name}</h1>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                Started {new Date(protocol.started_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • {protocol.status}
              </p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />{isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button variant="outline" onClick={() => { setIsEditing(false); setEditedProducts(protocol.products); setEditedName(protocol.protocol_name); setEditedCompletion(protocol.completion_percentage); }}>
                    <X className="h-4 w-4 mr-2" />Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)}><Edit2 className="h-4 w-4 mr-2" />Edit</Button>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(true)}><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-foreground">Protocol Progress</h2>
                  {isEditing && (
                    <Input type="number" min="0" max="100" value={editedCompletion} onChange={(e) => setEditedCompletion(Number(e.target.value))} className="w-20 text-center" />
                  )}
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Completion</span>
                  <span className="font-medium text-foreground">{isEditing ? editedCompletion : protocol.completion_percentage}%</span>
                </div>
                <Progress value={isEditing ? editedCompletion : protocol.completion_percentage} className="h-2" />
              </CardContent>
            </Card>

            {/* Daily Stack with Evidence Grades */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-foreground">Daily Stack</h2>
                    {hasEvidenceGrades && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <Shield className="h-3 w-3" />Evidence Graded
                      </Badge>
                    )}
                  </div>
                  {isEditing && (
                    <Button size="sm" variant="outline" onClick={addProduct}>Add Product</Button>
                  )}
                </div>

                <div className="space-y-3">
                  {(isEditing ? editedProducts : protocol.products).map((product, index) => {
                    const grade = product.evidence_grade;
                    const gradeStyle = grade ? GRADE_STYLES[grade] : null;

                    return (
                      <div key={index} className={cn("border rounded-lg p-4 transition-colors", gradeStyle ? `${gradeStyle.bg} border` : "border-border")}>
                        {isEditing ? (
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <Label className="text-xs text-muted-foreground mb-1">Product Name</Label>
                                <Input value={product.product_name} onChange={(e) => updateProduct(index, 'product_name', e.target.value)} placeholder="Product name" />
                              </div>
                              <Button size="sm" variant="ghost" onClick={() => removeProduct(index)} className="mt-6"><X className="h-4 w-4" /></Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-xs text-muted-foreground mb-1">Dose</Label>
                                <Input value={product.dose} onChange={(e) => updateProduct(index, 'dose', e.target.value)} placeholder="e.g., 2 capsules" />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground mb-1">Time</Label>
                                <Input value={product.time} onChange={(e) => updateProduct(index, 'time', e.target.value)} placeholder="e.g., 7:00 AM" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-foreground font-medium">{product.product_name}</span>
                                  {gradeStyle && (
                                    <span className={cn("inline-flex items-center gap-1 text-xs font-mono font-bold px-1.5 py-0.5 rounded", gradeStyle.text, gradeStyle.bg)}>
                                      Grade {grade}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                  <span>{product.dose}</span>
                                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{product.time}</span>
                                </div>
                              </div>
                            </div>

                            {product.purpose && (
                              <p className="text-xs text-muted-foreground leading-relaxed pl-0 border-l-2 border-accent/30 ml-0 pl-3">
                                {product.purpose}
                              </p>
                            )}

                            {product.key_studies && (
                              <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
                                <FlaskConical className="h-3 w-3 shrink-0" />
                                {product.key_studies}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Synergy & Contraindications */}
            {!isEditing && assessmentMeta && (assessmentMeta.synergy_notes || assessmentMeta.contraindications) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assessmentMeta.synergy_notes && (
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-accent" />
                        <h3 className="text-sm font-semibold text-foreground">Synergies</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{assessmentMeta.synergy_notes}</p>
                    </CardContent>
                  </Card>
                )}
                {assessmentMeta.contraindications && (
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        <h3 className="text-sm font-semibold text-foreground">Considerations</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{assessmentMeta.contraindications}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Protocol Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Goal</span>
                    <p className="text-foreground mt-1">{protocol.goal}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status</span>
                    <p className="text-foreground mt-1 capitalize">{protocol.status}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Started</span>
                    <p className="text-foreground mt-1">
                      {new Date(protocol.started_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Products in Stack</span>
                    <p className="text-foreground mt-1">{protocol.products.length}</p>
                  </div>
                  {hasEvidenceGrades && (
                    <div>
                      <span className="text-muted-foreground">Evidence Summary</span>
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {protocol.products.filter(p => p.evidence_grade).map((p, i) => {
                          const gs = GRADE_STYLES[p.evidence_grade!];
                          return (
                            <span key={i} className={cn("text-xs font-mono font-bold px-1.5 py-0.5 rounded", gs?.text, gs?.bg)}>
                              {p.evidence_grade}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {hasEvidenceGrades && (
              <Card className="bg-muted/50">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Evidence Guide</h3>
                  <div className="space-y-1.5">
                    {Object.entries(GRADE_STYLES).map(([grade, style]) => (
                      <div key={grade} className="flex items-center gap-2 text-xs">
                        <span className={cn("font-mono font-bold w-5 text-center", style.text)}>{grade}</span>
                        <span className="text-muted-foreground">{style.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-foreground mb-2">Protocol Tips</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Take your supplements at consistent times daily for optimal results. Track your progress regularly and adjust dosages as needed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Protocol</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this protocol? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
