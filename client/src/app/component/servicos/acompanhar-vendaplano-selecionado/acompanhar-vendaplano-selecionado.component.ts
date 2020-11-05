import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-acompanhar-vendaplano-selecionado',
  templateUrl: './acompanhar-vendaplano-selecionado.component.html',
  styleUrls: ['./acompanhar-vendaplano-selecionado.component.css']
})

export class AcompanharVendaplanoSelecionadoComponent implements OnInit {

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  id: number; 

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.id = id;
  }

  navigateToVenda(){
    this.router.navigate([`/acompanhamento-de-pedido/venda/${this.id}`])
  }
}
