import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthapiService } from '../../services/authapi.service';
import { ReactiveFormsModule ,FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NgIf } from '@angular/common';
import ValidateForm from '../../helpers/form-field-validation';
import { UserType } from '../../types/auth-type';
import { PopupService } from '../../services/popup.service';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf,NgToastModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  public btn_state:boolean = false;

  constructor(private router:Router,private auth:AuthapiService,private fb:FormBuilder,private popup:PopupService
  ){
  }


  signupForm =  this.fb.group({
    full_name: new FormControl('',[Validators.required,Validators.minLength(5)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    role:new FormControl('',[Validators.required])
  })

  get full_name() {
    return this.signupForm.get('full_name');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get role() {
    return this.signupForm.get('role');
  }


  
  submitForm(){
    if(this.signupForm.valid){
      this.btn_state = true;
      this.auth.signup(this.signupForm.value as UserType).subscribe({
    next:(data:any)=>{
      this.btn_state = false;
      this.router.navigate(['/login']);
    } ,
    error:(error)=>{
      this.btn_state   = false;
    if(Array.isArray(error.error.message)){
      this.popup.showError(error.error.message[0]);
      }else {
        this.popup.showError(error.error.message);
      }
    }         
        })
    }else{
      ValidateForm.ValidateAllFormField(this.signupForm);
    }

  }


}
