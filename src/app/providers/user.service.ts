import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {HttpResponse, HttpResponseStatus} from "serious-game-library/dist/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class UserService {

    /**
     * @param httpClient http-client for requests
     */
    constructor(private httpClient: HttpClient) {
    }

    /**
     * Tries to change the password of the given user-id.
     *
     * @param id id of the user where the password should be changed
     * @param oldPassword old-password of the user
     * @param newPassword new-password of the user
     * @param newPasswordConfirmation confirmation of the user, that wants to change his password
     */
    public changePassword(id: number, oldPassword: string, newPassword: string, newPasswordConfirmation: string) {
        return this.httpClient.put<HttpResponse>("users/change-password/" + id, {
            newPassword,
            newPasswordConfirmation,
            oldPassword
        });
    }

    /**
     * Updates common attributes that patients and therapists have in common.
     *
     * @param id id of the user
     * @param email email of the user
     * @param gender gender of the user
     * @param forename forename of the user
     * @param lastname lastname of the user
     */
    public updateUser(id: number, gender: number, email: string, forename: string, lastname: string) {
        return this.httpClient.put<HttpResponse>("users/" + id, {
            _email: email,
            _forename: forename,
            _gender: gender,
            _lastname: lastname
        }).pipe(
            map((user: HttpResponse) => {
                const userModel = new HttpResponse().deserialize(user);
                return userModel.status === HttpResponseStatus.SUCCESS ?
                    userModel.data.user : undefined;
            })
        );
    }

}
