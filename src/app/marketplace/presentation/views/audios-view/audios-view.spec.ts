import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiosView } from './audios-view';

describe('AudiosView', () => {
  let component: AudiosView;
  let fixture: ComponentFixture<AudiosView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudiosView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudiosView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
