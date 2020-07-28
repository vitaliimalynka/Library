import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ValidateAuthor, ValidateBook, ValidateGenre, SortDataService, SearchBooksService } from './shared';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
    
  ],
  providers: [
    ValidateAuthor,
    ValidateBook,
    ValidateGenre,
    SortDataService,
    SearchBooksService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
