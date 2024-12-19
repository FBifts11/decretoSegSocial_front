import { Component, OnInit } from '@angular/core';
import { IBeneficiario } from '../../models/beneficiario.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-beneficiarios',
  imports: [],
  templateUrl: './beneficiarios.component.html',
  styleUrl: './beneficiarios.component.css'
})
export class BeneficiariosComponent implements OnInit {

  listadoBeneficiarios: IBeneficiario[] = []
  flag:boolean = false
  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.verBeneficiarios()
  }

  verBeneficiarios() {
    this._apiService.getBeneficiarios().subscribe((datos: IBeneficiario[]) => {
      if (Array.isArray(datos)) {
        console.log(datos);
        this.listadoBeneficiarios = datos;
        console.log('Este es el listado de beneficiarios ', this.listadoBeneficiarios);
      } else {
        console.log('La respuesta no es un array');
        this.flag = true
      }
    })
  }

  vaciarTabla() {
    this._apiService.truncateBeneficiarios().subscribe(() => {
      console.log('la tabla está vacia')
      this.listadoBeneficiarios = []
      this.verBeneficiarios()
    })
  }
}
