import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDadosCadastraisComponent } from './alterar-dados-cadastrais.component';

describe('AlterarDadosCadastraisComponent', () => {
  let component: AlterarDadosCadastraisComponent;
  let fixture: ComponentFixture<AlterarDadosCadastraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarDadosCadastraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarDadosCadastraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
