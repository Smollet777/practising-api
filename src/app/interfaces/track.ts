import { Album } from './album';
import { Artist } from './artist';

export interface Track {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: boolean;
  explicit_content_cover: boolean;
  preview: string;
  type: string;
  artist: Artist;
  album: Album;
}
