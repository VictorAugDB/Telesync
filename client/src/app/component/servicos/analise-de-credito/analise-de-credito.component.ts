import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analise-de-credito',
  templateUrl: './analise-de-credito.component.html',
  styleUrls: ['./analise-de-credito.component.css']
})
export class AnaliseDeCreditoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  alertarSucesso(){
    alert("Aprovado!!!");
    this.cancel();
  }

  cancel() {
    this.router.navigate(['/'])
  }
}
