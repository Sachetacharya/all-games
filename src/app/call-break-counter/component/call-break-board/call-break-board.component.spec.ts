import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBreakBoardComponent } from './call-break-board.component';

describe('CallBreakBoardComponent', () => {
  let component: CallBreakBoardComponent;
  let fixture: ComponentFixture<CallBreakBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallBreakBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallBreakBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
