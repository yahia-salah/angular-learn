import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  signIn(credentials) {
    this.authService.login(credentials).subscribe((result) => {
      if (result) {
        this.route.queryParamMap.subscribe((params) => {
          this.router.navigate([params.get("returnUrl") || "/"]);
        });
      } else this.invalidLogin = true;
    });
  }
}
