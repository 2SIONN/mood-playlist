import { useState } from "react";
import { Hero } from "@/components/Hero";
import { MBTISelector } from "@/components/MBTISelector";
import { MoodTags } from "@/components/MoodTags";
import { LoadingEqualizer } from "@/components/LoadingEqualizer";
import { PlaylistCards } from "@/components/PlaylistCards";
import { searchPlaylistsByMood } from "@/api/spotify";

const Index = () => {
  const [selectedMBTI, setSelectedMBTI] = useState<string>("");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<any[]>([]);

  
  const handleGetPlaylist = async () => {
    setIsLoading(true);
    try {
      // MBTI와 Mood를 조합해서 검색어로 사용 (예: "ENFP 신나는")
      const query =
        (selectedMBTI ? selectedMBTI + " " : "") +
        (selectedMoods.length > 0 ? selectedMoods.join(" ") : "");
      const result = await searchPlaylistsByMood(query.trim() || "기분");
      // Spotify API 결과를 setPlaylists에 저장
      setPlaylists(
        result.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          image: item.images?.[0]?.url,
          tracks: item.tracks?.total,
          externalUrl: item.external_urls?.spotify,
        }))
      );
    } catch (e) {
      alert("플레이리스트를 불러오는 중 오류가 발생했습니다.");
      setPlaylists([]);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Hero />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <MBTISelector 
              selectedMBTI={selectedMBTI}
              onMBTIChange={setSelectedMBTI}
            />
            <MoodTags 
              selectedMoods={selectedMoods}
              onMoodsChange={setSelectedMoods}
            />
          </div>

          <div className="text-center mb-12">
            <button 
              onClick={handleGetPlaylist}
              disabled={isLoading || (!selectedMBTI && selectedMoods.length === 0)}
              className="btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Finding Your Vibe..." : "Get My Playlist 🎵"}
            </button>
          </div>

          {isLoading && (
            <div className="flex justify-center mb-12">
              <LoadingEqualizer />
            </div>
          )}

          {playlists.length > 0 && !isLoading && (
            <div className="animate-fade-in-up">
              <PlaylistCards playlists={playlists} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;