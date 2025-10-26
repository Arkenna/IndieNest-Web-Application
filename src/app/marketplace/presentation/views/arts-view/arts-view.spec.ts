import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsView } from './arts-view';

describe('ArtsView', () => {
  let component: ArtsView;
  let fixture: ComponentFixture<ArtsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
