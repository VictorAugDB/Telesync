import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseDeCreditoComponent } from './analise-de-credito.component';

describe('AnaliseDeCreditoComponent', () => {
  let component: AnaliseDeCreditoComponent;
  let fixture: ComponentFixture<AnaliseDeCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliseDeCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseDeCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
