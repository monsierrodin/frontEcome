import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private listCat:any
  menu:boolean=true
  menuItems:number=11

  constructor(private service:CategorieService) { }

  ngOnInit(): void {
    this.getListCategorie();

  }
  getListCategorie(){
    this.service.listCategorie().subscribe({
      next:(data)=>{
        // this.listCat=data.filter((d)=>{
        //   return d.sta=='page Spider';
        // })
        this.listCat=data;
    
      },error:(err)=>{
        console.log(err)
      }
    });

  }
  algorithmeMenu(menuItem:number){
    this.menuItems=menuItem;
  }

}
