import { Component, OnInit } from '@angular/core';
import { LocalStorageService, Genre, ValidateGenre, ValidateGenreService, SortDataService } from 'src/app/shared/index';
import { FormGroup} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genreList: Genre = new Genre();
  showAddNewGenre: boolean = false;
  formErrors = this.validateGenre.formErrors;
  newGenreForm: FormGroup;
  newGenre: Genre = new Genre;
  sortFlag: boolean = true;
  constructor( 
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private workWithLS: LocalStorageService,
                private validateGenre: ValidateGenre,
                private validateGenreService: ValidateGenreService,
                private sortTable: SortDataService
  ) { }

  ngOnInit(): void {
    this.genreList = this.workWithLS.getGenresWithBooks();
    this.newGenreForm = this.validateGenreService.buildForm(this.newGenre);
  }
  showForm(event){
    event.preventDefault();
    this.showAddNewGenre = !this.showAddNewGenre;
  }
  addNewGenre(){
    let complexData: Genre = new Genre();
    complexData.id = 0;
    Object.assign(complexData, this.newGenreForm.value);
    let flag:boolean = this.workWithLS.addNewGenre(complexData);
    if (!flag){
      console.log ("Такой жанр уже есть в БД")
    }
    else {
      console.log ("Жанр был успешно добавлен");
      this.genreList = this.workWithLS.getGenresWithBooks();
    }
  }
  sortGenres(element:string, num:number){
    this.sortTable.sortData(element, this.sortFlag, num);
    this.sortFlag = !this.sortFlag;
  }
  editGenre(element, event){
    event.preventDefault();
    this.router.navigate([element.id, element], { relativeTo: this.activatedRoute });
  }
  deleteGenre(element, event){
    event.preventDefault();
    let flag:boolean = this.workWithLS.deleteGenre(element.dataset.id, element.childNodes[0].innerHTML);
    if (flag){
      element.parentNode.removeChild(element);
    }
    else console.log ("Не удалось удалить жанр, проверте, чтобы небыло привязанных книг");
  }
}
