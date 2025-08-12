import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;
  let component: ButtonComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have "solid" appearance by default', () => {
    // expect(debugElement.classes['solid-button']).toBe(true);
    // expect(element.classList.contains('solid-button')).toBe(true);
    expect(element.classList).toContain('solid-button');
  });

  it('should apply proper CSS classes when appearance is changed', () => {
    component.appearance = 'stroked';
    fixture.detectChanges();
    expect(element.classList).toContain('stroked-button');

    component.appearance = 'solid';
    fixture.detectChanges();
    expect(element.classList).toContain('solid-button');
  });

  it('should show loader icon in "loading" state', () => {
    component.loading = true;
    fixture.detectChanges();
    let loader = debugElement.query(By.css('[data-testingId="loader"]'));
    expect(loader).not.toBeNull();

    component.loading = false;
    fixture.detectChanges();
    loader = debugElement.query(By.css('[data-testingId="loader"]'));
    expect(loader).toBeNull();
  });
});
