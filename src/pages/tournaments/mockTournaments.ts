import { ITournament } from "./interfaces";

export const mockTournaments:ITournament[] = [
    {
        id:1,
        name: 'Турнир 1',
        startDate: new Date('2022-01-01'),
        participants: 25,
        contribution: 450,
        reward: 1500,
        league: 'KHL'
    },
    {
        id:2,
        name: 'Турнир 2',
        startDate: new Date('2022-02-15'),
        participants: 12,
        contribution: 200,
        reward: 900,
        league: 'NHL'
    },
    {
        id:3,
        name: 'Турнир 3',
        startDate: new Date('2022-03-10'),
        participants: 18,
        contribution: 300,
        reward: 1200,
        league: 'NHL'
    },
    {
        id:4,
        name: 'Турнир 4',
        startDate: new Date('2022-04-22'),
        participants: 20,
        contribution: 350,
        reward: 1300,
        league: 'KHL'
    },
    {
        id:5,
        name: 'Турнир 5',
        startDate: new Date('2022-05-05'),
        participants: 15,
        contribution: 250,
        reward: 1100,
        league: 'NHL'
    },
    {
        id:6,
        name: 'Турнир 6',
        startDate: new Date('2022-06-18'),
        participants: 30,
        contribution: 500,
        reward: 2000,
        league: 'KHL'
    },
    {
        id:7,
        name: 'Турнир 7',
        startDate: new Date('2022-07-01'),
        participants: 12,
        contribution: 200,
        reward: 900,
        league: 'KHL'
    },
    {
        id:8,
        name: 'Турнир 8',
        startDate: new Date('2022-08-13'),
        participants: 24,
        contribution: 400,
        reward: 1400,
        league: 'NHL'
    },
    {
        id:9,
        name: 'Турнир 9',
        startDate: new Date('2022-09-28'),
        participants: 16,
        contribution: 300,
        reward: 1200,
        league: 'NHL'
    },
    {
        id:10,
        name: 'Турнир 10',
        startDate: new Date('2022-10-15'),
        participants: 22,
        contribution: 350,
        reward: 1300,
        league: 'KHL'
    }
];