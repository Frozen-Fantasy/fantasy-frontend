import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';
import { IPlayer } from 'src/pages/gallery/interfaces';
import { HockeyLeague, IMatch, IRoster, ITournament, ITournamentResult } from 'src/pages/tournaments/interfaces';
import { mockTournaments } from 'src/pages/tournaments/mockTournaments';
import { BASE_API_URL } from 'src/utils/dto';
import { UserService } from './auth/user.service';

export interface ITournamentTeam {
  balance: number;
  players: IPlayer[]
}
@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  tournaments$: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);
  mytournaments$: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);
  constructor(private http: HttpClient, private userService: UserService) { }

  getTournaments(): Observable<ITournament[]> {
    return this.http.get<ITournament[]>(`${BASE_API_URL}/tournaments?type=all`);
  }

  getAllTournaments() {
    this.getTournaments().pipe(take(1)).subscribe((tournaments) => this.tournaments$.next(tournaments));
  }

  getMyTournaments() {
    this.http.get<ITournament[]>(`${BASE_API_URL}/tournaments?type=personal`).subscribe((tournaments) => this.mytournaments$.next(tournaments));
  }

  getMatches(id: number): Observable<IMatch[]> {
    return this.http.get<IMatch[]>(`${BASE_API_URL}/tournament/matches_by_tournament_id/${id}`);
  }

  getTournamentRoster(id: number): Observable<IPlayer[]> {
    return this.http.get<IRoster>(`${BASE_API_URL}/tournament/roster?tournamentID=${id}`).pipe(map(value => value.players));
  }

  registerTeamForTournament(tournamentId: number, playersIds: number[]): void {
    this.http.post<any>(`${BASE_API_URL}/tournament/team/create?tournamentID=${tournamentId}`, { team: playersIds }).subscribe();
  }

  updateTeamForTournament(tournamentId: number, playersIds: number[]): void {
    this.http.put<any>(`${BASE_API_URL}/tournament/team/edit?tournamentID=${tournamentId}`, { team: playersIds }).subscribe();
  }

  getMyTeam(tournamentId: number): Observable<ITournamentTeam> {
    return this.http.get<ITournamentTeam>(`${BASE_API_URL}/tournament/team?tournamentID=${tournamentId}`);
  }

  getTournamentsResults(tournamentId: number): Observable<ITournamentResult[]> {
    return this.http.get<ITournamentResult[]>(`${BASE_API_URL}/tournament/results?tournamentID=${tournamentId}`);
  }
}
