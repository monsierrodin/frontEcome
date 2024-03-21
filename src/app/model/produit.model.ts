export class Produit{
  nom?:string;
  categorie?:string;
  prix?:string;
  fauxPrix?:string;
  arrivage?:string;
  status?:string;
  date?:Date;
}
export class ImagePro{
  id?:number
  idproduct?:string;
  extension?:string;
}
export class Desc{
  id?:string
  produit?:string;
  contenu?:string;
}

