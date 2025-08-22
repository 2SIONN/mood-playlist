import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Hero } from "@/components/Hero";
import { MBTISelector } from "@/components/MBTISelector";
import { MoodTags } from "@/components/MoodTags";
import { LoadingEqualizer } from "@/components/LoadingEqualizer";
import { PlaylistCards } from "@/components/PlaylistCards";
import { searchPlaylistsByMood } from "@/api/spotify";

type Playlist = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  tracks: number | null;
  externalUrl: string | null;
};

const Index = () => {
  const [selectedMBTI, setSelectedMBTI] = useState<string>("");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // 검색어 조합 최적화: 공백 정리 및 mood OR 패턴 예시
  const query = useMemo(() => {
    const mbti = selectedMBTI?.trim();
    const moods = selectedMoods.map((m) => m.trim()).filter(Boolean);

    // Spotify 검색 고도화(선택): mood 단어들을 OR로 묶어 노이즈 감소
    const moodExpr = moods.length ? `(${moods.join(" OR ")})` : "";
    return [mbti, moodExpr].filter(Boolean).join(" ").trim() || "기분";
  }, [selectedMBTI, selectedMoods]);

  const handleGetPlaylist = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!selectedMBTI && selectedMoods.length === 0) return;

      // 이전 요청 취소
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      setIsLoading(true);
      setErrorMsg(null);

      try {
        const result = await searchPlaylistsByMood(query, {
          signal: abortRef.current.signal, // searchPlaylistsByMood가 옵션을 받을 수 있도록 확장 추천
        });

        const list = Array.isArray(result) ? result : [];
        // null/undefined 제거 + 매핑 + 기본값 + 중복 제거
        const mapped = list
          .filter(Boolean)
          .map((item: any): Playlist => ({
            id: String(item.id ?? ""),
            name: String(item.name ?? "Untitled"),
            description: String(item.description ?? ""),
            image: item.images?.[0]?.url ?? null,
            tracks: Number.isFinite(item.tracks?.total) ? item.tracks.total : null,
            externalUrl: item.external_urls?.spotify ?? null,
          }))
          .filter((p) => p.id); // id 없는 항목 제거

        const deduped = Array.from(new Map(mapped.map((p) => [p.id, p])).values());
        setPlaylists(deduped);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.log("fetch error:", err);
          setPlaylists([]);
          setErrorMsg("플레이리스트를 불러오는 중 문제가 발생했어요.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [query, selectedMBTI, selectedMoods]
  );

  useEffect(() => {
    // 디버깅 로그는 개발 모드에서만
    if (process.env.NODE_ENV === "development") {
      console.log("playlists", playlists);
    }
  }, [playlists]);

  const isDisabled = isLoading || (!selectedMBTI && selectedMoods.length === 0);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Hero />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleGetPlaylist} className="grid gap-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <MBTISelector
                selectedMBTI={selectedMBTI}
                onMBTIChange={setSelectedMBTI}
              />
              <MoodTags
                selectedMoods={selectedMoods}
                onMoodsChange={setSelectedMoods}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                onClick={undefined} // submit으로 통일
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-busy={isLoading}
                className="btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Finding Your Vibe..." : "Get My Playlist 🎵"}
              </button>
            </div>

            {/* 라이브 리전: 로딩/결과 카운트 공지 */}
            <p className="sr-only" role="status" aria-live="polite">
              {isLoading
                ? "플레이리스트를 불러오는 중입니다."
                : `총 ${playlists.length}개의 플레이리스트를 찾았습니다.`}
            </p>
          </form>

          {isLoading && (
            <div className="flex justify-center mb-12" aria-hidden>
              <LoadingEqualizer />
            </div>
          )}

          {!!errorMsg && !isLoading && (
            <div
              className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-700"
              role="alert"
            >
              {errorMsg}
            </div>
          )}

          {!isLoading && playlists.length === 0 && !errorMsg && (
            <div className="mb-6 rounded-md border bg-white p-6 text-center text-sm text-gray-600 dark:bg-zinc-900 dark:text-zinc-300">
              조건에 맞는 플레이리스트를 찾지 못했어요. 다른 MBTI나 기분 태그로 다시 시도해 보세요.
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
