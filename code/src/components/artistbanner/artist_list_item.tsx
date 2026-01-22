import { Link } from "react-router";
<<<<<<< HEAD
import type { ArtistListItemProps } from "../../models/props/ArtistListItemProps";
=======
import type { ArtistListItemProps } from "../../models/props/artist_list_item_props";
>>>>>>> refs/remotes/origin/master



const ArtistListItem = ({ artist }: ArtistListItemProps) => {
  return (
    <li>
      <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
    </li>
  );
};

export default ArtistListItem;