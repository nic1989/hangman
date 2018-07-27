import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CatsubService {

  private baseApiUrl = GlobalVariable.URL;
  constructor(private http: HttpClient, private _router: Router) { }

  getCategory() {
    let url = this.baseApiUrl + 'category';
    return this.http.get<any>(url).pipe(catchError(this.errorHandler));
  }

  goSubcat(formval) {
    let inputval = formval.category.split(' ');
    localStorage.setItem('title', inputval[1]);
    return this._router.navigate(['/play/' + inputval[0]]);
  }

  getSubCat(id) {
    let url = this.baseApiUrl + 'subcategory/' + id;
    return this.http.get<any>(url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}
