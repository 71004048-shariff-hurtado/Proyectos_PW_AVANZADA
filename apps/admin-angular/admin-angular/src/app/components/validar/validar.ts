import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { email, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-validar',
  imports: [ReactiveFormsModule],
  templateUrl: './validar.html',
  styleUrl: './validar.css',
})
export class Validar {
  emailControl = new FormControl('wilder@gmail.com',[
    Validators.required,
    Validators.email
  ])
  
  constructor(){
    console.log('Componente cargado');
    console.log(this.emailControl.value);
    console.log(this.emailControl.valid);
  }

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    pasword: new FormControl('',[Validators.required])
  })

  onSubmit(){
    console.log(this.loginForm.value);
  }
}

function paswordValidator(control: FormControl): ValidationErrors | null{
  const value = control.value;
  const isValid = value && value.length >=8;
  return isValid ? null : { weakPassword: true};
}
