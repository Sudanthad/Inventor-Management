import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
export interface InOutResponse {
  id: number;
  itemName: string;
  itemLocation: string;
  activeState: string;
  date: string;
  serialNumber: string;
  podNumber: string;
  assetNumber: string;
  
}
export interface dataCount {
  length:number
}

interface PaginationResponse {
  content: InOutResponse[];
  page: number;

  size: number;
  number: number; // current page number (0-based)
 
}




@Injectable({
  providedIn: 'root',
})
export class BackupService {
  constructor(private http: HttpClient) {}

  getInOuts(page: number, size:number) {
    const params = new HttpParams()
      .set('activeState', 'false')
      .set('page', page)
      .set('size', size);
    const url = 'http://localhost:8090/inout/get-all-item-by-paginated';

    return this.http.get<any>(url, { params });
  }
}
