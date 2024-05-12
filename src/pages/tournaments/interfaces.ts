export enum HockeyLeague { '', 'NHL', 'KHL' };

export type MatchStatus = 'not_yet_started' | 'started' | 'finished';

export const StatusMap: { [key in MatchStatus]: string } = {
    not_yet_started: 'Запланирован',
    started: 'Идет',
    finished: 'Завершен'
};
export interface ITeam {
    name: string;
}

export interface IMatch {
    awayScore: number,
    awayTeamAbbrev: string,
    awayTeamId: number,
    endAt: Date,
    eventId: number,
    homeScore: number,
    homeTeamId: number,
    homeTemeAbrev: string,
    league: HockeyLeague,
    matchId: number,
    startAt: Date,
    statusEvent: MatchStatus
}

export interface ITournamentParticipant {
    userName: string;
}

export interface ITournament {
    TimeStart: number;
    deposit: number;
    league: HockeyLeague;
    matchesIds: number[];
    playersAmount: number;
    prizeFond: number;
    statusTournament: string;
    timeEnd: number;
    title: string;
    tournamentId: number;
}