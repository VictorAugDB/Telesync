import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharVendaplanoSelecionadoComponent } from './acompanhar-vendaplano-selecionado.component';

describe('AcompanharVendaplanoSelecionadoComponent', () => {
  let component: AcompanharVendaplanoSelecionadoComponent;
  let fixture: ComponentFixture<AcompanharVendaplanoSelecionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompanharVendaplanoSelecionadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompanharVendaplanoSelecionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
