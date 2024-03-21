import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cat, Ray } from 'src/app/model/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-rayon',
  templateUrl: './rayon.component.html',
  styleUrls: ['./rayon.component.scss']
})
export class RayonComponent implements OnInit {
  rayonEntree:Ray=new Ray()
  ismodal:boolean=false
  modalSup:boolean=false
  modalMod:boolean=false
  inputValue!:string
  textModif:string=""
  idRay:string="dedede"

  listRay:any
  formCreation!:FormGroup
  formModification!:FormGroup

  constructor(private service:CategorieService,serviceProduct:ProduitService,private fb:FormBuilder,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getListRayon();
    this.formCreation=this.fb.group({
      rayon:this.fb.control("",[Validators.required]),
    })
    this.formModification=this.fb.group({
      rayon:this.fb.control("",[Validators.required]),
    })
  }
  getListRayon(){
    this.service.listRayon().subscribe({
      next:(data)=>{
        // this.listCat=data.filter((d)=>{
        //   return d.sta=='page Spider';
        // })
        this.listRay=data;
        console.log(data)
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
  creationRayon(){
    this.rayonEntree=this.formCreation.value
    if (this.formCreation.valid) {
      this.service.createRayon(this.rayonEntree).subscribe({
      next:(data)=>{
        this.toastr.success("Enregistrement effectué")
        this.getListRayon();
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
    this.service.modifcationRayon(this.idRay,titre).subscribe({
      next:(data)=>{
        this.toastr.success("Modification effectuée");
        this.getListRayon();
        this.modalMod=false
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  deleteRayon(){
    this.service.deleteRayon(this.idRay).subscribe(
      () =>{
        this.getListRayon();
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
    this.idRay=id
  }
  async getConf(text: string,id:string) {
    return new Promise((resolve, reject) => {
      this.idRay=id
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
