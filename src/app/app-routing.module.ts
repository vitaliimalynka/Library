import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsComponent } from './components/authors/authors.component';
import { GenresComponent } from './components/genres/genres.component';
import { FoundBooksComponent } from './components/found-books/found-books.component';


const routes: Routes = [
  {path: "", redirectTo: "authors", pathMatch: "full"},
  {path: 'authors', component: AuthorsComponent},
  {path: 'genres', component: GenresComponent},
  {path: 'results', component: FoundBooksComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
