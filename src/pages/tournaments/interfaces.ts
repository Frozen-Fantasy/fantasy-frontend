export type HockeyLeague = 'KHL' | 'NHL';

export interface ITeam {
    name:string;
}

export interface IMatchResult extends IMatch{
    homeTeamScore: number;
    guestTeamScore: number;
    winner: ITeam;
}

export interface IMatch{
    homeTeam: ITeam;
    guestTeam: ITeam;
}

export interface ITournamentParticipant{
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
    schedule: IMatch[];
    results: IMatchResult[]
    participants: ITournamentParticipant[]
}