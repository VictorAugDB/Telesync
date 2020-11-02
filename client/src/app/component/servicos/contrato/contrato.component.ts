import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  alertarFinalizar(){
    alert("Você aceitou os termos e será redirecionado para a homepage")
    this.cancel();
  }

  alertarCancelar(){
    alert("Você não concordou com os termos e será redirecionado para a homepage")
    this.cancel();
  }

  cancel() {
    this.router.navigate(['/'])
  }
}
