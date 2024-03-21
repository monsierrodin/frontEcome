import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonClientComponent } from './mon-client.component';

describe('MonClientComponent', () => {
  let component: MonClientComponent;
  let fixture: ComponentFixture<MonClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
