import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import ValidateForm from '../../helpers/form-field-validation';
import { AuthapiService } from '../../services/authapi.service';
import { LoginType } from '../../types/auth-type';
import { PopupService } from '../../services/popup.service';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf,NgToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public btn_state:boolean = false;


  constructor(private fb:FormBuilder,private auth:AuthapiService,private router:Router,private popup:PopupService){

    

  }






  loginForm = this.fb.group({
    email:new FormControl('karimul@gmail.com',[Validators.required]),
    password:new FormControl('Md7861942@k',Validators.required)
  })

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  loginSubmit(){
    if(this.loginForm.valid){
     this.btn_state = true;
       this.auth.login(this.loginForm.value as LoginType).subscribe({
        next:(data:any)=>{
          console.log(data);
          this.btn_state = false;
        if(data.isLogin){
          this.router.navigate(['/dashboard']);
        }
        },
        error:(error)=>{
          console.log(error);
          this.btn_state = false;
       if(Array.isArray(error.error.message)){
        this.popup.showError(error.error.message[0]);
        }else {
          this.popup.showError(error.error.message);
        }
        }
       });
    }else{
      ValidateForm.ValidateAllFormField(this.loginForm);
    }
       
  }

}
