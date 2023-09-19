import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})

export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group ({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favouriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });

  public newFavourite: FormControl = new FormControl ('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  )  {}

  get favouriteGames() {
    return this.myForm.get('favouriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  isValidFieldInArray(formArray:FormArray, index: number): boolean | null {
    return formArray.controls[index].errors
    && formArray.controls[index].touched
  }

  getFieldError(field:string) : string | null {

    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo requiere mínimo de ${errors['minlength'].requiredLength} caracteres.`;
      }
    }

    return null;

  }

  onAddToFavourites(): void {

    if(this.newFavourite.invalid) return;

    const newGame = this.newFavourite.value;

    //this.favouriteGames.push(new FormControl(newGame, Validators.required))
    this.favouriteGames.push(
      this.fb.control(newGame, Validators.required)
    );

    this.newFavourite.reset();

  }

  onDeleteFavourite(index: number): void {
      this.favouriteGames.removeAt(index);
  }

  onSubmit(): void {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    (this.myForm.controls['favouriteGames'] as FormArray) = this.fb.array([]);

    this.myForm.reset();

  }

}
