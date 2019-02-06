export class Album {
  constructor(
    public id: number,
    public title: string,
    public cover: string,
    public cover_small: string,
    public cover_medium: string,
    public cover_big: string,
    public cover_xl: string,
    public tracklist: string,
    public genre_id: number,
    public fans: number,
    public release_date: string,
    public record_type: string,
    public explicit_lyrics: boolean,
    public type: string) { }
}
