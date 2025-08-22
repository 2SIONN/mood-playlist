import { Play, Music, Users } from "lucide-react";

interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string | null;
  tracks: number | null;
  externalUrl: string | null;
}

interface PlaylistCardsProps {
  playlists: Playlist[];
}

export const PlaylistCards = ({ playlists }: PlaylistCardsProps) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold mb-4">
          Your Perfect Playlists 🎶
        </h2>
        <p className="text-muted-foreground">
          Handpicked based on your personality and current vibe
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <a href={playlist.externalUrl} key={playlist.id} className="playlist-card group cursor-pointer" target="_blank">
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <img 
                src={playlist.image} 
                alt={playlist.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-primary text-primary-foreground p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-6 h-6" fill="currentColor" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {playlist.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {playlist.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  <span>{playlist.tracks} tracks</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Spotify</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};