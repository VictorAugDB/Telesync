import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarVendaComponent } from './alterar-venda.component';

describe('AlterarVendaComponent', () => {
  let component: AlterarVendaComponent;
  let fixture: ComponentFixture<AlterarVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
