import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidateAuthor } from "./index"

@Injectable({
  providedIn: 'root'
})
export class ValidateAuthorService {
  form: FormGroup;
  constructor(  private fb: FormBuilder,
                private validateData: ValidateAuthor
    ) { }
 
  buildForm(author){
    this.form = this.fb.group({
      "firstName": [author.firstName, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(16),
        Validators.pattern(/[А-ЯA-Z]\w*/)
      ]],
      "lastName": [author.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(/[А-ЯA-Z]\w*/)
      ]],
      "middleName": [author.middleName, [
        Validators.maxLength(30)
      ]],
      "bday": [author.bday, [
        Validators.required,
        Validators.pattern(/\d{4}-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/)
      ]] 
    });//end assignment this.authForm
    
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
