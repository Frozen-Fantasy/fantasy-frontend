export enum HockeyLeague { '', 'NHL', 'KHL' };

export type MatchStatus = 'scheduled' | 'started' | 'finished';

export const StatusMap: { [key in MatchStatus]: string } = {
    scheduled: '',
    started: 'Идет',
    finished: 'Завершен'
};
export interface ITeam {
    name: string;
}

export interface IMatch {
    homeTeam: ITeam;
    guestTeam: ITeam;
    status: MatchStatus;
    homeTeamScore?: number;
    guestTeamScore?: number;
    winner?: ITeam;
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