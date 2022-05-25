import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercademiComponent } from './acercademi.component';

describe('AcercademiComponent', () => {
  let component: AcercademiComponent;
  let fixture: ComponentFixture<AcercademiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcercademiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercademiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
