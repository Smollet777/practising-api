import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;

  constructor(
    private readonly cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    if (!this.src) {
      return;
    }

    const img = new Image();

    img.onload = () => {
      this.cdr.markForCheck();
    };

    img.src = this.src;
  }

}
