import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { NavigationComponent } from '../navigation/navigation.component';
import { HeroSliderComponent } from "../hero-slider/hero-slider.component";
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ProductsComponent } from '../products/products.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, NavigationComponent,  HeroSliderComponent,ProductCategoryComponent,ProductsComponent,FooterComponent]
})
export class HomeComponent {

}
