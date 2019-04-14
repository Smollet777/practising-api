import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { PreloaderService } from '../preloader.service';

@Component({
  selector: 'app-preloader',
  styleUrls: ['./preloader.component.scss'],
  templateUrl: './preloader.component.html'
})
export class PreloaderComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() group: string;
  @Input() loadingImage: string;

  private isShowing = false;

  @Output() readonly showChange = new EventEmitter();

  set show(val: boolean) {
    this.isShowing = val;
    this.showChange.emit(this.isShowing);
  }

  @Input()
  get show(): boolean {
    return this.isShowing;
  }

  constructor(private readonly preloaderService: PreloaderService) { }

  ngOnInit(): void {
    if (!this.name) { throw new Error('Preloader must have a \'name\' attribute.'); }

    this.preloaderService._register(this);
  }

  ngOnDestroy(): void {
    this.preloaderService._unregister(this);
  }

}
