import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, catchError, take } from "rxjs";
import { BASE_API_URL } from "src/utils/dto";
import { IPlayer, IPlayerCard } from "./interfaces";
import { AuthService } from "src/services/auth/auth.service";
import { UserService } from "src/services/auth/user.service";
import { IPlayerResult } from "../tournaments/interfaces";

export interface IPlayerStat {
    matchIdLocal: number,
    gameDate: Date,
    opponent: string,
    fantasyPoint: number,
    goals: number,
    assists: number,
    shots: number,
    pims: number,
    hits: number,
    saves: number,
    missedGoals: number,
    shutout: false
}

@Injectable({ providedIn: 'root' })

export class GalleryService {
    unpackedPlayers$ = new BehaviorSubject<IPlayerCard[]>([]);
    packedPlayers$ = new BehaviorSubject<IPlayerCard[]>([]);

    constructor(private http: HttpClient, private userService: UserService) {
    }

    getUnpackedPlayers() {
        this.http.get<IPlayerCard[]>(`${BASE_API_URL}/players/cards?profileID=${this.userService.userInfo.profileID}&unpacked=true`).subscribe((players) => this.unpackedPlayers$.next(players));
    }

    getPackedPlayers() {
        this.http.get<IPlayerCard[]>(`${BASE_API_URL}/players/cards?profileID=${this.userService.userInfo.profileID}&unpacked=false`).subscribe((players) => this.packedPlayers$.next(players));
    }

    unpackPlayer(id: number): Observable<any> {
        return this.http.post<any>(`${BASE_API_URL}/players/cards/unpack?id=${id}`, {});
    }

    getAllPlayers(): Observable<IPlayer[]> {
        return this.http.get<IPlayer[]>(`${BASE_API_URL}/players/info`);
    }

    getPlayerInfo(playerId: number): Observable<IPlayerStat[]> {
        return this.http.get<IPlayerStat[]>(`${BASE_API_URL}/players/statistic_player/${playerId}`).pipe(take(1), catchError(() => EMPTY));
    }
}