import { Injectable } from '@angular/core';
import { ITournament } from 'src/pages/tournaments/interfaces';
import { mockTournaments } from 'src/pages/tournaments/mockTournaments';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  mockTournaments : ITournament[] = mockTournaments;
  constructor() { }
}
