import { FormControl, ValidationErrors } from "@angular/forms";

//Validación síncrona
export const cantBeStrider = (control: FormControl): ValidationErrors | null => {

  const value: string = control.value.trim().toLowerCase();

  if(value === 'strider'){

    return {
      noStrider: true,
    }
  }

  return null;
}
