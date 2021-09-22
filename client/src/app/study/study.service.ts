import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  constructor(private http: HttpClient) {}

  fetchNextCard(unit: number): Observable<any> {
    return this.http.get(`http://localhost:4000/study/next/${unit}`);
  }
}
