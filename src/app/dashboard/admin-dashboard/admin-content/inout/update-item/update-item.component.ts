import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/auth/login/login.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { InOutService } from '../in-out.service';
import { Inout } from '../inout';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
})
export class UpdateItemComponent {
  inoutu: Inout = {
    id:'',
    itemName: '',
    itemLocation: '',
    podNumber: '',
    serialNumber: '',
    assetNumber: '',
    date: '',
    activeState: true,
  };
  isAdded: boolean | undefined;
  dialog: any;
  constructor(
    private loginService: LoginService,
    private dialogRef: MatDialogRef<AddItemComponent>,
    private inoutser: InOutService
  ) {}

  inOutUpdate() {
    this.inoutser.inOutUpdate(this.inoutu).subscribe(
      (response) => {
        console.log('Update Success');
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
  inout(inout: any) {
    throw new Error('Method not implemented.');
  }
closeDialog(): void {
    this.dialogRef.close();
}
  
}
