import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {

  constructor(private http:HttpClient) { }

  // Load all categories
  public categories()
  {
    return this.http.get(`${baseUrl}/category/`);
  }
  // adding categogry
  public addCategory(category:any)
  {
    return this.http.post(`${baseUrl}/category/`, category);
  }
  // getSingleCategory
  public getSingleCategory(categoryId:any)
  {
    return this.http.get(`${baseUrl}/category/${categoryId}`,categoryId)
  }
  // updating category
  public updateCategory(category:any)
  {
     return this.http.put(`${baseUrl}/category/`,category)
  }
  // deleting category sservice
  public deleteCategory(categoryId:any)
  {
    return this.http.delete(`${baseUrl}/category/${categoryId}`);
  }
}
