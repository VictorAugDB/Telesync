import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharPedidoEspecificoComponent } from './acompanhar-pedido-especifico.component';

describe('AcompanharPedidoEspecificoComponent', () => {
  let component: AcompanharPedidoEspecificoComponent;
  let fixture: ComponentFixture<AcompanharPedidoEspecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompanharPedidoEspecificoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompanharPedidoEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
