import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  infoAlert = {
    text: '',
    active: false
  };

  warningAlert = {
    text: '',
    active: false
  };

  dangerAlert = {
    text: '',
    active: false
  };

  constructor() { }
}
