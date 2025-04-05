import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedInAndOutDTO, StandResponse } from './printer';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  private apiUrl =
    'http://localhost:8090/inout/get-all-item-by-paginated?activeState=false&page=0&size=10'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAllItemsByPaginated(
    activeState: boolean,
    page: number,
    size: number
  ): Observable<StandResponse<PaginatedInAndOutDTO>> {
    // Set up query parameters
    const params = new HttpParams()
      .set('activeState', activeState.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<StandResponse<PaginatedInAndOutDTO>>(
      `${this.apiUrl}`,
      { params }
    );
  
    
  }
}
