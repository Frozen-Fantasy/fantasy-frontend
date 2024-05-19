import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';
import { IPlayer } from 'src/pages/gallery/interfaces';
import { HockeyLeague, IMatch, IRoster, ITournament } from 'src/pages/tournaments/interfaces';
import { mockTournaments } from 'src/pages/tournaments/mockTournaments';
import { BASE_API_URL } from 'src/utils/dto';
import { UserService } from './auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  tournaments$: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);
  mytournaments$: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);
  constructor(private http: HttpClient, private userService: UserService) { }

  getTournaments(league: "KHL" | "NHL" | "Both"): Observable<ITournament[]> {
    return this.http.get<ITournament[]>(`${BASE_API_URL}/tournament/get_tournaments/${league}`);
  }

  getAllTournaments() {
    this.getTournaments("Both").pipe(take(1)).subscribe((tournaments) => this.tournaments$.next(tournaments));
  }

  getMyTournaments() {
    this.http.get<ITournament[]>(`${BASE_API_URL}/tournaments?profileID=${this.userService.userInfo.profileID}`).subscribe((tournaments) => this.mytournaments$.next(tournaments));
  }

  getMatches(id: number): Observable<IMatch[]> {
    return this.http.get<IMatch[]>(`${BASE_API_URL}/tournament/matches_by_tournament_id/${id}`);
  }

  getTournamentRoster(id: number): Observable<IPlayer[]> {
    return this.http.get<IRoster>(`${BASE_API_URL}/tournament/roster?tournamentID=${id}`).pipe(map(value => value.players));
  }

  registerTeamForTournament(tournamentId: number, playersIds: number[]): void {
    this.http.post<any>(`${BASE_API_URL}/tournament/team/create?tournamentID=${tournamentId}`, { userTeam: playersIds }).subscribe();
  }
}
