import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Edit2, Save, X, Trash2 } from "lucide-react";
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

  useEffect(() => {
    loadProtocol();
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
      toast({
        title: "Error",
        description: "Failed to load protocol",
        variant: "destructive",
      });
      navigate("/nova/protocols");
    }
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

      toast({
        title: "Protocol updated",
        description: "Your changes have been saved",
      });

      setIsEditing(false);
      loadProtocol();
    } catch (error) {
      console.error("Error updating protocol:", error);
      toast({
        title: "Error",
        description: "Failed to update protocol",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!protocol) return;

    try {
      const { error } = await supabase
        .from('user_protocols')
        .delete()
        .eq('id', protocol.id);

      if (error) throw error;

      toast({
        title: "Protocol deleted",
        description: "Protocol has been removed",
      });

      navigate("/nova/protocols");
    } catch (error) {
      console.error("Error deleting protocol:", error);
      toast({
        title: "Error",
        description: "Failed to delete protocol",
        variant: "destructive",
      });
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

  if (!protocol) {
    return (
      <div className="min-h-screen bg-ivory">
        <NovaNav />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          <p className="text-body text-ash">Loading protocol...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      <div className="border-b border-mist bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/nova/protocols")}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Protocols
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              {isEditing ? (
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-h3 font-semibold mb-2 max-w-md"
                />
              ) : (
                <h1 className="text-h3 font-semibold text-carbon">{protocol.protocol_name}</h1>
              )}
              <p className="text-body text-ash mt-2">
                Started {new Date(protocol.started_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • {protocol.status}
              </p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setIsEditing(false);
                    setEditedProducts(protocol.products);
                    setEditedName(protocol.protocol_name);
                    setEditedCompletion(protocol.completion_percentage);
                  }}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(true)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-body font-semibold text-carbon">Protocol Progress</h2>
                  {isEditing && (
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={editedCompletion}
                      onChange={(e) => setEditedCompletion(Number(e.target.value))}
                      className="w-20 text-center"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-ash">Completion</span>
                  <span className="font-medium text-carbon">{isEditing ? editedCompletion : protocol.completion_percentage}%</span>
                </div>
                <Progress value={isEditing ? editedCompletion : protocol.completion_percentage} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-body font-semibold text-carbon">Daily Stack</h2>
                  {isEditing && (
                    <Button size="sm" variant="outline" onClick={addProduct}>
                      Add Product
                    </Button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {(isEditing ? editedProducts : protocol.products).map((product, index) => (
                    <div key={index} className="border border-mist rounded-lg p-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <Label className="text-xs text-ash mb-1">Product Name</Label>
                              <Input
                                value={product.product_name}
                                onChange={(e) => updateProduct(index, 'product_name', e.target.value)}
                                placeholder="Product name"
                              />
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeProduct(index)}
                              className="mt-6"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs text-ash mb-1">Dose</Label>
                              <Input
                                value={product.dose}
                                onChange={(e) => updateProduct(index, 'dose', e.target.value)}
                                placeholder="e.g., 2 capsules"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-ash mb-1">Time</Label>
                              <Input
                                value={product.time}
                                onChange={(e) => updateProduct(index, 'time', e.target.value)}
                                placeholder="e.g., 7:00 AM"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-carbon font-medium">{product.product_name}</span>
                          <span className="text-ash text-sm">{product.dose} – {product.time}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-body font-semibold text-carbon mb-4">Protocol Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-ash">Goal</span>
                    <p className="text-carbon mt-1">{protocol.goal}</p>
                  </div>
                  <div>
                    <span className="text-ash">Status</span>
                    <p className="text-carbon mt-1 capitalize">{protocol.status}</p>
                  </div>
                  <div>
                    <span className="text-ash">Started</span>
                    <p className="text-carbon mt-1">
                      {new Date(protocol.started_at).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="text-ash">Products in Stack</span>
                    <p className="text-carbon mt-1">{protocol.products.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-pearl">
              <CardContent className="p-6">
                <h3 className="text-body font-semibold text-carbon mb-2">Protocol Tips</h3>
                <p className="text-sm text-ash leading-relaxed">
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
            <AlertDialogDescription>
              Are you sure you want to delete this protocol? This action cannot be undone.
            </AlertDialogDescription>
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
