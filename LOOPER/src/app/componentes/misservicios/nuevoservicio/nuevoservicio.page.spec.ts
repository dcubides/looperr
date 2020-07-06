import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevoservicioPage } from './nuevoservicio.page';

describe('NuevoservicioPage', () => {
  let component: NuevoservicioPage;
  let fixture: ComponentFixture<NuevoservicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoservicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoservicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
