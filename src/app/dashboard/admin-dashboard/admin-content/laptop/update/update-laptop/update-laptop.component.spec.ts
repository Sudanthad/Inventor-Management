import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLaptopComponent } from './update-laptop.component';

describe('UpdateLaptopComponent', () => {
  let component: UpdateLaptopComponent;
  let fixture: ComponentFixture<UpdateLaptopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLaptopComponent]
    });
    fixture = TestBed.createComponent(UpdateLaptopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
