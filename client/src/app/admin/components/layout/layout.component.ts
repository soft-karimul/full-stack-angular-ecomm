import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavControllService } from '../../services/nav-controll.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [SidenavComponent, RouterOutlet, HeaderComponent],
})
export class LayoutComponent {
  constructor(private navCtrl: NavControllService, @Inject(PLATFORM_ID) private platformId: Object) {


    
  }
  public navControllerDesk: boolean = false;
  public wWidth: number = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(event.target.innerWidth < 800){
      this.navCtrl.adminNavControll.next(true);
    }else{
      this.navCtrl.adminNavControll.next(false);
    }
  }



  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

        this.wWidth = window.innerWidth;
        // Code that depends on window can safely run here
      }


  
  }

  ngAfterViewInit() {
    this.navCtrl.adminNavControll.subscribe({
      next: (data) => {
        this.navControllerDesk = data;
      },
    });
  }
}
