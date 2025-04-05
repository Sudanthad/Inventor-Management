import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogFormComponent } from './mat-dialog-form.component';

describe('MatDialogFormComponent', () => {
  let component: MatDialogFormComponent;
  let fixture: ComponentFixture<MatDialogFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatDialogFormComponent]
    });
    fixture = TestBed.createComponent(MatDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
