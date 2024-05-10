import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BASE_API_URL } from "src/utils/dto";
import { IPlayer } from "./interfaces";
import { AuthService } from "src/services/auth/auth.service";
import { UserService } from "src/services/auth/user.service";

@Injectable({ providedIn: 'root' })

export class GalleryService {
    unpackedPlayers$ = new BehaviorSubject<IPlayer[]>([]);
    packedPlayers$ = new BehaviorSubject<IPlayer[]>([]);

    constructor(private http: HttpClient, private userService: UserService) {
    }

    getUnpackedPlayers() {
        this.http.get<IPlayer[]>(`${BASE_API_URL}/players/cards?profileID=${this.userService.userInfo.profileID}&unpacked=true`).subscribe((players) => this.unpackedPlayers$.next(players));
    }

    getPackedPlayers() {
        this.http.get<IPlayer[]>(`${BASE_API_URL}/players/cards?profileID=${this.userService.userInfo.profileID}&unpacked=false`).subscribe((players) => this.packedPlayers$.next(players));
    }

    unpackPlayer(id: number): Observable<any> {
        return this.http.post<any>(`${BASE_API_URL}/players/cards/unpack?id=${id}`, {});
    }
}