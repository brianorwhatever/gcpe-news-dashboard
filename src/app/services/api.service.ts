import { Injectable, Inject  } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL  =  '';

  constructor(private  httpClient:  HttpClient, @Inject('BASE_API_URL') baseApiUrl: string) {
    this.API_URL = baseApiUrl;
  }

  getPosts(){
    return  this.httpClient.get(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`);
  }

  getEntries(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`).pipe();
  }
  
}
