import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cat } from 'src/app/model/categorie.model';
import { Desc, ImagePro, Produit } from 'src/app/model/produit.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-admin-produit',
  templateUrl: './admin-produit.component.html',
  styleUrls: ['./admin-produit.component.scss']
})
export class AdminProduitComponent implements OnInit {

  dataProd:Produit=new Produit()
  formImage!:FormGroup
  ismodal:boolean=false
  ismodalImage:boolean=false
  isModalSupp:boolean=false
  selectedFile: File | undefined;
  idProd:string=""
  nomFichier!:any
  fileNameImage:string=""
  formModification!:FormGroup
  nomcategorie!:string
  formCreation!:FormGroup
  ismodalMod:boolean=false
  listCategories:any
  catSelected:string=""
  listProduct:any
  ismodalDetalis:boolean=false
  detailsNom=""
  detailsDesc=""
  detailsCat=""
  detailsStat=""
  detailsPrix!:number
  detailsImage=""
  detailsDate=""
  detailsFauxPrix=""
  detailsArrivage=""
  ///inputValue Input
  InputNom!:string
  InputDesc!:string
  InputCat!:string
  InputCatNom!:string
  InputPrix!:number
  InputImage!:string
  InputFauxPrix!:string
  InputArrivage!:string
  listImageProduct:any

  idProdImage!:string
  extenstionFile:string=""

  ///getDescriptionProduct
  ismodalDescription:boolean=false
  listDescription:any///List
  idProduitDesc:string=""
  inputContenu:string=""
  idDesc:string=""
  formDesc!:FormGroup
  ismodalModDesc:boolean=false
  button:number=1
  ///Arrivage
  textArrivage:string=""

  constructor(private serviCat:CategorieService,private fb:FormBuilder,private http:HttpClient,private service:ProduitService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.formCreation=this.fb.group({
      nom:this.fb.control("",Validators.required),
      categorie:this.fb.control(""),
      prix:this.fb.control("",[Validators.required]),
      stock:this.fb.control("",[Validators.required]),
      fauxPrix:this.fb.control("",[Validators.required]),
      status:this.fb.control(""),
      date:this.fb.control("")
    })
    this.formModification=this.fb.group({
      nom:this.fb.control("",Validators.required),
      prix:this.fb.control("",[Validators.required]),
      fauxPrix:this.fb.control("",[Validators.required]),
      status:this.fb.control(""),
    })
    this.formImage=this.fb.group({
      image:this.fb.control("",[Validators.required]),

    })
    this.formDesc=this.fb.group({
      contenu:this.fb.control("",[Validators.required]),

    })
    this.getListCategorie();
    this.getListProduct();
  }

  handleCreateProduct(){
    let categorieEntree=this.formCreation.value
    categorieEntree.date=new Date();
    categorieEntree.arrivage=this.textArrivage
    categorieEntree.categorie=this.catSelected
    if(this.formCreation.valid){
        this.service.createProduit(categorieEntree).subscribe({
          next:(data)=>{
            this.toastr.success("Insertion effectuée")
            this.formCreation.reset("")
            this.getListProduct();
            this.ismodal=false;
          },error:(err)=>{
            this.toastr.error("Une erreur s'est produite")
          }
        })
    }else{
      this.toastr.warning("Vérifier toutes les informations")
    }
}
  onFileSelected(event:any){
    const fileName:string=event.target.files[0].name;
    this.fileNameImage=fileName;
  }
  selectEvent(event:any){
    const selected:string=event.target.value;
    this.catSelected=selected;
  }
  selectEventArrivage(event:any){
    const selected:string=event.target.value;
    this.textArrivage=selected;
  }
  getListCategorie(){
    this.serviCat.listCategorie().subscribe({
      next:data=>{
        this.listCategories=data;
      }
    })
  }
  getListProduct(){
    this.service.getListProduit().subscribe({
      next:data=>{
        this.listProduct=data;
        console.log(this.listProduct)
      }
    })
  }
  handleModifierProduit(){
    this.dataProd=this.formModification.value
    this.dataProd.arrivage=this.textArrivage
    this.dataProd.categorie=this.catSelected
    if(this.formModification.valid){
      if(this.textArrivage=""){
        this.toastr.warning("Selectionner l'arrivage")
      }else{
        this.service.modifcationProduct(this.idProd,this.dataProd).subscribe(
          ()=>{
            this.toastr.success('Modification  succèe')
            this.getListProduct();
            this.ismodalMod=false
          },error=>{
            this.toastr.error("Une erreur s'est produite")
          }
        )
      }

   }else{
    this.toastr.warning("Verifier toutes informations")
  }
  }
  handleModifierStatut(id:string){
      this.service.modifcationProductStaus(id).subscribe(
        ()=>{
          this.getListProduct();
        },error=>{
          this.toastr.error("Une erreur s'est produite")
        }
      )
  }
  ModalSup(id:string,nom:string){
    this.idProd=id;
    this.isModalSupp=true
    this.detailsNom=nom;
  }
  functioDeleteProduct(){
    this.service.deleteProduct(this.idProd).subscribe(
      ()=>{
        this.toastr.success("Suppression effectuée")
        this.isModalSupp=false
        this.getListProduct();
      },error=>{
        this.toastr.error("Vérifier votre connexion au serveur")
      }
    )
  }
  detailShow(nom:string,cat:string,arrivage:string,stat:string,prix:number,fauxPrix:string,date:string){
  this.detailsNom=nom
  this.detailsArrivage=arrivage
  this.detailsCat=cat
  this.detailsStat=stat
  this.detailsPrix=prix
  this.detailsFauxPrix=fauxPrix
  this.ismodalDetalis=true
  this.detailsDate=date
  }
  stepUpdateOne(id:string,nom:string,cat:string,catId:string,catNom:string,arrivage:string,prix:number,fauxPrix:string){
      this.InputNom=nom
      this.textArrivage=arrivage
      this.InputCat=catId
      this.InputCatNom=catNom
      this.InputPrix=prix
      this.InputFauxPrix=fauxPrix


    this.idProd=id;
    this.detailsNom=nom
    this.detailsCat=cat
    this.detailsPrix=prix
    this.detailsFauxPrix=fauxPrix
    ////Step Input value Input
    }
  stepUpdateTwo(id:string,nom:string,cat:string,catId:string,catNom:string,desc:string,prix:number,image:string) {
    this.stepUpdateOne(id,nom,cat,catId,catNom,desc,prix,image);
      this.ismodalMod=true
  }
  ////Uploage Image
  selectFile(event: any) {
    this.selectedFile = event.target.files[0];
    this.nomFichier=this.selectedFile?.name!.split('.').pop()?.toLowerCase();
    this.extenstionFile=this.nomFichier
    console.log(this.extenstionFile)
  }

  enregisterImage(){
   const formData = new FormData();
   formData.append('file', this.selectedFile!);
   let img=new ImagePro();
   img.idproduct=this.idProdImage
   img.extension=this.extenstionFile
   if(this.extenstionFile==""){
    this.toastr.warning("Il faut choisir votre Image")
   }else{
    this.service.createImage(img).subscribe({
      next:(data)=>{
        console.log(data);
        let idPro:any=data.id
        this.service.UploadeFile(formData,idPro).subscribe({
          next:(data)=>{
            this.formImage.reset("");
            this.extenstionFile=""
            this.toastr.success("Succès")
            this.getListImage(this.idProdImage)
          },error:(err)=>{
            console.log(err)
          }
        })
      },error:(err)=>{
        console.log(err)
      }
    })

   }


   }
   ////GetList tout Image
   getListImage(id:string){
    this.idProdImage=id
    this.ismodalImage=true
    this.service.getListImage().subscribe(
      data => {
        //taches: any
        this.listImageProduct = data.filter((d)=>{
          return d.idproduct==id;
        });
        console.log(this.listImageProduct)
      },error =>{
        console.log(error);
      } )
  }
  ///DeleteImage
  deleteImage(id:string){
    this.service.deleteImage(id).subscribe(
      ()=>{
        this.getListImage(this.idProdImage);
      },error=>{
        this.toastr.error("une erreur s'est produite")
      }
    )
  }
  ////GetDescription
  handleAddDescription(){
    let formData:Desc=new Desc();
    formData.contenu=this.formDesc.value.contenu
    formData.produit=this.idProduitDesc
    this.service.createDesc(formData).subscribe(
      ()=>{
        this.toastr.success("succès");
        this.formDesc.reset("");
        this.getListDescritpion(this.idProduitDesc)
      },error=>{
        this.toastr.error("on a une erreur")
      }
    )
  }
  getListDescritpion(idProduit:string){
    this.idProduitDesc=idProduit
    this.ismodalDescription=true
    this.button=1
    this.service.getListDesc().subscribe(
      data => {
        //taches: any
        this.listDescription = data.filter((d)=>{
          return d.produit==idProduit;
        });
        console.log(this.listDescription)
      },error =>{
        console.log(error);
      } )
  }
  modificationDesc(){
    let id=this.idDesc
    let data:Desc=new Desc()
    data.contenu=this.formDesc.value.contenu
    this.service.modifcationDesc(id,data).subscribe(
      ()=>{
        this.toastr.success("Modification effectuée")
        this.button=1;
        this.getListDescritpion(this.idProduitDesc)
        this.formDesc.reset("")
      },error=>{
        this.toastr.error("Une erreur s'est produite")
      }
    )
  }
  OpenModalDesc(id:string,contenu:string){
    this.idDesc=id;
    this.inputContenu=contenu
    this.button=2
  }
  deleteDescription(id:string){
    this.service.deleteDesc(id).subscribe(
      ()=>{
        this.toastr.success("Description supprimée");
        this.getListDescritpion(this.idProduitDesc)
      },error=>{
        this.toastr.error("Une erreur s'est produite")
      }
    )

}
}
