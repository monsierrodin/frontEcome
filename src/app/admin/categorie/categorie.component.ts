import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cat, Categorie } from 'src/app/model/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  categorieEntree:Cat=new Cat()
  ismodal:boolean=false
  modalSup:boolean=false
  modalMod:boolean=false
  inputValue!:string
  textModif:string=""
  idCat:string="dedede"

  listRayon!:any

  listCat:any
  formCreation!:FormGroup
  formModification!:FormGroup
  constructor(private service:CategorieService,serviceProduct:ProduitService,private fb:FormBuilder,private toastr:ToastrService) { }
  ngOnInit(): void {
    this.getListRayon();
    this.getListCategorie();
    this.formCreation=this.fb.group({
      titre:this.fb.control("",[Validators.required]),
      rayon:this.fb.control("",[Validators.required]),
      status:this.fb.control("")
    })
    this.formModification=this.fb.group({
      titre:this.fb.control("",[Validators.required]),
    })
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
  showModal(){
    this.ismodal=true
  }
  showModalModifacation(){
    this.modalMod=true
  }
  creationCategorie(){
    this.categorieEntree=this.formCreation.value
    if (this.formCreation.valid) {this.service.createCategorie(this.categorieEntree).subscribe({
      next:(data)=>{
        this.toastr.success("Enregistrement effectué")
        this.getListCategorie();
        this.formCreation.reset("");
      },error:(err)=>{
        console.log(err)
      }
    })
    }else{
      this.toastr.error("On doit remplir ")
    }
  }
  handleModification(titre:string){
    this.service.modifcation(this.idCat,titre).subscribe({
      next:(data)=>{
        this.toastr.success("Modification effectuée");
        this.getListCategorie();
        this.modalMod=false
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  deleteCate(){
    this.service.delete(this.idCat).subscribe(
      () =>{
        this.getListCategorie();
        this.modalSup=false
        this.toastr.success("Le categorie ''"   + this.textModif + "'' est bien supprimé ")
      },error =>{
        this.toastr.error('Une erreur s'+'est produite')
      }
    )
  }
  fermerModal(){
    this.ismodal=false
  }
  getListRayon(){
    this.service.listRayon().subscribe({
      next:(data)=>{
        // this.listCat=data.filter((d)=>{
        //   return d.sta=='page Spider';
        // })
        this.listRayon=data;
        console.log(data)
      },error:(err)=>{
        console.log(err)
      }
    });
  }


  async getValidation(text: string) {
    return new Promise((resolve, reject) => {
      this.inputValue=text
      this.textModif=text
      resolve(null);
    });
  }
  async handleValidation(text: any,id:string) {
    await this.getValidation(text);
    this.modalMod=true;
    this.idCat=id
  }
  async getConf(text: string,id:string) {
    return new Promise((resolve, reject) => {
      this.idCat=id
      this.textModif=text
      resolve(null);
    });
  }
  async handleConfirmation(text: string,id:string) {
    await this.getConf(text,id);
    this.modalSup=true;
  }
  handleModifierStatut(id:string){

  }
}
