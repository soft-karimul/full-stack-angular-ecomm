import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private toast:NgToastService) { }

  showSuccess(message:string) {
    this.toast.success({detail:"SUCCESS",summary:message,duration:5000});
  }
  
  showError(message:string) {
    console.log(message);
    this.toast.error({detail:"ERROR",summary:message,sticky:true});
  }

  showInfo() {
    this.toast.info({detail:"INFO",summary:'Your Info Message',sticky:true});
  }

  // showWarn() {
  //   this.toast.warn({detail:"WARN",summary:'Your Warn Message',duration:'5000'});
  // }
}
