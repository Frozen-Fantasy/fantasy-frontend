import { HockeyLeague } from "../tournaments/interfaces";

export enum CardRarity { 'Silver' = 1, 'Gold' = 2 };
export enum BonusMetric { 'Голы', 'Передачи' };
export enum PlayerPosition { 'Вратарь' = 1, 'Защитник' = 2, 'Нападающий' = 3 };
export type PlayerPositionName = 'Вратарь' | 'Защитник' | 'Нападающий';


export interface IPlayer {

    id: number,
    profileID: string,
    playerID: number,
    rarity: CardRarity,
    rarityName: string,
    bonusMetric: BonusMetric,
    bonusMetricName: string,
    multiply: number,
    unpacked: boolean,
    name: string,
    sweaterNumber: number,
    photo: string,
    teamID: number,
    teamName: string,
    position: PlayerPosition,
    positionName: PlayerPositionName,
    league: HockeyLeague,
    leagueName: string
}