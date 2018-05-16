import { Component } from '@angular/core';
import { AuthService } from './nucleo/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotifyApp';
  constructor(public auth: AuthService) { }
}
