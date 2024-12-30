import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-genera-txt',
  imports: [ReactiveFormsModule],
  templateUrl: './genera-txt.component.html',
  styleUrls: ['./genera-txt.component.css']
})
export class GeneraTxtComponent implements OnInit {
  generaTxtForm: FormGroup;
  periodos: { id: string, nombre: string }[] = [];

  constructor(private _apiService: ApiService) {
    this.generaTxtForm = new FormGroup({
      idPeriodoSeleccionado: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this._apiService.getPeriodos().subscribe((data) => {
      this.periodos = data;
    }, error => {
      console.error('Error al obtener los períodos.', error);
    });
  }

  onSubmit() {
    const idPeriodoSeleccionado = this.generaTxtForm.get('idPeriodoSeleccionado')?.value;
    this._apiService.generateTxt(idPeriodoSeleccionado).subscribe((data) => {
      const periodoSeleccionado = this.periodos.find(periodo => periodo.id == idPeriodoSeleccionado);
      const fileName = `TXTNomina${periodoSeleccionado?.nombre}.txt`;
      saveAs(data, fileName);
      console.log(`El archivo TXT para el período ${periodoSeleccionado?.nombre} se ha generado exitosamente.`);
    }, error => {
      console.log('Error al generar el TXT.', error);
    });
  }
}
