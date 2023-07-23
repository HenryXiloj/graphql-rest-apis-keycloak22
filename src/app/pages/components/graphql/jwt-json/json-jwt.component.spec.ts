import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonJwtComponent } from './json-jwt.component';

describe('JsonJwtComponent', () => {
  let component: JsonJwtComponent;
  let fixture: ComponentFixture<JsonJwtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonJwtComponent]
    });
    fixture = TestBed.createComponent(JsonJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
