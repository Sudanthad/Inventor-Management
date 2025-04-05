import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inout } from './inout';
import { LoginService } from 'src/app/auth/login/login.service';
import { dataCount, InOutResponse, InOutService } from './in-out.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { LaptopComponent } from '../laptop/laptop.component';
import { AddItemComponent } from './add-item/add-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';

@Component({
  selector: 'app-inout',
  templateUrl: './inout.component.html',
  styleUrls: ['./inout.component.scss'],
})
export class InoutComponent implements OnInit {
  constructor(private inoutSer: InOutService, private dialog: MatDialog) {}
  page: number = 0;
  size: number = 100;
  totalRecordCount: number = 0;
  inout!: InOutResponse[];
  len!: dataCount[];

  ngOnInit() {
    this.getInOutLists();
  }
  getInOutLists() {
    this.inoutSer.getInOuts(this.page, this.size).subscribe((res: any) => {
      console.log(res.data.list);
      console.log(res.data.list.length);
      this.inout = res.data.list;
      this.len = res.data.list.length;
      this.ngOnInit;
    });
  }
  onPageChanged(event: PageEvent) {
    console.log('Page changed:', event.pageIndex, event.pageSize);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddItemComponent);

    // Refresh data when dialog closes
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getInOutLists(); // Refresh the table
      }
    });
  }
  openDialogUpdate() {
    const dialogRef = this.dialog.open(UpdateItemComponent);

    // Refresh data when dialog closes
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getInOutLists(); // Refresh the table
      }
    });
  }

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput
      .split(',')
      .map((str) => +str);
  }
}