import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateBook, genreValidator } from './index';

@Injectable({
  providedIn: 'root'
})
export class ValidateBookService {
  form: FormGroup;
  constructor(  private fb: FormBuilder,
                private validateData: ValidateBook
  ) { }
  buildForm(book){
    this.form = this.fb.group({
      "bookName": [book.bookName, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]],
      "pages": [book.pages, [
        Validators.required,
        Validators.pattern(/\d{1,6}/)

      ]],
      "genre": [book.genre, [
        Validators.required,
        // Validators.pattern("Bыберите жанр")
        genreValidator
      ]],
    });//end assignment this.form
    
    this.form.valueChanges
        .subscribe(data => this.onValueChange(data));
    this.onValueChange();
    return this.form;
  }//end buildForm
  onValueChange(data?: any) {
    if (!this.form) return;
    let form = this.form;
    let formErrors = this.validateData.formErrors;
    let validationMessages = this.validateData.validationMessages;
    for (let field in formErrors) {
        formErrors[field] = "";
        let control = form.get(field);

        if (control && control.dirty && !control.valid) {
            let message = validationMessages[field];
            for (let key in control.errors) {
                formErrors[field] += message[key] + " ";
            }
        }
    }//end for
  }//end onValueChange() 
}
