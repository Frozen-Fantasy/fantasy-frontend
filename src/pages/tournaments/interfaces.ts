export type HockeyLeague = 'KHL' | 'NHL';
export interface ITournament {
    name: string;
    startDate: Date;
    participants: number;
    contribution: number;
    reward: number;
    league: HockeyLeague
}