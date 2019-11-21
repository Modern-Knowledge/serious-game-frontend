import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Patient } from "src/lib/models/Patient";
import { Therapist } from "src/lib/models/Therapist";
import { User } from "src/lib/models/User";
import { HttpResponse } from "src/lib/utils/http/HttpResponse";

@Injectable()
export class AuthService {
    public user: User;
    public helper = new JwtHelperService();
    public redirectUrl: string;
    constructor(private httpClient: HttpClient) {}

    /**
     * Tries to login in the application with the provided credentials.
     *
     * @param email email of the user
     * @param password password of the user
     */
    public login(email: string, password: string) {
        return this.httpClient.post<User>("login", {
            email,
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
        return this.httpClient.post<User>(type ? "therapists" : "patients", user);
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
     * @param token reset-token of the user, that wants to reset his password
     */
    public resetPassword(email: string, password: string, token: number) {
        return this.httpClient.post<HttpResponse>("password/reset-password", {
            email,
            password,
            token
        });
    }

    /**
     * Returns information about the user.
     */
    public getRelatedUser(): Observable<Therapist | Patient> {
        return this.httpClient
            .get<HttpResponse>(`users/related`)
            .pipe(
                map((user) =>
                    this.isTherapist()
                        ? new Therapist().deserialize(
                        new HttpResponse().deserialize(user).data.user
                        )
                        : new Patient().deserialize(
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
    }

    /**
     * Checks if the user is logged in. Tests if the token is not null.
     */
    public isLoggedIn(): boolean {
        return this.getToken() !== null;
    }

    /**
     * Checks if the user is logged in and returns the user id. If the user is not logged in, null is returned.
     */
    public getUserIdFromToken() {
        if (this.isLoggedIn()) {
            return this.helper.decodeToken(this.getToken()).id;
        }

        return null;
    }

    /**
     * Returns true if the logged in user is a therapist. If the user is not logged in, the function returns false.
     */
    public isTherapist() {
        if (this.isLoggedIn()) {
            return this.helper.decodeToken(this.getToken()).therapist;
        }

        return false;
    }
}
