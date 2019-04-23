import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Track } from '../../shared/interfaces/track';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _currentTrack: Track;
  private readonly currentTrackSubject = new Subject<Track>();

  private _paused: boolean;
  private readonly pausedSubject = new Subject<boolean>();

  private _queue: Track[] = [];
  private readonly queueSubject = new Subject<Track[]>();

  set currentTrack(track: Track) {
    this._currentTrack = track;
    this.currentTrackSubject.next(this._currentTrack);
  }

  get currentTrack(): Track {
    return this._currentTrack;
  }

  get currentTrack$(): Observable<Track> {
    return this.currentTrackSubject.asObservable();
  }

  set paused(value: boolean) {
    this._paused = value;
    this.pausedSubject.next(this._paused);
  }

  get paused(): boolean {
    return this._paused;
  }

  get paused$(): Observable<boolean> {
    return this.pausedSubject.asObservable();
  }

  set queue(tracks: Track[]) {
    this._queue = tracks;
    this.queueSubject.next(this._queue);
  }

  get queue(): Track[] {
    return this._queue;
  }

  get queue$(): Observable<Track[]> {
    return this.queueSubject.asObservable();
  }

  prevTrack(): void {
    const currTrackIndex = this.currentTrackIndex();

    if (currTrackIndex < 0 || !this.queue[currTrackIndex - 1]) {
      return;
    }

    this.currentTrack = this.queue[currTrackIndex - 1];
  }

  nextTrack(): void {
    const currTrackIndex = this.currentTrackIndex();

    if (currTrackIndex < 0 || !this.queue[currTrackIndex + 1]) {
      return;
    }

    this.currentTrack = this.queue[currTrackIndex + 1];
  }

  randomTrack(): void {
    const random = Math.floor(Math.random() * this.queue.length);
    this.currentTrack = this.queue[random];
  }

  currentTrackIndex(): number {
    return this.queue.indexOf(this.currentTrack);
  }

}
