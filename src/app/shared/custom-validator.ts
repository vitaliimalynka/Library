import { AbstractControl } from "@angular/forms";

export function genreValidator(control: AbstractControl): { [key: string]: any } {
    let value = control.value;
    if (value != "Выберите жанр"){
        return null;
    } else {
        return { "genreValidator": { value } }
    }
}