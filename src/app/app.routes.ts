import { Routes } from '@angular/router';
import { BeneficiariosComponent } from './components/beneficiarios/beneficiarios.component';
import { CargaDatosComponent } from './components/carga-datos/carga-datos.component';
import { GeneraTxtComponent } from './components/genera-txt/genera-txt.component';

export const routes: Routes = [
    { path: 'beneficiarios', component: BeneficiariosComponent },
    { path: 'cargar-datos', component: CargaDatosComponent },
    { path: 'generar-txt', component: GeneraTxtComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
