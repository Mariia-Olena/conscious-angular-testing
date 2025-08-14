import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BUTTON_CLASSES, ButtonComponent } from './button.component';
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

  describe('Appearance state', () => {
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
  });

  describe('Loading state', () => {
    it('should show loader icon in "loading" state', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      let loader = debugElement.query(By.css('[data-testingId="loader"]'));
      expect(loader).not.toBeNull();

      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();
      loader = debugElement.query(By.css('[data-testingId="loader"]'));
      expect(loader).toBeNull();
    });
  });

  describe('Disabled state', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
    });

    it('should apply necessary attributes to component host', () => {
      expect(element.classList).toContain('disabled');
      expect(element.getAttribute('disabled')).not.toBeNull();
      expect(element.getAttribute('tabindex')).toBe('-1');
    });

    it('should prevent default behavior', () => {
      const clickEvent = new PointerEvent('click', { cancelable: true });
      debugElement.triggerEventHandler('click', clickEvent);
      expect(clickEvent.defaultPrevented).toBe(true);
    });
  });
});

describe('ButtonComponent (with TestHost)', () => {
  @Component({
    template: `<button [loading]="loading" dfButton></button>`,
  })
  class ButtonTestHost {
    loading = false;
  }

  let fixture: ComponentFixture<ButtonTestHost>;
  let buttonDebugElement: DebugElement;
  let buttonElement: HTMLElement;
  let hostComponent: ButtonTestHost;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
      declarations: [ButtonTestHost],
    });
    fixture = TestBed.createComponent(ButtonTestHost);
    buttonDebugElement = fixture.debugElement.query(By.directive(ButtonComponent));
    buttonElement = buttonDebugElement.nativeElement;
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have "solid" appearance by default', () => {
    expect(buttonElement.classList).toContain(BUTTON_CLASSES.solid);
  });

  it('should show loader icon in "loading" state', () => {
    hostComponent.loading = true;
    fixture.detectChanges();
    let loader = buttonDebugElement.query(By.css('[data-testingId="loader"]'));
    expect(loader).not.toBeNull();

    hostComponent.loading = false;
    fixture.detectChanges();
    loader = buttonDebugElement.query(By.css('[data-testingId="loader"]'));
    expect(loader).toBeNull();
  });
});
