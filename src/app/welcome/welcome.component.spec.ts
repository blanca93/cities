import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        WelcomeComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Eurovision Services');
  });
});
