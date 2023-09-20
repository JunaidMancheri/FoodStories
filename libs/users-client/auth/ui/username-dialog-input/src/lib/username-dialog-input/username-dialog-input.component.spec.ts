import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsernameDialogInputComponent } from './username-dialog-input.component';

describe('UsernameDialogInputComponent', () => {
  let component: UsernameDialogInputComponent;
  let fixture: ComponentFixture<UsernameDialogInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernameDialogInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsernameDialogInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
