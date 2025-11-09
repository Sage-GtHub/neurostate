import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "What's your primary health goal?",
    options: [
      { value: "sleep", label: "Better Sleep", keywords: ["sleep", "rest", "night"] },
      { value: "recovery", label: "Faster Recovery", keywords: ["recovery", "restore", "muscle"] },
      { value: "cognitive", label: "Mental Performance", keywords: ["cognitive", "focus", "brain"] },
      { value: "general", label: "General Wellness", keywords: ["collagen", "omega", "mineral"] }
    ]
  },
  {
    id: 2,
    question: "What's your activity level?",
    options: [
      { value: "athlete", label: "Athlete/Very Active", boost: ["recovery", "collagen"] },
      { value: "active", label: "Moderately Active", boost: ["general"] },
      { value: "light", label: "Lightly Active", boost: ["sleep", "cognitive"] },
      { value: "sedentary", label: "Mostly Sedentary", boost: ["general"] }
    ]
  },
  {
    id: 3,
    question: "Do you have any specific concerns?",
    options: [
      { value: "stress", label: "Stress & Anxiety", keywords: ["adapt", "sleep"] },
      { value: "energy", label: "Low Energy", keywords: ["cognitive", "omega"] },
      { value: "joints", label: "Joint Health", keywords: ["collagen", "omega"] },
      { value: "none", label: "No Specific Concerns", keywords: [] }
    ]
  }
];

export const ProductQuiz = () => {
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    // Logic to recommend products based on answers
    const goal = answers[0];
    
    // Navigate to products with filter or show recommendations
    setOpen(false);
    navigate('/#products');
    
    // You could also show a results dialog with product recommendations
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={resetQuiz}
        >
          <HelpCircle className="h-4 w-4" />
          Find Your Perfect Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Find Your Perfect Products</DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">
              {questions[currentQuestion].question}
            </h3>

            <RadioGroup 
              value={answers[currentQuestion]} 
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={option.value}
                    className="flex items-center justify-between rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <span className="font-medium">{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1 ? (
                <>See Results</>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
