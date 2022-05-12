import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularHeaderComponent } from './regular-header.component';

describe('RegularHeaderComponent', () => {
  let component: RegularHeaderComponent;
  let fixture: ComponentFixture<RegularHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
