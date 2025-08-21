import { Music, Heart, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Music className="w-8 h-8 text-primary animate-pulse-glow" />
            <Heart className="w-6 h-6 text-secondary" />
            <Sparkles className="w-7 h-7 text-creative" />
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-creative bg-clip-text text-transparent leading-tight">
            What's your vibe today?
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover the perfect playlist tailored to your MBTI personality type and current mood. 
            Let your personality guide your next musical adventure!
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              16 Personality Types
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              Mood-Based Matching
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-creative rounded-full"></div>
              Spotify Integration
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute top-40 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-creative/10 rounded-full blur-xl"></div>
    </div>
  );
};