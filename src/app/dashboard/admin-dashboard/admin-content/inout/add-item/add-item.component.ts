import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Inout } from '../inout';
import { LoginService } from 'src/app/auth/login/login.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { InOutService } from '../in-out.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
    trigger('drawCheckmark', [
      state('hidden', style({ strokeDasharray: 24, strokeDashoffset: 24 })),
      state('visible', style({ strokeDashoffset: 0 })),
      transition(
        'hidden => visible',
        animate('600ms cubic-bezier(0.4, 0, 0.6, 1)')
      ),
    ]),
  ],
})
export class AddItemComponent implements OnInit {
  inout: Inout = {
    id:'',
    itemName: '',
    itemLocation: '',
    podNumber: '',
    serialNumber: '',
    assetNumber: '',
    date: '',
    activeState:true
  };
  isAdded: boolean | undefined;
  constructor(
    private loginService: LoginService,
    private dialogRef: MatDialogRef<AddItemComponent>,
    private inoutser:InOutService
  ) {}

  ngOnInit() {
    this.inoutregisterForm;
  }

  inoutregisterForm() {
    this.loginService.inoutRegister(this.inout).subscribe(
      (response) => {
        console.log('Added Success');
        this.isAdded = true;

        setTimeout(() => {
          this.isAdded = false;
          this.dialogRef.close('success');
        }, 3000);
      },
      (error) => {
        console.log('Not Success');
      }
    );
    console.log(this.inout);
  }
 

  clear(form: NgForm) {
    form.resetForm();
  }
  edit() {}
  delete() {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
