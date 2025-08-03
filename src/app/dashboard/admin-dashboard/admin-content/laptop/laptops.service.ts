import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Laptop } from './laptop';


export interface LaptopResponse {
  id:string,
  serialNumber:string,
  assetNumber:string,
  branch:string,
  location:string,
  deviceOwnerEPF:string
  deviceOwnerName:string
  designation:string
  deviceType:string
  activeState:string
  status:string
  userStatus:string
  deviceStatus:string
}

export interface dataCount {
  length: number;
}

interface PaginationResponse {
  content: LaptopResponse[];
  page: number;
  size: number;
  number: number; // current page number (0-based)
}

@Injectable({
  providedIn: 'root',
})


export class LaptopsService {
  private readonly BASE_URL = 'http://localhost:8090';
  requestHeader:
    | HttpHeaders
    | { [header: string]: string | string[] }
    | undefined;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  
  ) {}

  getLaptops(page: number, size: number): Observable<PaginationResponse> {
    const params = new HttpParams()
      .set('activeState', 'true')
      .set('page', page.toString())
      .set('size', size.toString());

    // Remove the 'No-Auth' header if authentication is required
    return this.http.get<PaginationResponse>(
      `${this.BASE_URL}/laptop/get-all-laptops`,
      { params }
    );
  }

  public laptopUpdate(laptop: Laptop): Observable<Laptop> {
    return this.http.put<Laptop>(
      `${this.BASE_URL}/laptop/update_laptop`,
      laptop,
      {
        headers: this.requestHeader,
      }
    );
  }
}
