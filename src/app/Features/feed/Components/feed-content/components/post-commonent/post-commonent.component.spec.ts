import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommonentComponent } from './post-commonent.component';

describe('PostCommonentComponent', () => {
  let component: PostCommonentComponent;
  let fixture: ComponentFixture<PostCommonentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCommonentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommonentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
