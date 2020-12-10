import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanhamentoDePedidoComponent } from './acompanhamento-de-pedido.component';

describe('AcompanhamentoDePedidoComponent', () => {
  let component: AcompanhamentoDePedidoComponent;
  let fixture: ComponentFixture<AcompanhamentoDePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompanhamentoDePedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompanhamentoDePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
