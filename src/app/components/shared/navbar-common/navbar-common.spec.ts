import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCommon } from './navbar-common';

describe('NavbarCommon', () => {
  let component: NavbarCommon;
  let fixture: ComponentFixture<NavbarCommon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCommon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCommon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
