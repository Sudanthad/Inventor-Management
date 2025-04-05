import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login/login.service';
import { BackupService, dataCount, InOutResponse } from './backup.service';
import { PrinterService } from '../printer/printer.service';
import {MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss'],
})
export class BackupComponent implements OnInit {
  constructor(private backupSer: BackupService) {}
  page: number = 0;
  size: number = 10;
  totalRecordCount: number = 0;
  inout!: InOutResponse[];
  len!: dataCount[];

  ngOnInit() {
    this.getInOutLists();
  }
  getInOutLists() {
    this.backupSer.getInOuts(this.page, this.size).subscribe((res: any) => {
      console.log(res.data.list);
      console.log(res.data.list.length);
      this.inout = res.data.list;
      this.len = res.data.list.length;
    });
  }
  onPageChanged(event: PageEvent) {
    // Your pagination logic here
    console.log('Page changed:', event.pageIndex, event.pageSize);
    // Example: this.loadData(event.pageIndex, event.pageSize);
  }
}
  
  



  


