import { Component, OnInit } from '@angular/core';
import { SearchBooksService, SortDataService } from 'src/app/shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-found-books',
  templateUrl: './found-books.component.html',
  styleUrls: ['./found-books.component.scss']
})
export class FoundBooksComponent implements OnInit {
  findStr:string;
  listOfBooks;
  sortFlag: boolean = true;
  currentLocation;
  constructor(
              private searchBooks: SearchBooksService,
              private sortTable: SortDataService,
              private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.forEach((params) => {
        this.findStr = params.search;
        console.log ("test")
      })
  };
  ngDoCheck(){
    if (this.currentLocation != document.location.pathname){
      this.listOfBooks = this.searchBooks.search(this.findStr);
      console.log ("testCheck")
    }
    this.currentLocation = document.location.pathname;
  }

  sortBooks(element:string, num:number){
    this.sortTable.sortData(element, this.sortFlag, num);
    this.sortFlag = !this.sortFlag;
  }
}
