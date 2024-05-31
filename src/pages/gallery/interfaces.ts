import { HockeyLeague } from "../tournaments/interfaces";

export enum CardRarity { 'Silver' = 1, 'Gold' = 2 };
export type CardRarityName = 'Silver' | 'Gold' | 'Default';
export enum BonusMetric { 'Голы', 'Передачи' };
export enum PlayerPosition { 'Вратарь' = 1, 'Защитник' = 2, 'Нападающий' = 3 };
export type PlayerPositionName = 'Вратарь' | 'Защитник' | 'Нападающий';


export interface IPlayerCard {
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
    teamLogo: string,
    position: PlayerPosition,
    positionName: PlayerPositionName,
    league: HockeyLeague,
    leagueName: string,
    playerCost?: number
}

export interface IPlayer {
    avgFantasyPoints: number,
    cardRarity: number,
    id: number,
    league: number,
    leagueName: string,
    name: string,
    photo: string,
    playerCost: number,
    position: number,
    positionName: string,
    rarityName: CardRarityName,
    sweaterNumber: number,
    teamID: number,
    teamLogo: string,
    teamName: string
}