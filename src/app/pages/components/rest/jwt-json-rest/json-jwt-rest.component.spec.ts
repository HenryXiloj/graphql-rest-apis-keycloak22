import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonJwtRestComponent } from './json-jwt-rest.component';

describe('JsonJwtRestComponent', () => {
  let component: JsonJwtRestComponent;
  let fixture: ComponentFixture<JsonJwtRestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonJwtRestComponent]
    });
    fixture = TestBed.createComponent(JsonJwtRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
