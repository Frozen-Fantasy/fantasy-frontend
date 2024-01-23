export type HockeyLeague = 'KHL' | 'NHL';

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
    id: number,
    name: string;
    startDate: Date;
    endDate: Date;
    participantsCount: number;
    contribution: number;
    reward: number;
    league: HockeyLeague;
    teams: ITeam[];
    matches: IMatch[];
    participants: ITournamentParticipant[]
}