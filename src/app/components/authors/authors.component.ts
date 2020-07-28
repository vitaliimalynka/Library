import { Component, OnInit } from '@angular/core';
import { Authors, LocalStorageService, ValidateAuthor, ValidateAuthorService, SortDataService } from 'src/app/shared/index';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  dataForSite: Authors[];
  showAddNewAuthor: boolean = false;
  newAuthForm: FormGroup;
  newAuth: Authors = new Authors();
  formErrors = this.validateData.formErrors;
  sortFlag: boolean = true;

  constructor(private workWithLS: LocalStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private validate: ValidateAuthorService,
              private validateData: ValidateAuthor,
              private sortTable: SortDataService
  ) {}

  ngOnInit(): void {
    //get iformation to buil table of authors
    this.dataForSite = this.workWithLS.getDataForSite();
    this.newAuthForm = this.validate.buildForm(this.newAuth);
  }//ngOnInit()
  
  showForm(e){
    e.preventDefault();
    this.showAddNewAuthor = !this.showAddNewAuthor;
  }
  addNewAuthor(){
    let flag = this.workWithLS.addNewAuth(this.newAuthForm.value);
    if (!flag){
      console.log ("Такой автор уже есть в БД")
    }
    else {
      console.log ("Автор был успешно добавлен");
      this.dataForSite = this.workWithLS.getDataForSite();
    }
  }//end onSubmit()
  sortAuthors(element:string, num:number){
    this.sortTable.sortData(element, this.sortFlag, num);
    this.sortFlag = !this.sortFlag;
  }
  editAuthor(element, event){
    event.preventDefault(); 
    this.router.navigate([element.id, element], { relativeTo: this.activatedRoute });
  }

  deleteAuth(element, event){
    event.preventDefault(); 
    let flag:boolean = this.workWithLS.delAuth(element.dataset.id);
    if (flag){
      element.parentNode.removeChild(element);
    }
    else console.log ("Не удалось удалить автора, проверте, чтобы небыло привязанных книг");
  }//end deleteAuth()
}
