import { IPlayerCard, PlayerPosition, PlayerPositionName } from "../gallery/interfaces";

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
    players: IPlayerCard[];
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
    homeTeamAbbrev: string,
    league: HockeyLeague,
    matchId: number,
    startAt: Date,
    statusEvent: MatchStatus,
    awayTeamLogo: string,
    homeTeamLogo: string
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

export interface IPlayerResult {
    assists: number,
    fantasyPoint: number,
    gameDate: string,
    goals: number,
    hits: number,
    missedGoals: number,
    name: string,
    opponent: string,
    photo: string,
    pims: number,
    playerID: number,
    position: PlayerPosition,
    positionName: PlayerPositionName,
    rarity: number,
    rarityName: string,
    saves: number,
    shots: number,
    shutout: true,
    teamLogo: string,
    teamName: string
}

export interface ITournamentResult {
    coins: number,
    fantasyPoints: number,
    nickname: string,
    place: number,
    profileID: string,
    userPhoto: string,
    userTeam: IPlayerResult[]
}