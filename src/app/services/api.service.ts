import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBeneficiario } from '../models/beneficiario.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url='http://127.0.0.1:3000/beneficiarios'

  constructor(private _http:HttpClient) { }

  public getBeneficiarios():Observable<IBeneficiario[]> {
    return this._http.get<IBeneficiario[]>(this.url)
  }

  public truncateBeneficiarios():Observable<any>{
    return this._http.delete(this.url)
  }
}
