import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsRoutingModule } from "./components-routing.module";

import { AuthorComponent } from './author/author.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookComponent } from './book/book.component';
import { GenresComponent } from './genres/genres.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GenreComponent } from './genre/genre.component';
import { FoundBooksComponent } from './found-books/found-books.component';



@NgModule({
    imports: [
        CommonModule,
        ComponentsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule
    ],
    declarations: [
        AuthorComponent,
        AuthorsComponent,
        BookComponent,
        GenresComponent,
        GenreComponent,
        FoundBooksComponent,
    ]
})
export class ComponentsModule { }