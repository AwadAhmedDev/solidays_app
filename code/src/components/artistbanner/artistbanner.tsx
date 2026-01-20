import { useEffect, useState } from "react";

import ArtistListItem from "./artist_list_item";
import type { Artist } from "../../../models/artist";
import type { ApiResponse } from "../../models/props/api_response";

export const ArtistBanner = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/artist`
      );

      if (!res.ok) {
        console.error("API error:", res.status);
        return;
      }

      const json = (await res.json()) as ApiResponse<Artist[]>;
      setArtists(json.data ?? []);
    };

    fetchArtists();
  }, []);

  return (
    <ul>
      {artists.map((artist) => (
        <ArtistListItem key={artist.id} artist={artist} />
      ))}
    </ul>
  );
};
