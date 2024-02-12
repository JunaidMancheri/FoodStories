import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostStepperComponent } from './create-post-stepper.component';

describe('CreatePostStepperComponent', () => {
  let component: CreatePostStepperComponent;
  let fixture: ComponentFixture<CreatePostStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
