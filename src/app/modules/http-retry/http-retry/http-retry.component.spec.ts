import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpRetryComponent } from './http-retry.component';

describe('HttpRetryComponent', () => {
  let component: HttpRetryComponent;
  let fixture: ComponentFixture<HttpRetryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpRetryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpRetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
