import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService, Genre, ValidateGenreService, ValidateGenre, SortDataService } from 'src/app/shared';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  genre;
  books;
  genreList;
  genreForm: FormGroup;
  formErrors = this.validateGenre.formErrors;
  successMessage:boolean = false;
  errorMessage:boolean = false;
  sortFlag: boolean = true;


  constructor(
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private workWithLS: LocalStorageService,
              private validateGenreService: ValidateGenreService,
              private validateGenre: ValidateGenre,
              private sortTable: SortDataService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params) => {
      if (params.genre && params.id){
        this.genre = params;
      } 
      else {
        this.genre = this.workWithLS.getSingleGenre(params.id);
      }
      
    });
    this.genreForm = this.validateGenreService.buildForm(this.genre);
    this.books = this.workWithLS.getBookList(this.genre.id, this.genre.genre);
    this.genreList = this.workWithLS.getData("genres");
  }
  changeGenreDetails(){
    let complexData:Genre = new Genre();
    Object.assign(complexData, this.genre, this.genreForm.value);
    complexData.id = +complexData.id;
    let flag = this.workWithLS.editGenre(complexData);
    if (!flag){
      this.successMessage = false;
      this.errorMessage = true;
    }
    else {
      this.successMessage = true;
      this.errorMessage = false;
    }
  }
  sortBooks(element:string, num:number){
    this.sortTable.sortData(element, this.sortFlag, num);
    this.sortFlag = !this.sortFlag;
  }
  deleteBook(element, event){
    event.preventDefault();
    let flag:boolean = this.workWithLS.deleteBook(element.dataset.id);
    if (flag){
      element.parentNode.removeChild(element);
    }
    else console.log ("Не удалось удалить книгу, попробуйте позже повторить операцию");
  }//end deleteBook()
  goToGenresList() {
    this.router.navigate(["/genres"]);
  }
}
