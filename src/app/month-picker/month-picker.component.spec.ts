import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPickerComponent } from './month-picker.component';

describe('MonthPickerComponent', () => {
  let component: MonthPickerComponent;
  let fixture: ComponentFixture<MonthPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit -1 when getPreviousMonth is called', () => {
    spyOn(component.offsetChange, 'emit');
    component.getPreviousMonth();
    expect(component.offsetChange.emit).toHaveBeenCalledWith(-1);
  });

  it('should emit 1 when getNextMonth is called', () => {
    spyOn(component.offsetChange, 'emit');
    component.getNextMonth();
    expect(component.offsetChange.emit).toHaveBeenCalledWith(1);
  });
});
