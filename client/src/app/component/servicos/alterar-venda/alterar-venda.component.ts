import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alterar-venda',
  templateUrl: './alterar-venda.component.html',
  styleUrls: ['./alterar-venda.component.css']
})
export class AlterarVendaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToBackPage(){
    window.history.back()
  }

  goToHome(){
    this.router.navigate([''])
  }
}
