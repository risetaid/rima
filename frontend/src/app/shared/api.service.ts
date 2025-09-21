import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Patients
  getPatients() {
    return this.http.get(`${this.apiUrl}/patients`);
  }

  getPatient(id: string) {
    return this.http.get(`${this.apiUrl}/patients/${id}`);
  }

  createPatient(data: any) {
    return this.http.post(`${this.apiUrl}/patients`, data);
  }

  updatePatient(id: string, data: any) {
    return this.http.patch(`${this.apiUrl}/patients/${id}`, data);
  }

  deletePatient(id: string) {
    return this.http.delete(`${this.apiUrl}/patients/${id}`);
  }

  addHealthNote(id: string, note: any) {
    return this.http.post(`${this.apiUrl}/patients/${id}/health-notes`, note);
  }

  bulkDeleteNotes(id: string, noteIds: string[]) {
    return this.http.delete(`${this.apiUrl}/patients/${id}/health-notes`, { body: { noteIds } });
  }

  // Reminders
  getReminders() {
    return this.http.get(`${this.apiUrl}/reminders`);
  }

  createReminder(data: any) {
    return this.http.post(`${this.apiUrl}/reminders`, data);
  }

  // Content
  getArticles() {
    return this.http.get(`${this.apiUrl}/content/articles`);
  }

  createArticle(data: any) {
    return this.http.post(`${this.apiUrl}/content/articles`, data);
  }

  getVideos() {
    return this.http.get(`${this.apiUrl}/content/videos`);
  }

  createVideo(data: any) {
    return this.http.post(`${this.apiUrl}/content/videos`, data);
  }

  // Auth
  getMe() {
    return this.http.get(`${this.apiUrl}/auth/me`);
  }
}