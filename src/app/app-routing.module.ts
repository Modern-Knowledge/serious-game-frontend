import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AuthGuardService } from "./providers/guard/auth-guard.service";
import { LeaveGuard } from "./providers/guard/leave.guard";
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
        canDeactivate: [LeaveGuard],
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
    },
    {
        canActivate: [AuthGuardService],
        loadChildren:
            "./pages/recipe-info/recipe-info.module#RecipeInfoPageModule",
        path: "recipe-info"
    },
    {
        canActivate: [AuthGuardService],
        loadChildren: "./pages/about/about.module#AboutPageModule",
        path: "about"
    },
    {
        canActivate: [AuthGuardService],
        loadChildren: "./pages/logs/logs.module#LogsPageModule",
        path: "logs"
    },
    {
        canActivate: [AuthGuardService],
        loadChildren: "./pages/log/log.module#LogPageModule",
        path: "log"
    },
    {
        canActivate: [AuthGuardService],
        loadChildren:
            "./pages/ingredients/ingredients.module#IngredientsPageModule",
        path: "ingredients"
    },
    {
        canActivate: [AuthGuardService, PatientGuardService],
        loadChildren:
            "./pages/game/introduction/introduction.module#IntroductionPageModule",
        path: "introduction"
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ]
})
export class AppRoutingModule {}
