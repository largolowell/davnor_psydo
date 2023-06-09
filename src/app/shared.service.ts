import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "https://localhost:44349/api";

  constructor(private http: HttpClient) { }

  //client
  GetClient():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/clients'); 
  }
  AddClient(add:any={}){
    return this.http.post<any[]>(this.APIUrl+'/clients',add); 
  }
  EditClient(val:any={}){
    return this.http.put(this.APIUrl+'/clients',val, {responseType: 'text'})
  }

  //resfacilities
  GetListResFacilities():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/resFacilities'); 
  }
  AddResFacilities(add:any={}){
    return this.http.post<any[]>(this.APIUrl+'/resFacilities',add); 
  }
  EditResFacilities(val:any={}){
    return this.http.put(this.APIUrl+'/resFacilities',val, {responseType: 'text'})
  }
  DeleteResFacilities(id:string){
    return this.http.delete(this.APIUrl+`/resFacilities/${id}`, {responseType: 'text'})
  }
  ViewListResFacilities():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/reservations');
  }

  //facilities 
  GetListFacilities():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/facilities');
  }
  AddFacilities(add:any={}){
    return this.http.post<any[]>(this.APIUrl+'/facilities',add);
  }
  GetListPrices():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/prices');
  }

  //facilitycategories
  GetListFacilityCategories():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/facilityCategories');
  }

  //davnorgym
  GetListDavNorGym():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/davnorgyms');
  }
  AddDavNorGym(add:any={}){
    return this.http.post<any[]>(this.APIUrl+'/davnorgyms',add);
  }
  GetListOther():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/others');
  }
  AddOthers(add:any={}){
    return this.http.post<any[]>(this.APIUrl+'/others',add);
  }

  //resdavnorgym
  GetListResDavNorGym():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/resDavNorGyms');
  }

  AddResDavNorGym(add:any={}){
    return this.http.post<any[]>(this.APIUrl+'/resDavNorGyms',add);
  }

  //login
  onLogin(login:any ={}): Observable<any>{
    return this.http.post<any[]>(this.APIUrl+'/userLogins',login);
  }

  public isLoggedIn(){
    // console.log(localStorage.getItem('token'));
    return localStorage.getItem('token') !==null;
  }

  GetListUser():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/userLogins');
  }

}
