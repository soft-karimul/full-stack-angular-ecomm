import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavControllService {

  constructor() { }

public adminNavControll = new Subject<boolean>();

}
