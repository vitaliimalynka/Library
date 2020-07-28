import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthorComponent } from './author/author.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookComponent } from './book/book.component';
import { GenreComponent } from './genre/genre.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: "authors/:id", component: AuthorComponent },
            { path: "genres/:id", component: GenreComponent },
            { path: "books/:id", component: BookComponent },
            { path: '**', component:PageNotFoundComponent},
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ComponentsRoutingModule { }
