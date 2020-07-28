import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Authors } from './authors';

@Injectable({
  providedIn: 'root'
})
export class SearchBooksService {

  constructor( private workWithLS: LocalStorageService) { }
  search(bookName){
    bookName = bookName.toLowerCase();
    let bookList = this.workWithLS.getData("books");
    let foundBooks = [];
    for (let book of bookList){
      let name = book.bookName.toLowerCase();
      let result = name.search(bookName);
      if( result != -1){
        foundBooks.push(book);
      }
    }
    for(let book of foundBooks){
      let author: Authors = this.workWithLS.getSingleUser(book.authID);
      let fullUserName = author.lastName + " " + author.firstName + " " +  author.middleName;
      book.authorName = fullUserName;
    }
    return foundBooks
  }
}
