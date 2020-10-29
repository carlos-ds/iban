import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IbanComponent } from './components/iban/iban.component';

const routes: Routes = [
  { path: '', component: IbanComponent },
  { path: 'iban', component: IbanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
