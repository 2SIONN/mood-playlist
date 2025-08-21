import axios from "axios";

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

// 기분(검색어)로 플레이리스트 검색 함수
export async function searchPlaylistsByMood(mood: string) {
  const token = await getSpotifyToken();
  const response = await axios.get(
    "https://api.spotify.com/v1/search",
    {
      params: {
        q: mood,
        type: "playlist",
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.playlists.items;
}