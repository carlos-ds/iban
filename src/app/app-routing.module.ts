import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IbanComponent } from './components/iban/iban.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: IbanComponent },
  { path: 'iban', component: IbanComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
