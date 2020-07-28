import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Authors, LocalStorageService, ValidateAuthor, Books, ValidateBook, ValidateAuthorService, ValidateBookService, SortDataService } from 'src/app/shared/index';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  author;
  books;
  authForm: FormGroup;
  formErrors = this.validateAuthor.formErrors;
  formErrorsBook = this.validateBook.formErrors;
  successMessage:boolean = false;
  errorMessage:boolean = false;
  showAddNewBook:boolean = false;
  newBookForm:FormGroup;
  newBook: Books = new Books();
  genreList;
  sortFlag: boolean = true;
  
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private workWithLS: LocalStorageService,
              private validateAuthorService: ValidateAuthorService,
              private validateAuthor: ValidateAuthor,
              private validateBook: ValidateBook,
              private validateBookService: ValidateBookService,
              private sortTable: SortDataService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params) => {
      if (params.firstName && params.lastName && params.middleName && params.bday && params.id){
        this.author = params;
      } 
      else {
        this.author = this.workWithLS.getSingleUser(params.id);
      }
      
    });
    this.authForm = this.validateAuthorService.buildForm(this.author);
    this.books = this.workWithLS.getBookList(this.author.id);
    this.newBookForm = this.validateBookService.buildForm(this.newBook);
    this.genreList = this.workWithLS.getData("genres");
  }
  changeAuthorDetails(){
    let complexData:Authors = new Authors();
    Object.assign(complexData, this.author, this.authForm.value);
    complexData.id = +complexData.id;
    let flag = this.workWithLS.editAuth(complexData);
    if (!flag){
      this.successMessage = false;
      this.errorMessage = true;
    }
    else {
      this.successMessage = true;
      this.errorMessage = false;
    }
  }//end changeAuthorDetails()
  sortAuthor(element:string, num:number){
    this.sortTable.sortData(element, this.sortFlag, num);
    this.sortFlag = !this.sortFlag;
  }
  editBook(element, event){
    event.preventDefault();
    this.router.navigate(["/books",element.id, element]);
  }//end editBook()
  deleteBook(element, event){
    event.preventDefault();
    let flag:boolean = this.workWithLS.deleteBook(element.dataset.id);
    if (flag){
      element.parentNode.removeChild(element);
    }
    else console.log ("Не удалось удалить автора, попробуйте позже повторить операцию");
  }//end deleteBook()
  showForm(e){
    e.preventDefault();
    this.showAddNewBook = !this.showAddNewBook;
  }
  addNewBook(){
    let complexData: Books = new Books();
    complexData.id = 0;
    complexData.authID = +this.author.id;
    Object.assign(complexData, this.newBookForm.value);
    let flag = this.workWithLS.addNewBook(complexData);
    if (!flag){
      console.log ("Такaя книга уже есть в БД")
    }
    else {
      console.log ("Книга успешно добавлен");
      this.books = this.workWithLS.getBookList(this.author.id);
    }
  }//end addNewBook()
  goToAuthorsList() {
    this.router.navigate(["/"]);
  }
}
