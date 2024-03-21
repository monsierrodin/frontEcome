import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { Observable, catchError, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Desc, ImagePro, Produit } from '../model/produit.model';




@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http:HttpClient) { }
  public createCat(categorie:Categorie):Observable<Categorie>{
    return this.http.post<Categorie>(environment.backEndHost +'/createCategorie',categorie).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log("on a une erreur ",error)
        return throwError(error)
      })
    ) }
  public createProduit(produit:Produit):Observable<Produit>{
    return this.http.post<Produit>(environment.backEndHost + '/createProduit',produit).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error);
      })
    )
  }
  public getListProduit():Observable<Array<Produit>>{
    return this.http.get<Array<Produit>>(environment.backEndHost + "/listProduit").pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error);
      })
    )
  }
    //modification produit isModifierProduitStauts
   public modifcationProduct(id:string,data:Produit):Observable<Produit>{
    return this.http.put<Produit>(environment.backEndHost + '/isModifierProduit/' + id,data).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log(error);
        return throwError(error);
      })
    )
   }
   public modifcationProductStaus(id:string){
    return this.http.get(environment.backEndHost + '/isModifierProduitStauts/' + id).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log(error);
        return throwError(error);
      })
    )
   }
    public deleteProduct(id:string){
      return this.http.delete(environment.backEndHost + '/deleteProd/' + id).pipe(
        catchError((error:HttpErrorResponse)=>{
          return throwError(error);
        })
      )
    }
  ///Insertion d'image
  public UploadeFile(file:FormData,id:string):Observable<String>{
    return this.http.post<String>(environment.backEndHost+"/uploadeFile/"+id,file).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log("Erreur lors de Uploade voci erreur: ",error)
        return throwError(error);
      })
  )
  }
  ///Creation d'image de produit
  public createImage(imgProduit:ImagePro):Observable<ImagePro>{
    return this.http.post<ImagePro>(environment.backEndHost + '/createImage',imgProduit).pipe(
      catchError((err:HttpErrorResponse)=>{
        return throwError(err)
      })
    )
   }
  public getListImage():Observable<Array<ImagePro>>{
    return this.http.get<Array<ImagePro>>(environment.backEndHost + '/getImageProduct').pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error);
      })
    )
  }
  //Delete Image
  public deleteImage(id:string){
    return this.http.delete(environment.backEndHost + '/deleteImage/'+ id).pipe(
      catchError((err:HttpErrorResponse)=>{
        return throwError(err);
       })
    )
  }
  ///description
  public createDesc(desc:Desc):Observable<Desc>{
    return this.http.post<Desc>(environment.backEndHost + '/createDescription',desc).pipe(
      catchError((err:HttpErrorResponse)=>{
        return throwError(err)
      })
    )
   }
  public getListDesc():Observable<Array<Desc>>{
    return this.http.get<Array<Desc>>(environment.backEndHost + '/listDescription').pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error);
      })
    )
  }
  public deleteDesc(id:string){
    return this.http.delete(environment.backEndHost + '/deleteDescritpion/'+ id).pipe(
      catchError((err:HttpErrorResponse)=>{
        return throwError(err);
       })
    )
  }
  public modifcationDesc(id:string,data:Desc):Observable<Desc>{
    return this.http.put<Desc>(environment.backEndHost + '/isModifierDescription/' + id,data).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log(error);
        return throwError(error);
      })
    )
   }
}
