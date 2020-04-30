import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PatientDto } from "serious-game-library/dist/models/Dto/PatientDto";
import { TherapistDto } from "serious-game-library/dist/models/Dto/TherapistDto";
import { Patient } from "serious-game-library/dist/models/Patient";
import { Therapist } from "serious-game-library/dist/models/Therapist";
import { User } from "serious-game-library/dist/models/User";
import { HttpResponse } from "serious-game-library/dist/utils/http/HttpResponse";

@Injectable()
export class AuthService {
    public user: User;
    public helper = new JwtHelperService();
    public redirectUrl: string;
    private loggedInSubject = new BehaviorSubject<boolean>(
        this.getToken() !== null
    );
    constructor(private httpClient: HttpClient) {}

    /**
     * Tries to login in the application with the provided credentials.
     *
     * @param email email of the user
     * @param password password of the user
     * @param loggedIn indicates that the user wants to be logged in permanently
     */
    public login(email: string, password: string, loggedIn: boolean) {
        return this.httpClient.post<User>("login", {
            email,
            loggedIn,
            password
        });
    }

    /**
     * Registers the provided user and returns the inserted user.
     *
     * @param user user that should be registered
     * @param type type of the user (patient = false, therapist = true) that should be registered
     */
    public register(user: User, type: boolean): Observable<User> {
        return this.httpClient.post<User>(
            type ? "therapists" : "patients",
            user
        );
    }

    /**
     * Requests the reset of the password.
     *
     * @param email email of the user
     */
    public requestResetPassword(email: string) {
        return this.httpClient.post<HttpResponse>("password/reset", {
            email
        });
    }

    /**
     * Resets the password for the user.
     *
     * @param email email of the user, that wants to reset his password
     * @param password password of the user that wants to reset his password
     * @param passwordConfirmation password confirmation
     * @param token reset-token of the user, that wants to reset his password
     */
    public resetPassword(
        email: string,
        password: string,
        passwordConfirmation: string,
        token: number
    ) {
        return this.httpClient.post<HttpResponse>("password/reset-password", {
            email,
            password,
            passwordConfirmation,
            token
        });
    }

    /**
     * Returns information about the user.
     */
    public getRelatedUser(): Observable<TherapistDto | PatientDto> {
        return this.httpClient
            .get<HttpResponse>(`users/related`)
            .pipe(
                map((user) =>
                    this.isTherapist()
                        ? new TherapistDto(
                              new Therapist().deserialize(user)
                          ).deserialize(
                              new HttpResponse().deserialize(user).data.user
                          )
                        : new PatientDto(
                              new Patient().deserialize(user)
                          ).deserialize(
                              new HttpResponse().deserialize(user).data.user
                          )
                )
            );
    }

    /**
     * Returns the authentication token or null if the user is not logged in.
     */
    public getToken(): string {
        const token = localStorage.getItem("accessToken");
        return token ? token : null;
    }

    /**
     * Stores the authentication token in the local storage.
     *
     * @param token authentication token of the user
     */
    public setToken(token: string): void {
        if (token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("accessToken", token);
            this.loggedInSubject.next(true);
        }
    }

    /**
     * Stores the reset-token valid until time in the local storage
     *
     * @param resetTokenValidUntil time until the reset code is valid
     */
    public setResetTokenValidUntil(resetTokenValidUntil: string): void {
        if (resetTokenValidUntil) {
            localStorage.setItem("resetCodeValidUntil", resetTokenValidUntil);
        }
    }

    /**
     * Removes the reset-token-valid-until from the local storage
     */
    public removeResetTokenValidUntil(): void {
        localStorage.removeItem("resetCodeValidUntil");
    }

    /**
     * Removes the authentication token from the local storage
     */
    public logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem("accessToken");
        this.loggedInSubject.next(false);
    }

    /**
     * Checks if the user is logged in. Tests if the token is not null.
     */
    public isLoggedIn(): Observable<boolean> {
        return this.loggedInSubject.asObservable();
    }

    /**
     * Checks if the user is logged in and returns the user id. If the user is not logged in, null is returned.
     */
    public getUserIdFromToken(): number | null {
        if (this.getToken() !== null) {
            return this.helper.decodeToken(this.getToken()).id;
        }

        return null;
    }

    /**
     * Returns true if the logged in user is a therapist. If the user is not logged in, the function returns false.
     */
    public isTherapist() {
        if (this.getToken() !== null) {
            return this.helper.decodeToken(this.getToken()).therapist;
        }

        return false;
    }

    /**
     * Returns true if the logged in user is a admin. If the user is not logged in, the function returns false.
     */
    public isAdmin() {
        if (this.getToken() !== null) {
            return this.helper.decodeToken(this.getToken()).admin;
        }

        return false;
    }
}
