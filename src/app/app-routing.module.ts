import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { AppClientComponent } from './client/app-client/app-client.component';
import { DasboardClientComponent } from './client/dasboard-client/dasboard-client.component';
import { ConnexionClientComponent } from './client/connexion-client/connexion-client.component';
import { FormationComponent } from './client/app-client/formation/formation.component';
import { ProduitComponent } from './client/produit/produit.component';
import { CategorieComponent } from './admin/categorie/categorie.component';
import { AdminProduitComponent } from './admin/admin-produit/admin-produit.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { RayonComponent } from './admin/rayon/rayon.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'connexion', component: ConnexionClientComponent },
  /////////////////////////////
  { path:'admin',component:DashboardComponent,children:[
    {path:'categorie',component:CategorieComponent},
    {path:'produit',component:AdminProduitComponent},
    {path:'rayon',component:RayonComponent}
  ]},
  {path:'',component:AppClientComponent,children:[
    {path:'',component:ProduitComponent},
    { path: 'form', component: FormationComponent },

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
