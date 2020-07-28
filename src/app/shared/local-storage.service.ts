// this service is used to exchange information with local storage
import { Injectable } from '@angular/core';
import { Authors, Books, Genre} from './index';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // declare some list of authors for demo
  private AuthDemoDB: Authors [] = [
    {id: 1, firstName: "A.", lastName: "Пушкин", middleName: "С.", bday: "1799-06-06"},
    {id: 2, firstName: "И.", lastName: "Тургенев", middleName: "С.", bday: "1818-11-09"},
    {id: 3, firstName: "Т.", lastName: "Шевченко", middleName: "Г.", bday: "1814-03-10"}
  ]
  // declare some list of books for demo
  private BooksDemoDB: Books [] = [
    {id: 1, authID: 3, bookName: "Кобзар", pages: 352, genre: "поэзия"},
    {id: 2, authID: 3, bookName: "Катерина", pages: 40, genre: "поэма"},
    {id: 3, authID: 3, bookName: "Наймичка", pages: 316, genre: "поэзия"},
    {id: 4, authID: 1, bookName: "Евгений Онегин", pages: 376, genre: "роман"},
    {id: 5, authID: 1, bookName: "Сказка о царе Салтане", pages: 33, genre: "сказка"},
    {id: 6, authID: 2, bookName: "Отцы и дети", pages: 345, genre: "роман"}
  ]
  private genres: Genre[] = [
    {id: 1, genre: "поэзия"},
    {id: 2, genre: "драма"},
    {id: 3, genre: "комедия"},
    {id: 4, genre: "трагедия"},
    {id: 5, genre: "роман"},
    {id: 6, genre: "ужасы"},
    {id: 7, genre: "баллада"},
    {id: 8, genre: "поэма"},
    {id: 9, genre: "сонет"},
    {id: 10, genre: "ода"},
    {id: 11, genre: "эпиграмма"},
    {id: 12, genre: "повесть"},
    {id: 13, genre: "сказка"}
  ]
  constructor() { }
  //uneversal method to set info to localStorage
  setData(key:string, object:Authors):void{
    localStorage.setItem(key, JSON.stringify(object));
  }
  //universal method to get info from localStorage
  getData(key:string){
    return JSON.parse(localStorage.getItem(key));
  }
  // method for write demo information
  setDemo(key):void{
    switch (key){
      case "authors": {
        localStorage.setItem("authors", JSON.stringify(this.AuthDemoDB));
        console.log ("set Demo List of Authors");
        break;
      } 
      case "books": {
        localStorage.setItem("books", JSON.stringify(this.BooksDemoDB));
        console.log ("set Demo List of books");
        break;
      } 
      case "genres": {
        localStorage.setItem("genres", JSON.stringify(this.genres));
        console.log ("set default List of genres");
        break;
      }
      default: {
        console.log("unexpected key");
      }
    }
  }
  //mothod ckecks necessary keys in the localStorage. If some won't find, it calls the setDemo method
  checkData():void{
    console.log ("checkData in the localStorage");
    let auth: boolean, books: boolean, genres: boolean;
    auth = books = genres = true;
    if (localStorage.getItem("authors") === null){
      this.setDemo("authors");
    } 
    if (localStorage.getItem("books") === null){
      this.setDemo("books");
    } 
    if (localStorage.getItem("genres") === null){
      this.setDemo("genres");
    }
  }// end checkData()
  getNumberOfBooks(list, key:string): []{
    let numbersOfBooks = list.reduce(function (object, element){
      if (!object.hasOwnProperty(element[key])){
        object[element[key]] = 0;
      }
      object[element[key]]++;
      return object;
    }, {});
    return numbersOfBooks;
  }//end getNumberOfBooks()
  getDataForSite(): Authors []{
    // localStorage.clear();
    this.checkData();
    let authList = this.getData("authors");
    let booksList = this.getData("books");
    let numberOfBooksperAuthor = this.getNumberOfBooks(booksList,"authID");
      for (let i = 0, length = authList.length; i < length; i++){
        if (numberOfBooksperAuthor[authList[i].id]){
          authList[i].books = numberOfBooksperAuthor[authList[i].id];
        }
        else authList[i].books = 0;
      }
    return authList;
  }// end getDataForSite()
  getGenresWithBooks(){
    let genreList = this.getData("genres");
    let booksList = this.getData("books");
    let numberOfBooksPerGenre = this.getNumberOfBooks(booksList, "genre");
    for (let i = 0, length = genreList.length; i < length; i++){
      if (numberOfBooksPerGenre[genreList[i].genre]){
        genreList[i].books = numberOfBooksPerGenre[genreList[i].genre];
      }
      else genreList[i].books = 0;
    }
    return genreList;
  }//end getGenresWithBooks()
  getSingleUser(id){
    let authList = this.getData("authors");
    for (let i = 0, length = authList.length; i<length; i++){
      if (id == authList[i].id){
        return authList[i];
      }
    }
    console.log ("пользователь не найден");
    return false;
  }// end getSingleUser
  getSingleGenre(id){
    let genresList = this.getData("genres");
    for (let i = 0, length = genresList.length; i<length; i++){
      if (id == genresList[i].id){
        return genresList[i];
      }
    }
    console.log ("жанр не найден");
    return false;
  }//end getSingleGenre
  getBookList(id:number, genre?:string){
    let booklist = this.getData("books");
    let books = [];
    if(genre){
      for (let book of booklist){
        if (book.genre == genre){
          books.push(book);
        }
      }
      return books;
    }
    id = +id;
    if(isNaN(id)){
      console.log ("id не число");
      return
    }
    for (let book of booklist){
      if (book.authID == id){
        books.push(book);
      }
    }
    return books;
  }//end getBookList()
  addNewAuth(newAuth:Authors):boolean{
    let authList = this.getData("authors");
    let flag: boolean = false;
    let maxID: number = 0;
    let newObjectForArr:Authors = new Authors(); 
    // check same author in DB
    for (let auth of authList){
      if (auth.lastName == newAuth.lastName && auth.firstName == newAuth.firstName){
        flag = true;
      }
    }
    if (flag){
      return false
    }
    // end check same author in DB
    else {
      for (let auth of authList){
        maxID = (maxID < auth.id) ? auth.id : maxID;
      }
      maxID++;
      newObjectForArr.id = maxID;
      Object.assign(newObjectForArr, newAuth);
      authList.push(newObjectForArr);
      this.setData("authors",authList);
    }
    return true;
  }//end saveNewAuth();
  addNewBook(newBook:Books):boolean{
    let bookList = this.getData("books");
    let flag: boolean = false;
    let maxID: number = 0;
    let newObjectForArr:Books = new Books(); 
    // check same book in DB
    for (let book of bookList){
      if (book.bookName == newBook.bookName){
        flag = true;
      }
    }
    if (flag){
      return false
    }
    // end check same book in DB
    else {
      for (let book of bookList){
        maxID = (maxID < book.id) ? book.id : maxID;
      }
      maxID++;
      Object.assign(newObjectForArr, newBook);
      newObjectForArr.id = maxID;
      bookList.push(newObjectForArr);
      this.setData("books",bookList);
    }
    return true;
  }//end saveNewAuth();
  addNewGenre(newGenre):boolean{
    let genreList = this.getData("genres");
    let flag: boolean = false;
    let maxID: number = 0;
    let newObjectForArr:Genre = new Genre(); 
    // check same genre in DB
    for (let item of genreList){
      if (item.genre == newGenre.genre){
        flag = true;
      }
    }
    if (flag){
      return false
    }
    // end check same genre in DB
    else {
      for (let genre of genreList){
        maxID = (maxID < genre.id) ? genre.id : maxID;
      }
      maxID++;
      Object.assign(newObjectForArr, newGenre);
      newObjectForArr.id = maxID;
      genreList.push(newObjectForArr);
      this.setData("genres",genreList);
    }
    return true;
    return;
  }// end addNewGenre()
  delAuth(id:number):boolean{
    let authList = this.getData("authors");
    let booksList = this.getData("books");
    let flag: boolean = false;
    //delete author from db;
    for (let book of booksList){
      if (book.authID == id){
        return flag;
      }
    }
    for (let i = 0, length = authList.length; i<length; i++){
      if (id == authList[i].id){
        authList.splice(i,1);
        this.setData("authors",authList);
        flag = true;
        break;
      }
    }
    // end delete author from db;
    if (flag){
      return true;
    }
    return false;
  }//end delAuth();
  deleteBook(id:number):boolean{
    let booksList = this.getData("books");
    let flag: boolean = false;
    for (let i = 0, length = booksList.length; i<length; i++){
      if (id == booksList[i].id){
        booksList.splice(i,1);
        this.setData("books",booksList);
        flag = true;
        break;
      }
    }
    // end delete book from db;
    if (flag){
      return true;
    }
    return false;
  }//end deleteBook()
  deleteGenre(id:number, name:string):boolean{
    let genresList = this.getData("genres");
    let bookList = this.getData("books");
    let flag: boolean = false;
    for (let book of bookList){
      if (book.genre == name){
        return flag;
      }
    }
    for (let i = 0, length = genresList.length; i<length; i++){
      if (id == genresList[i].id){
        genresList.splice(i,1);
        this.setData("genres",genresList);
        flag = true;
        break;
      }
    }
    //end delete genre from db;
    if (flag){
      return true;
    }
    return false;
  }//end deleteBook()
  editAuth(author):boolean{
    let authList = this.getData("authors");
    let flag: boolean = false;
    //delete author from db;
    for (let i = 0, length = authList.length; i<length; i++){
      if (author.id == authList[i].id){
        delete author.books;
        Object.assign(authList[i], author);
        this.setData("authors",authList);
        flag = true;
        break;
      }
    }
    if (flag){
       return true;
    }
    return false;
  }//end delAuth();  
  editBook(book):boolean{
    let booksList = this.getData("books");
    let flag: boolean = false;
    //delete book from db;
    for (let i = 0, length = booksList.length; i<length; i++){
      if (book.id == booksList[i].id){
        Object.assign(booksList[i], book);
        this.setData("books",booksList);
        flag = true;
        break;
      }
    }
    if (flag){
       return true;
    }
    return false;
  }//end editBook()
  editGenre(genre){
    let genresList = this.getData("genres");
    let flag: boolean = false;
    //delete book from db;
    for (let i = 0, length = genresList.length; i<length; i++){
      if (genre.id == genresList[i].id){
        Object.assign(genresList[i], genre);
        this.setData("genres",genresList);
        flag = true;
        break;
      }
    }
    if (flag){
       return true;
    }
    return false;
  }
}
