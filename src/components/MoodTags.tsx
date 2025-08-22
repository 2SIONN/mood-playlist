import { Smile, Zap, Brain, Wind, HeartHandshake, Coffee } from "lucide-react";

interface MoodTagsProps {
  selectedMoods: string[];
  onMoodsChange: (moods: string[]) => void;
}

const moods = [
  { id: "happy", label: "Happy", icon: Smile, className: "energetic" },
  { id: "energetic", label: "Energetic", icon: Zap, className: "energetic" },
  { id: "focused", label: "Focused", icon: Brain, className: "focused" },
  { id: "chill", label: "Chill", icon: Wind, className: "calm" },
  { id: "romantic", label: "Romantic", icon: HeartHandshake, className: "creative" },
  { id: "productive", label: "Productive", icon: Coffee, className: "focused" },
];

export const MoodTags = ({ selectedMoods, onMoodsChange }: MoodTagsProps) => {
  const handleMoodToggle = (moodId: string) => {
    if (selectedMoods.includes(moodId)) {
      onMoodsChange(selectedMoods.filter(id => id !== moodId));
    } else {
      onMoodsChange([...selectedMoods, moodId]);
    }
  };

  return (
    <div className="playlist-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-secondary/10 rounded-lg">
          <Smile className="w-5 h-5 text-secondary" />
        </div>
        <h3 className="font-display text-xl font-semibold">Current Mood</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">
        How are you feeling right now? Select one or more moods that describe your vibe.
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMoods.includes(mood.id);
          
          return (
            <button
              key={mood.id}
              onClick={() => handleMoodToggle(mood.id)}
              className={`mood-tag ${mood.className} ${
                isSelected 
                  ? 'text-primary-foreground border-primary shadow-md' 
                  : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="font-medium">{mood.label}</span>
              </div>
            </button>
          );
        })}
      </div>
      
      {selectedMoods.length > 0 && (
        <div className="mt-4 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
          <p className="text-sm text-secondary font-medium">
            Great choice! We'll match your {selectedMoods.join(", ")} vibe.
          </p>
        </div>
      )}
    </div>
  );
};