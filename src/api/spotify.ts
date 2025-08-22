import axios, { AxiosError } from "axios"

// Spotify Client Credentials
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

// 토큰 발급 함수
export async function getSpotifyToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
      },
    }
  );
  return response.data.access_token;
}

// Spotify 검색 응답에서 우리가 쓰는 최소 필드 타입(필요 시 확장)
export type SpotifyPlaylistItem = {
  id: string
  name: string
  description?: string
  images?: Array<{ url: string }>
  tracks?: { total?: number }
  external_urls?: { spotify?: string }
}

type SearchPlaylistsOptions = {
  signal?: AbortSignal
  limit?: number
}

export async function searchPlaylistsByMood(
  mood: string,
  opts: SearchPlaylistsOptions = {}
): Promise<SpotifyPlaylistItem[]> {
  const token = await getSpotifyToken() // 이미 있으신 함수

  // 기본 limit = 10
  const limit = Number.isFinite(opts.limit) ? Number(opts.limit) : 10

  try {
    const res = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: mood,            // 필요시 encodeURIComponent는 axios가 params에서 처리
        type: "playlist",
        limit,
      },
      headers: { Authorization: `Bearer ${token}` },
      signal: opts.signal,   // ✅ AbortController 지원
      // 참고: 오래된 axios라면 위 대신 cancelToken을 써야 하지만, 최신은 signal 권장
    })

    // 방어: 경로가 없으면 빈 배열
    return res.data?.playlists?.items ?? []
  } catch (err) {
    // 선택: 401/429 등 구분 처리
    const e = err as AxiosError
    if (e.name === "CanceledError") {
      // 사용자가 취소한 경우엔 조용히 빈 배열 리턴 or 재던지기(선호에 따라)
      return []
    }
    throw err
  }
}
