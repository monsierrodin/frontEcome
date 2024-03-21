import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { TestComponent } from './test/test.component';
import { AppClientComponent } from './client/app-client/app-client.component';
import { DasboardClientComponent } from './client/dasboard-client/dasboard-client.component';
import { ConnexionClientComponent } from './client/connexion-client/connexion-client.component';
import { TravailComponent } from './client/app-client/travail/travail.component';
import { FormationComponent } from './client/app-client/formation/formation.component';
import { VenteComponent } from './client/app-client/vente/vente.component';
import { ProduitComponent } from './client/produit/produit.component';
import { CategorieComponent } from './admin/categorie/categorie.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminProduitComponent } from './admin/admin-produit/admin-produit.component';
import { LoginComponent } from './admin/login/login.component';
import { RayonComponent } from './admin/rayon/rayon.component';
import { AproposComponent } from './client/apropos/apropos.component';
import { ContactComponent } from './client/contact/contact.component';
import { FavorisComponent } from './client/favoris/favoris.component';
import { FooterComponent } from './client/footer/footer.component';
import { HomePageComponent } from './client/home-page/home-page.component';
import { MonClientComponent } from './client/mon-client/mon-client.component';
import { NavBarComponent } from './client/nav-bar/nav-bar.component';
import { ServicesComponent } from './client/services/services.component';
import { SideBarComponent } from './client/side-bar/side-bar.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscrireComponent } from './inscrire/inscrire.component';
import { OublieComponent } from './oublie/oublie.component';



@NgModule({
  declarations: [
    AppComponent,
    AppClientComponent,
    TestComponent,
    DasboardClientComponent,
    ConnexionClientComponent,
    TravailComponent,
    FormationComponent,
    VenteComponent,
    ProduitComponent,
    CategorieComponent,
    DashboardComponent,
    AdminProduitComponent,
    LoginComponent,
    RayonComponent,
    AproposComponent,
    ContactComponent,
    FavorisComponent,
    FooterComponent,
    HomePageComponent,
    MonClientComponent,
    NavBarComponent,
    ServicesComponent,
    SideBarComponent,
    ConnexionComponent,
    InscrireComponent,
    OublieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SlickCarouselModule,
    ToastrModule.forRoot(),
    CarouselModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
