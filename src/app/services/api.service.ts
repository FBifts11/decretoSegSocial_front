import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBeneficiario } from '../models/beneficiario.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://127.0.0.1:3000'

  constructor(private _http: HttpClient) { }

  public getBeneficiarios(): Observable<IBeneficiario[]> {
    return this._http.get<IBeneficiario[]>(`${this.url}/beneficiarios`)
  }

  public truncateBeneficiarios(): Observable<any> {
    return this._http.delete(`${this.url}/beneficiarios`)
  }

  public addBeneficiarios(beneficiarios: any): Observable<any> {
    return this._http.post(`${this.url}/beneficiarios`, beneficiarios);
  }

  public getPeriodos(): Observable<{ id: string, nombre: string }[]> {
    return this._http.get<{ id: string, nombre: string }[]>(`${this.url}/periodos`)
  }

  public generateTxt(IdPeriodo:string):Observable<Blob> {
    console.log(IdPeriodo)
    return this._http.get(`${this.url}/${IdPeriodo}`, { responseType: 'blob' });
  }

}
