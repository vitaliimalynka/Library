export class ValidateGenre {
    formErrors = {
        "genre": ""
    };
    
    validationMessages = {
        "genre": {
            "required": "Обязательное поле.",
            "minlength": "Значение должно быть не менее 2 символа.",
            "maxlength": "Значение не должно быть больше 20 символов." 
        }
    };
}
