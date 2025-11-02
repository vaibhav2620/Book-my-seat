import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-navbar-common',
  imports: [],
  templateUrl: './navbar-common.html',
  styleUrl: './navbar-common.css'
})


export class NavbarCommon {
  
  @Input() username: string='';
  
NavbarCommon() {
  
}

ngOnInit(): void {
console.log(this.username);
}

}
