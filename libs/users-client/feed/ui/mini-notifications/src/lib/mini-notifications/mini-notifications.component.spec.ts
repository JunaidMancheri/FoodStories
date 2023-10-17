import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniNotificationsComponent } from './mini-notifications.component';

describe('MiniNotificationsComponent', () => {
  let component: MiniNotificationsComponent;
  let fixture: ComponentFixture<MiniNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniNotificationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
