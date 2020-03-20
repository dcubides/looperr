import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisserviciosPage } from './misservicios.page';

describe('MisserviciosPage', () => {
  let component: MisserviciosPage;
  let fixture: ComponentFixture<MisserviciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisserviciosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisserviciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
