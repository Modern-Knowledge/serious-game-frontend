import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AuthGuardService } from "./providers/guard/auth-guard.service";
import { PatientGuardService } from "./providers/guard/patient-guard.service";

const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
    {
        path: "login",
        loadChildren: "./pages/login/login.module#LoginPageModule"
    },
    {
        path: "password-reset",
        loadChildren:
            "./pages/password-reset/password-reset.module#PasswordResetModule"
    },
    {
        path: "reset-password",
        loadChildren:
            "./pages/reset-password/reset-password.module#ResetPasswordModule"
    },
    {
        path: "registration",
        loadChildren:
            "./pages/registration/registration.module#RegistrationPageModule"
    },
    {
        path: "profile",
        loadChildren: "./pages/profile/profile.module#ProfilePageModule",
        canActivate: [AuthGuardService]
    },
    {
        path: "main-menu",
        loadChildren: "./pages/main-menu/main-menu.module#MainMenuPageModule",
        canActivate: [AuthGuardService]
    },
    {
        path: "game",
        loadChildren: "./pages/game/game.module#GamePageModule",
        canActivate: [AuthGuardService, PatientGuardService]
    },
    {
        path: "fridge",
        loadChildren: "./pages/game/fridge/fridge.module#FridgePageModule",
        canActivate: [AuthGuardService, PatientGuardService]
    },
    {
        path: "shelf/:id",
        loadChildren: "./pages/game/shelf/shelf.module#ShelfPageModule",
        canActivate: [AuthGuardService, PatientGuardService]
    },
    {
        path: "score-board",
        loadChildren:
            "./pages/game/score-board/score-board.module#ScoreBoardPageModule",
        canActivate: [AuthGuardService]
    },
    {
        path: "change-password",
        loadChildren:
            "./pages/user/change-password/change-password.module#ChangePasswordPageModule",
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
