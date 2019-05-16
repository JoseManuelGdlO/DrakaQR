import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatadminComponent } from './chatadmin.component';

describe('ChatadminComponent', () => {
  let component: ChatadminComponent;
  let fixture: ComponentFixture<ChatadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatadminComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
