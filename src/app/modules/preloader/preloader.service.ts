import { Injectable } from '@angular/core';

import { PreloaderComponent } from './preloader/preloader.component';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  private readonly preloaderCache = new Set<PreloaderComponent>();

  _register(preloader: PreloaderComponent): void {
    this.preloaderCache.add(preloader);
  }

  _unregister(toRemove: PreloaderComponent): void {
    this.preloaderCache.forEach(preloader => {
      if (preloader === toRemove) {
        this.preloaderCache.delete(preloader);
      }
    });
  }

  isShowing(name: string): boolean | undefined {
    let showing;
    this.preloaderCache.forEach(preloader => {
      if (preloader.name === name) {
        showing = preloader.show;
      }
    });

    return showing;
  }

  show(name: string): void {
    this.preloaderCache.forEach(preloader => {
      if (preloader.name === name) {
        preloader.show = true;
      }
    });
  }

  hide(name: string): void {
    this.preloaderCache.forEach(preloader => {
      if (preloader.name === name) {
        preloader.show = false;
      }
    });
  }

  showGroup(group: string): void {
    this.preloaderCache.forEach(preloader => {
      if (preloader.group === group) {
        preloader.show = true;
      }
    });
  }

  hideGroup(group: string): void {
    this.preloaderCache.forEach(preloader => {
      if (preloader.group === group) {
        preloader.show = false;
      }
    });
  }

  showAll(): void {
    this.preloaderCache.forEach(preloader => preloader.show = true);
  }

  hideAll(): void {
    this.preloaderCache.forEach(preloader => preloader.show = false);
  }

}
