import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBreakTableComponent } from './call-break-table.component';

describe('CallBreakTableComponent', () => {
  let component: CallBreakTableComponent;
  let fixture: ComponentFixture<CallBreakTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallBreakTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallBreakTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
