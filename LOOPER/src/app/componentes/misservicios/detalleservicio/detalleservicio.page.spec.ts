import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleservicioPage } from './detalleservicio.page';

describe('DetalleservicioPage', () => {
  let component: DetalleservicioPage;
  let fixture: ComponentFixture<DetalleservicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleservicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleservicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
