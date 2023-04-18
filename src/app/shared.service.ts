import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "https://localhost:44349/api";

  constructor(private http: HttpClient) { }

  //resfacilities
  GetListResFacilities():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/resFacilities');
  }
  AddResFacilities(add:any={}){
    return this.http.post<any[]>(this.APIUrl+'/resFacilities',add);
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


}
