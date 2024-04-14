import { HockeyLeague } from "../tournaments/interfaces";

export interface IProduct {
    id: number;
    league: HockeyLeague,
    leagueName: string,
    photoLink: string,
    playerCardsCount: number,
    price: number,
    productName: string,
    rarity: number,
    rarityName: string
}