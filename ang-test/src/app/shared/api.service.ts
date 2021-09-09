import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserModel } from '../app.component.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  readonly APIUrl = "http://localhost:5000/api"

  constructor(private http: HttpClient) { }

  postUser(data: any) {
    return this.http.post(this.APIUrl+'/user', data)
  }

  postComment(data: any) {
    return this.http.post<any>(this.APIUrl+'/feedback', data)
  }

  getUserList() {
    return this.http.get<UserModel[]>(this.APIUrl+'/user')
  }

  getTopicList() {
    return this.http.get<any>(this.APIUrl+'/topic')
  }

  getFeedbackList() {
    return this.http.get<any>(this.APIUrl+'/feedback')
  }
}
