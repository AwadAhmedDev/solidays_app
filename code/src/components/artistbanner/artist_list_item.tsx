import { Link } from "react-router";
import type { ArtistListItemProps } from "../../models/props/ArtistListItemProps";



const ArtistListItem = ({ artist }: ArtistListItemProps) => {
  return (
    <li>
      <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
    </li>
  );
};

export default ArtistListItem;