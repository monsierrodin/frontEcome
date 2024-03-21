import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Cat, Categorie, Ray } from '../model/categorie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http:HttpClient) { }

  ///Rayon
  public createRayon(rayon:Ray):Observable<Ray>{
    return this.http.post<Ray>(environment.backEndHost +'/createRayon',rayon).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log("on a une erreur ",error)
        return throwError(error)
      })
    ) }

    public listRayon():Observable<Array<Ray>>{
      return this.http.get<Array<Ray>>(environment.backEndHost+"/listRayon").pipe(
        catchError((error:HttpErrorResponse)=>{
          console.log("Erreur de la recuperation de liste Categorie ",error)
          return throwError(error);
        })
      )
    }
    public deleteRayon(id:string): Observable<String>{
      return this.http.delete<String>(environment.backEndHost + '/deleteRayon/' + id);
     }
  public createCategorie(categorie:Cat):Observable<Cat>{
    return this.http.post<Cat>(environment.backEndHost +'/createCategorie',categorie).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log("on a une erreur ",error)
        return throwError(error)
      })
    ) }
    public modifcationRayon(id:string,rayon:string):Observable<Ray>{
      let data={rayon:rayon}
      return this.http.put<Ray>(environment.backEndHost + '/isModRayon/' + id,data).pipe(
        catchError((error:HttpErrorResponse)=>{
          console.log(error);
          return throwError(error);
        })
      )
     }

    public listCategorie():Observable<Array<Categorie>>{
      return this.http.get<Array<Categorie>>(environment.backEndHost+"/listCategorie").pipe(
        catchError((error:HttpErrorResponse)=>{
          console.log("Erreur de la recuperation de liste Categorie ",error)
          return throwError(error);
        })
      )
    }

    public modifcation(id:string,titre:string):Observable<Categorie>{
      let data={titre:titre}
      return this.http.put<Categorie>(environment.backEndHost + '/isModifier/' + id,data).pipe(
        catchError((error:HttpErrorResponse)=>{
          console.log(error);
          return throwError(error);
        })
      )
     }
     public delete(id:string): Observable<String>{
      return this.http.delete<String>(environment.backEndHost + '/deleteCat/' + id);
     }
}
