import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersView } from './developers-view';

describe('DevelopersView', () => {
  let component: DevelopersView;
  let fixture: ComponentFixture<DevelopersView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevelopersView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopersView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
