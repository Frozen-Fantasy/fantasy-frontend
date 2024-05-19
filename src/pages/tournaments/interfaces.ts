import { IPlayer } from "../gallery/interfaces";

export enum HockeyLeague { '', 'NHL', 'KHL' };

export type EventStatus = 'not_yet_started' | 'started' | 'finished';

export type MatchStatus = 'not_yet_started' | 'started' | 'finished';

export const StatusMap: { [key in MatchStatus]: string } = {
    not_yet_started: 'Запланирован',
    started: 'Идет',
    finished: 'Завершен'
};
export interface ITeam {
    teamAbbrev: string;
    teamID: number;
    teamName: string;
}

export interface IRoster {
    players: IPlayer[];
    positions: { positionAbbrev: string, positionName: string }[],
    teams: ITeam[]
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
    timeStart: number;
    timeStartTS: number;
    deposit: number;
    league: HockeyLeague;
    matchesIds: number[];
    playersAmount: number;
    prizeFond: number;
    statusTournament: EventStatus;
    timeEnd: number;
    timeEndTS: number;
    title: string;
    tournamentId: number;
}