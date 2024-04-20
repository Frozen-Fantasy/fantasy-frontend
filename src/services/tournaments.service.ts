import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { HockeyLeague, ITournament } from 'src/pages/tournaments/interfaces';
import { mockTournaments } from 'src/pages/tournaments/mockTournaments';
import { BASE_API_URL } from 'src/utils/dto';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  tournaments$: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);
  constructor(private http: HttpClient) { }

  getTournaments(league: "KHL" | "NHL" | "Both"): Observable<ITournament[]> {
    return this.http.get<ITournament[]>(`${BASE_API_URL}/tournament/get_tournaments/${league}`);
  }

  getAllTournaments() {
    this.getTournaments("Both").pipe(take(1)).subscribe((tournaments) => this.tournaments$.next(tournaments));
  }
}
