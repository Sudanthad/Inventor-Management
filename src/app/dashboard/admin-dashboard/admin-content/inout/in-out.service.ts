import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Inout } from './inout';

export interface InOutResponse {
  id: string;
  itemName: string;
  itemLocation: string;
  activeState: true;
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
  providedIn: 'root'
})
export class InOutService {

  BASE_URL = 'http://localhost:8090';
  
    requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

 constructor(private http: HttpClient,private dialog:MatDialog) {}

  getInOuts(page: number, size:number) {
    const params = new HttpParams()
      .set('activeState', 'true')
      .set('page', page)
      .set('size', size);
    const url = 'http://localhost:8090/inout/get-all-item-by-paginated';

    return this.http.get<any>(url, { params });
  }

public inOutUpdate(inout: Inout): Observable<Inout> {
    return this.http.put<Inout>(`${this.BASE_URL}/inout/update_inout`, inout, {
      headers: this.requestHeader,
    });
  }


}