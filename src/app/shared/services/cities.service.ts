import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class CitiesService {

  /**
   * Constructor
   */
  constructor(private http: HttpClient) { }

  /**
   * Method to call the webservice to get the list of cities
   */
  public getList(pageNumber: number, itemsByPage: number): Observable<any> {
    return this.http.get<any>(environment.baseUrl + '/cities/queryByPage?page=' + pageNumber + '&size=' + itemsByPage);
  }
}
