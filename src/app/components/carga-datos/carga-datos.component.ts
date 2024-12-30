import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-carga-datos',
  imports: [ReactiveFormsModule],
  templateUrl: './carga-datos.component.html',
  styleUrl: './carga-datos.component.css'
})
export class CargaDatosComponent {
  uploadForm: FormGroup;
  data: {
    cuil_nnya: string,
    apellido_y_nombre: string,
    domicilio_actual: string,
    nombre_de_la_institucion: string,
    codigo_postal: string,
    nombre_provincia: string,
    localidad: string,
    periodo_pago: string,
    periodo_liquidado: string,
    cuil_referente: string,
    apellido_y_nombre_referente: string,
    domicilio_actual_referente: string,
    codigo_posta_referente: string,
    privincia_referente: string,
    localidad_referente: string,
    vinculo_con_el_nnya: string,
    banco_agencia: string
  }[] = [];

  constructor(private _apiService: ApiService) {
    this.uploadForm = new FormGroup({
      file: new FormControl(null, Validators.required)
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      this.data = jsonData.map((row: any) => ({
        cuil_nnya: row['CUIL NNyA'],
        apellido_y_nombre: row['APELLIDO Y NOMBRE'],
        domicilio_actual: row['DOMICILIO ACTUAL'],
        nombre_de_la_institucion: row['NOMBRE DE LA INSTITUCION'],
        codigo_postal: row['CODIGO POSTAL'],
        nombre_provincia: row['NOMBRE PROVINCIA'],
        localidad: row['LOCALIDAD'],
        periodo_pago: row['PERIODO PAGO'],
        periodo_liquidado: row['PERIODO LIQUIDADO'],
        cuil_referente: row['CUIL REFERENTE'],
        apellido_y_nombre_referente: row['APELLIDO Y NOMBRE REFERENTE'],
        domicilio_actual_referente: row['DOMICILIO ACTUAL REFERENTE'],
        codigo_posta_referente: row['CODIGO POSTAL REFERENTE'],
        privincia_referente: row['PROVINCIA REFERENTE'],
        localidad_referente: row['LOCALIDAD REFERENTE'],
        vinculo_con_el_nnya: row['VINCULO CON EL NNyA'],
        banco_agencia: row['BANCO AGENCIA'],
        periodo: row['PERIODO'],
        provincia: row['PROVINCIA']

      }));

      console.log('desde data', this.data); // Verifica datos en la consola
    };

    reader.readAsArrayBuffer(file);
    this.uploadForm.patchValue({
      file: file
    });
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      console.log('Datos del archivo:', this.data);
      // Enviar los datos al backend
      this._apiService.addBeneficiarios(this.data).subscribe({
        next: response => {
          console.log('Datos guardados:', response);
        },
        error: error => {
          console.error('Error al guardar datos:', error);
        }
      });
    }
  }

}
