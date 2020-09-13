import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderPickedupPage } from './order-pickedup.page';

describe('OrderPickedupPage', () => {
  let component: OrderPickedupPage;
  let fixture: ComponentFixture<OrderPickedupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPickedupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPickedupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
