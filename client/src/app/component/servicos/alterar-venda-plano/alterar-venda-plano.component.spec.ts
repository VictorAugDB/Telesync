import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarVendaPlanoComponent } from './alterar-venda-plano.component';

describe('AlterarVendaPlanoComponent', () => {
  let component: AlterarVendaPlanoComponent;
  let fixture: ComponentFixture<AlterarVendaPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarVendaPlanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarVendaPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
