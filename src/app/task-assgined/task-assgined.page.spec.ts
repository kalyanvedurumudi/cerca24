import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskAssginedPage } from './task-assgined.page';

describe('TaskAssginedPage', () => {
  let component: TaskAssginedPage;
  let fixture: ComponentFixture<TaskAssginedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAssginedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskAssginedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
