import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRedirectComponent } from './save-redirect.component';

describe('SaveRedirectComponent', () => {
  let component: SaveRedirectComponent;
  let fixture: ComponentFixture<SaveRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveRedirectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
