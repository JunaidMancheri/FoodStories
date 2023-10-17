import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BioSectionComponent } from './bio-section.component';

describe('BioSectionComponent', () => {
  let component: BioSectionComponent;
  let fixture: ComponentFixture<BioSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BioSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
