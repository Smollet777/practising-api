import { Artist } from './artist';
import { Album } from './album';

export class Track {
  constructor(
    public id: number,
    public readable: boolean,
    public title: string,
    public title_short: string,
    public title_version: string,
    public link: string,
    public duration: number,
    public rank: number,
    public explicit_lyrics: boolean,
    public preview: string,
    public type: string,
    public artist: Artist,
    public album: Album) { }
}
