import { TestBed, inject } from "@angular/core/testing";
import { AdminAuthGuard } from "./admin-auth-guard.service";

describe("AdminAuthGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGuard],
    });
  });

  it("should ...", inject([AdminAuthGuard], (service: AdminAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
