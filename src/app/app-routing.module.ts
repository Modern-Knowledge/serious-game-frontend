import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AuthGuardService } from "./providers/guard/auth-guard.service";
import { PatientGuardService } from "./providers/guard/patient-guard.service";

const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
    {
        loadChildren: "./pages/login/login.module#LoginPageModule",
        path: "login"
    },
    {
        loadChildren:
            "./pages/password-reset/password-reset.module#PasswordResetModule",
        path: "password-reset"
    },
    {
        loadChildren:
            "./pages/reset-password/reset-password.module#ResetPasswordModule",
        path: "reset-password"
    },
    {
        loadChildren:
            "./pages/registration/registration.module#RegistrationPageModule",
        path: "registration"
    },
    {
        canActivate: [AuthGuardService],
        loadChildren: "./pages/profile/profile.module#ProfilePageModule",
        path: "profile"
    },
    {
        canActivate: [AuthGuardService],
        loadChildren: "./pages/main-menu/main-menu.module#MainMenuPageModule",
        path: "main-menu"
    },
    {
        canActivate: [AuthGuardService, PatientGuardService],
        loadChildren: "./pages/game/game.module#GamePageModule",
        path: "game"
    },
    {
        canActivate: [AuthGuardService, PatientGuardService],
        loadChildren: "./pages/game/fridge/fridge.module#FridgePageModule",
        path: "fridge"
    },
    {
        canActivate: [AuthGuardService, PatientGuardService],
        loadChildren: "./pages/game/shelf/shelf.module#ShelfPageModule",
        path: "shelf/:id"
    },
    {
        canActivate: [AuthGuardService],
        loadChildren:
            "./pages/game/score-board/score-board.module#ScoreBoardPageModule",
        path: "score-board"
    },
    {
        canActivate: [AuthGuardService],
        loadChildren:
            "./pages/user/change-password/change-password.module#ChangePasswordPageModule",
        path: "change-password"
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ]
})
export class AppRoutingModule {}
