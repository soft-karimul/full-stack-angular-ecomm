import { AfterViewInit, ChangeDetectorRef, Component, Inject, NgZone, PLATFORM_ID, signal } from '@angular/core';
import { interval } from 'rxjs';
import { NgIf, isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [NgIf],
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.scss'
})
export class HeroSliderComponent {


  constructor(@Inject(PLATFORM_ID) platformId: object){
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  public isBrowser = signal(false);
  public sliders :any[] = [
    {
      id:0,
      img:"../../../../assets/images/actual_slider_one.jpg",
      title:'first title',
      des:'first des'
    },
    {
      id:1,
      img:"../../../../assets/images/slider_two.avif",
      title:'second title',
      des:'second title'
    },
    {
      id:2,
      img:"../../../../assets/images/slider_three.avif",
      title:'second title',
      des:'second title'
    },
    {
      id:3,
      img:"../../../../assets/images/slider_four.avif",
      title:'second title',
      des:'second title'
    }
  ]
  public index:number = 0;
  public current:any = this.sliders[this.index];
  public clearInterval: any;
  

   
 ngAfterViewInit() {
  if(this.isBrowser()){
    setInterval(()=>{
      this.sliderNext();
    },5000)
  }
 }


  sliderNext() {
    
    if(this.index < this.sliders.length-1){
      // this.current = this.sliders[this.index];
      this.index++;
    }else {
      this.index = 0;
      // this.current = this.sliders[this.index];
    }
 
  }


  sliderPrev() {
  
    if(this.index > 0){
      this.index--;
      // this.current = this.sliders[this.index];
    }else {
      this.index = this.sliders.length-1;
      // this.current = this.sliders[this.index];
  }
}


ngOnDestroy(){
  clearInterval(this.clearInterval);
}







}
