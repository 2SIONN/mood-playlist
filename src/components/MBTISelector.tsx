import { ChevronDown, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MBTISelectorProps {
  selectedMBTI: string;
  onMBTIChange: (mbti: string) => void;
}

const mbtiTypes = [
  { value: "ENFP", label: "ENFP - The Campaigner", description: "Enthusiastic, creative, and sociable" },
  { value: "ENFJ", label: "ENFJ - The Protagonist", description: "Charismatic and inspiring leaders" },
  { value: "INFP", label: "INFP - The Mediator", description: "Poetic, kind, and altruistic" },
  { value: "INFJ", label: "INFJ - The Advocate", description: "Creative and insightful" },
  { value: "ENTP", label: "ENTP - The Debater", description: "Smart and curious thinkers" },
  { value: "ENTJ", label: "ENTJ - The Commander", description: "Bold, imaginative, and strong-willed" },
  { value: "INTP", label: "INTP - The Thinker", description: "Innovative inventors with unquenchable thirst" },
  { value: "INTJ", label: "INTJ - The Architect", description: "Imaginative and strategic thinkers" },
  { value: "ESFP", label: "ESFP - The Entertainer", description: "Spontaneous, energetic, and enthusiastic" },
  { value: "ESFJ", label: "ESFJ - The Consul", description: "Extraordinarily caring, social, and popular" },
  { value: "ISFP", label: "ISFP - The Adventurer", description: "Flexible and charming artists" },
  { value: "ISFJ", label: "ISFJ - The Protector", description: "Very dedicated and warm protectors" },
  { value: "ESTP", label: "ESTP - The Entrepreneur", description: "Smart, energetic, and perceptive" },
  { value: "ESTJ", label: "ESTJ - The Executive", description: "Excellent administrators, unsurpassed" },
  { value: "ISTP", label: "ISTP - The Virtuoso", description: "Bold and practical experimenters" },
  { value: "ISTJ", label: "ISTJ - The Logistician", description: "Practical and fact-minded" }
];

export const MBTISelector = ({ selectedMBTI, onMBTIChange }: MBTISelectorProps) => {
  return (
    <div className="playlist-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <User className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display text-xl font-semibold">Your MBTI Type</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Know your personality type? Select it to get personalized music recommendations.
      </p>
      
      <Select value={selectedMBTI} onValueChange={onMBTIChange}>
        <SelectTrigger className="w-full h-12 bg-background/50 backdrop-blur border-2 border-border hover:border-primary transition-colors">
          <SelectValue placeholder="Select your MBTI type" />
        </SelectTrigger>
        <SelectContent className="bg-card/95 backdrop-blur-sm border-border">
          {mbtiTypes.map((type) => (
            <SelectItem 
              key={type.value} 
              value={type.value}
              className="hover:bg-primary/5 focus:bg-primary/10 cursor-pointer"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{type.label}</span>
                <span className="text-sm text-muted-foreground">{type.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedMBTI && (
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-primary font-medium">
            Perfect! We'll find playlists that match your {selectedMBTI} personality.
          </p>
        </div>
      )}
    </div>
  );
};