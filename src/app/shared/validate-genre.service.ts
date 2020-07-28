import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateGenre } from './validate-genre';

@Injectable({
  providedIn: 'root'
})
export class ValidateGenreService {
  form: FormGroup;
  constructor(  private fb: FormBuilder,
                private validateData: ValidateGenre
  ) { }
  buildForm(genre){
    this.form = this.fb.group({
      "genre": [genre.genre, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
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
