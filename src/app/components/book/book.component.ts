import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LocalStorageService, Books, ValidateBook, ValidateBookService } from 'src/app/shared/index';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book;
  bookForm:FormGroup;
  formErrorsBook = this.validateBook.formErrors;
  genreList;
  currentGenre;
  successMessage:boolean = false;
  errorMessage:boolean = false;

  constructor(  private router: Router,
                private activatedRoute: ActivatedRoute,
                private workWithLS: LocalStorageService,
                private validateBook: ValidateBook,
                private validateBookService: ValidateBookService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params) => {
      this.book = params;
    });
    this.currentGenre =this.book.genre;
    this.bookForm = this.validateBookService.buildForm(this.book);
    this.genreList = this.workWithLS.getData("genres");
    
  }

  changeBookDetails(){
    let complexData:Books = new Books();
    Object.assign(complexData, this.book, this.bookForm.value);
    complexData.authID = +complexData.authID;
    complexData.id = +complexData.id;
    let flag = this.workWithLS.editBook(complexData);
    if (!flag){
      this.successMessage = false;
      this.errorMessage = true;
    }
    else {
      this.successMessage = true;
      this.errorMessage = false;
    }
  }//end changeBookDetails()
  goToAuthor(){
    this.router.navigate(["/authors", this.book.authID]);
  }
}
