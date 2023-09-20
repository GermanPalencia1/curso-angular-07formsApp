import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})

export class emailValidator implements AsyncValidator{

  validate(control: AbstractControl):  Observable<ValidationErrors | null> {

    const email = control.value;
    return of({
      emailTaken: true,
    }).pipe(
      delay(2000)
    );

  }

}
