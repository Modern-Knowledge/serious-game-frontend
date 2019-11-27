import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {HttpResponse} from "../../lib/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class UserService {

    /**
     * @param httpClient http-client for requests
     */
    constructor(private httpClient: HttpClient) {}

    /**
     * Tries to change the password of the given user-id.
     *
     * @param id id of the user where the password should be changed
     * @param oldPassword old-password of the user
     * @param newPassword new-password of the user
     * @param newPasswordConfirmation confirmation of the user, that wants to change his password
     */
    public changePassword(id: number, oldPassword: string, newPassword: string, newPasswordConfirmation: string) {
        return this.httpClient.put<HttpResponse>("users/change-password/" + 1, {
            newPassword,
            newPasswordConfirmation,
            oldPassword
        });
    }

}
