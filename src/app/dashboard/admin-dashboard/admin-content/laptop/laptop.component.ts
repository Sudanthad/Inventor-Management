import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { LaptopResponse, LaptopsService, dataCount } from './laptops.service';
import { UpdateLaptopComponent } from './update/update-laptop/update-laptop.component';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.scss'],
})
export class LaptopComponent implements OnInit {
  constructor(private laptopSer: LaptopsService, private dialog: MatDialog) {}

  page: number = 0;
  size: number = 5;
  totalRecordCount: number = 0;
  laptop!: LaptopResponse[];
  len!: dataCount[];
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageEvent!: PageEvent;

  ngOnInit() {
    this.getLaptopLists();
  }

  getLaptopLists() {
    this.laptopSer.getLaptops(this.page, this.size).subscribe(
      (res: any) => {
        console.log('Full API response:', res);
        console.log('Data list:', res.data.list);
        this.laptop = res.data.list;
        this.len = res.data.list.length;
      },
      (error) => {
        console.error('Error fetching laptops:', error);
      }
    );
  }

  onPageChanged(event: PageEvent) {
    console.log('Page changed:', event.pageIndex, event.pageSize);
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open();

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'success') {
  //       this.getLaptopLists();
  //     }
  //   });
  // }

  laptopDialogUpdate(laptop: LaptopResponse) {
    const dialogRef = this.dialog.open(UpdateLaptopComponent, {
      data: { laptop: laptop },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getLaptopLists();
      }
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput
      .split(',')
      .map((str) => +str);
  }
}
