import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsGridItemComponent } from './posts-grid-item.component';

describe('PostsGridItemComponent', () => {
  let component: PostsGridItemComponent;
  let fixture: ComponentFixture<PostsGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsGridItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
