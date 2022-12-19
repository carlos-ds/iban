import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IbanComponent } from './components/iban/iban.component';
import { IbanValidationComponent } from './components/iban/iban-validation/iban-validation.component';
import { IbanGenerationComponent } from './components/iban/iban-generation/iban-generation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { IbanService } from './services/iban.service';
import { LengthExcludingWhitespacePipe } from './pipes/length-excluding-whitespaces.pipe';
import {LocalStorageService} from './services/local-storage.service';
import {UniqueIdentifierService} from './services/unique-identifier.service';

@NgModule({
  declarations: [
    AppComponent,
    IbanComponent,
    IbanValidationComponent,
    IbanGenerationComponent,
    PageNotFoundComponent,
    FooterComponent,
    LengthExcludingWhitespacePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [IbanService, LocalStorageService, UniqueIdentifierService],
  bootstrap: [AppComponent],
})
export class AppModule {}
