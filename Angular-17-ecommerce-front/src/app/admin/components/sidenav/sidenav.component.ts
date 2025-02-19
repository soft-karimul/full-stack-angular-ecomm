import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavControllService } from '../../services/nav-controll.service';
import { throws } from 'assert';
import { AuthapiService } from '../../services/authapi.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [NgFor,JsonPipe,NgClass,NgIf,RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  private authService = inject(AuthapiService);
constructor(private navCtrl:NavControllService) {


}

public navController :boolean = false;
// @HostListener('window:resize', ['$event'])
// onResize(event: { target: { innerWidth: any; }; }) {
//   // Update window width when the window is resized
//   this.windowWidth = event.target.innerWidth;
//   alert(this.windowWidth);
//   if(this.windowWidth < 550){
//     this.navController = true;
//   }
// }

ngOnInit(){
  // if(window.innerWidth < 550){
  //   this.navController = true;
  // }
}

  ngAfterViewInit(){
     this.navCtrl.adminNavControll.subscribe({
      next: (data)=>{
       this.navController = data;
      }
     })
  }


 

  public menus:any[] = [
    {
      label:'Dashtar',
      icon:'fs-5 mx-2 uil uil-shopping-bag',
      link:'/dashboard',
      sub : [
        
      ]
    },
    {
      label:'dashboard',
      icon:'fs-5 mx-2 uil uil-create-dashboard',
      link:'/dashboard',
      sub : [
        
      ]
    },
    {
      label:'catalog',
      icon:'fs-5 mx-2 uil uil-cell',
      icon_sub:'uil uil-angle-right mx-2 fs-5',
      link:'',
      isopen:false,
      sub : [
        {
          label:'product',
          icon:' sub-icon mx-2 uil uil-create-dashboard',
          link:'product',
          sub:[

          ]
        },
        {
          label:'category',
          icon:' sub-icon mx-2 uil uil-create-dashboard',
          link:'category',
          sub:[

          ]
        }
      ]
    },
    {
      label:'customers',
      icon:'fs-5 uil uil-users-alt mx-2',
      link:'/customers',
      sub : [
        
      ]
    },
    {
      label:'orders',
      icon:'fs-5 uil uil-map-pin mx-2',
      link:'',
      sub : [
        
      ]
    },
    {
      label:'our staff',
      icon:'fs-5 uil uil-user-md mx-2',
      link:'',
      sub : [
        
      ]
    },
    {
      label:'settings',
      icon:'fs-5 uil uil-setting mx-2',
      link:'',
      sub : [
        
      ]
    },
    {
      label:'international',
      icon:'fs-5 uil uil-globe mx-2',
      link:'',
      sub : [
        
      ]
    },
    {
      label:'online store',
      icon:'fs-5 uil uil-store mx-2',
      link:'',
      sub : [
        
      ]
    },
    {
      label:'pages',
      icon:'fs-5 uil uil-layers mx-2',
      link:'',
      sub : [
        
      ]
    }
  ] 


  toggleMenu(i:number){
   const menu =  this.menus.find((element,index)=>{
   return i==index;  
    })
      menu.isopen =  !menu.isopen;
  }

  logOut(){
   this.authService.logout();
  }

}
