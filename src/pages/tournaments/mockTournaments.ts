import { ITournament } from "./interfaces";

export const mockTournaments:ITournament[] = [
    {
      id: 1,
      name: "Ледовое Побоище",
      startDate: new Date("2025-01-01T00:00:00.000Z"),
      endDate: new Date("2025-02-01T00:00:00.000Z"),
      participantsCount: 8,
      contribution: 50,
      reward: 200,
      league: "NHL",
      teams: [
        {name: "Boston Bruins"},
        {name: "Detroit Red Wings"},
        {name: "Pittsburgh Penguins"},
        {name: "Ottawa Senators"}
      ],
      schedule: [
        {
          homeTeam: {name: "Boston Bruins"},
          guestTeam: {name: "Detroit Red Wings"},
        },
        {
          homeTeam: {name: "Pittsburgh Penguins"},
          guestTeam: {name: "Ottawa Senators"},
        }
      ],
      results: [
        {homeTeam: {name: "Boston Bruins"},
        guestTeam: {name: "Detroit Red Wings"},homeTeamScore: 3, guestTeamScore: 2, winner: {name: "Boston Bruins"}},
        {homeTeam: {name: "Pittsburgh Penguins"},
        guestTeam: {name: "Ottawa Senators"},homeTeamScore: 1, guestTeamScore: 4, winner: {name: "Ottawa Senators"}}
      ],
      participants:[
        {
            userName:'FrostyJoker23'
        },
        {
            userName:'QuantumTiger78'
        },
        {
            userName:'SilverDragon42'
        }
      ]
    },
    {
      id: 2,
      name: "Снежная Буря",
      startDate: new Date("2026-01-01T00:00:00.000Z"),
      endDate: new Date("2026-02-01T00:00:00.000Z"),
      participantsCount: 8,
      contribution: 50,
      reward: 200,
      league: "KHL",
      teams: [
        {name: "СКА"},
        {name: "Торпедо"},
        {name: "Локомотив"},
        {name: "Северсталь"}
      ],
      schedule: [
        {
          homeTeam: {name: "СКА"},
          guestTeam: {name: "Торпедо"},
        },
        {
          homeTeam: {name: "Локомотив"},
          guestTeam: {name: "Северсталь"},
        }
      ],
      results: [
        {
            homeTeam: {name: "СКА"},
            guestTeam: {name: "Торпедо"}
          ,homeTeamScore: 4, guestTeamScore: 1, winner: {name: "СКА"}},
        {homeTeam: {name: "Локомотив"},
        guestTeam: {name: "Северсталь"},homeTeamScore: 2, guestTeamScore: 3, winner: {name: "Северсталь"}}
      ],
      participants:[
        {
            userName:'FrostyJoker23'
        },
        {
            userName:'QuantumTiger78'
        },
        {
            userName:'SilverDragon42'
        }
      ]
    },
    {
        id: 3,
        name: "Морозное Приключение",
        startDate: new Date("2025-01-01T00:00:00.000Z"),
        endDate: new Date("2025-02-01T00:00:00.000Z"),
        participantsCount: 8,
        contribution: 50,
        reward: 200,
        league: "NHL",
        teams: [
          {name: "Boston Bruins"},
          {name: "Detroit Red Wings"},
          {name: "Pittsburgh Penguins"},
          {name: "Ottawa Senators"}
        ],
        schedule: [
          {
            homeTeam: {name: "Boston Bruins"},
            guestTeam: {name: "Detroit Red Wings"},
          },
          {
            homeTeam: {name: "Pittsburgh Penguins"},
            guestTeam: {name: "Ottawa Senators"},
          }
        ],
        results: [
          { homeTeam: {name: "Boston Bruins"},
          guestTeam: {name: "Detroit Red Wings"},homeTeamScore: 3, guestTeamScore: 2, winner: {name: "Boston Bruins"}},
          {homeTeam: {name: "Pittsburgh Penguins"},
          guestTeam: {name: "Ottawa Senators"},homeTeamScore: 1, guestTeamScore: 4, winner: {name: "Ottawa Senators"}}
        ],
        participants:[
            {
                userName:'FrostyJoker23'
            },
            {
                userName:'QuantumTiger78'
            },
            {
                userName:'SilverDragon42'
            }
          ]
      },
      {
        id: 4,
        name: "Зимний Шторм",
        startDate: new Date("2026-01-01T00:00:00.000Z"),
        endDate: new Date("2026-02-01T00:00:00.000Z"),
        participantsCount: 8,
        contribution: 50,
        reward: 200,
        league: "KHL",
        teams: [
          {name: "СКА"},
          {name: "Торпедо"},
          {name: "Локомотив"},
          {name: "Северсталь"}
        ],
        schedule: [
          {
            homeTeam: {name: "СКА"},
            guestTeam: {name: "Торпедо"},
          },
          {
            homeTeam: {name: "Локомотив"},
            guestTeam: {name: "Северсталь"},
          }
        ],
        results: [
          { homeTeam: {name: "СКА"},
          guestTeam: {name: "Торпедо"},homeTeamScore: 4, guestTeamScore: 1, winner: {name: "СКА"}},
          {homeTeam: {name: "Локомотив"},
          guestTeam: {name: "Северсталь"},homeTeamScore: 2, guestTeamScore: 3, winner: {name: "Северсталь"}}
        ],
        participants:[
            {
                userName:'FrostyJoker23'
            },
            {
                userName:'QuantumTiger78'
            },
            {
                userName:'SilverDragon42'
            }
          ]
      },
      {
        id: 5,
        name: "Ледяной Фестиваль",
        startDate: new Date("2025-01-01T00:00:00.000Z"),
        endDate: new Date("2025-02-01T00:00:00.000Z"),
        participantsCount: 8,
        contribution: 50,
        reward: 200,
        league: "NHL",
        teams: [
          {name: "Boston Bruins"},
          {name: "Detroit Red Wings"},
          {name: "Pittsburgh Penguins"},
          {name: "Ottawa Senators"}
        ],
        schedule: [
          {
            homeTeam: {name: "Boston Bruins"},
            guestTeam: {name: "Detroit Red Wings"},
          },
          {
            homeTeam: {name: "Pittsburgh Penguins"},
            guestTeam: {name: "Ottawa Senators"},
          }
        ],
        results: [
          {homeTeam: {name: "Boston Bruins"},
          guestTeam: {name: "Detroit Red Wings"},homeTeamScore: 3, guestTeamScore: 2, winner: {name: "Boston Bruins"}},
          {homeTeam: {name: "Pittsburgh Penguins"},
          guestTeam: {name: "Ottawa Senators"},homeTeamScore: 1, guestTeamScore: 4, winner: {name: "Ottawa Senators"}}
        ],
        participants:[
            {
                userName:'FrostyJoker23'
            },
            {
                userName:'QuantumTiger78'
            },
            {
                userName:'SilverDragon42'
            }
          ]
      },
      {
        id: 6,
        name: "Морозное Противостояние",
        startDate: new Date("2026-01-01T00:00:00.000Z"),
        endDate: new Date("2026-02-01T00:00:00.000Z"),
        participantsCount: 8,
        contribution: 50,
        reward: 200,
        league: "KHL",
        teams: [
          {name: "СКА"},
          {name: "Торпедо"},
          {name: "Локомотив"},
          {name: "Северсталь"}
        ],
        schedule: [
          {
            homeTeam: {name: "СКА"},
            guestTeam: {name: "Торпедо"},
          },
          {
            homeTeam: {name: "Локомотив"},
            guestTeam: {name: "Северсталь"},
          }
        ],
        results: [
          {homeTeam: {name: "СКА"},
          guestTeam: {name: "Торпедо"},homeTeamScore: 4, guestTeamScore: 1, winner: {name: "СКА"}},
          {homeTeam: {name: "Локомотив"},
          guestTeam: {name: "Северсталь"},homeTeamScore: 2, guestTeamScore: 3, winner: {name: "Северсталь"}}
        ],
        participants:[
            {
                userName:'FrostyJoker23'
            },
            {
                userName:'QuantumTiger78'
            },
            {
                userName:'SilverDragon42'
            }
          ]
      },
      {
        id: 7,
        name: "Зимний Кубок Вихрей",
        startDate: new Date("2025-01-01T00:00:00.000Z"),
        endDate: new Date("2025-02-01T00:00:00.000Z"),
        participantsCount: 8,
        contribution: 50,
        reward: 200,
        league: "NHL",
        teams: [
          {name: "Boston Bruins"},
          {name: "Detroit Red Wings"},
          {name: "Pittsburgh Penguins"},
          {name: "Ottawa Senators"}
        ],
        schedule: [
          {
            homeTeam: {name: "Boston Bruins"},
            guestTeam: {name: "Detroit Red Wings"},
          },
          {
            homeTeam: {name: "Pittsburgh Penguins"},
            guestTeam: {name: "Ottawa Senators"},
          }
        ],
        results: [
          {homeTeam: {name: "Boston Bruins"},
          guestTeam: {name: "Detroit Red Wings"},homeTeamScore: 3, guestTeamScore: 2, winner: {name: "Boston Bruins"}},
          {homeTeam: {name: "Pittsburgh Penguins"},
          guestTeam: {name: "Ottawa Senators"},homeTeamScore: 1, guestTeamScore: 4, winner: {name: "Ottawa Senators"}}
        ],
        participants:[
            {
                userName:'FrostyJoker23'
            },
            {
                userName:'QuantumTiger78'
            },
            {
                userName:'SilverDragon42'
            }
          ]
      },
      {
        id: 8,
        name: "Ледяные Баталии",
        startDate: new Date("2026-01-01T00:00:00.000Z"),
        endDate: new Date("2026-02-01T00:00:00.000Z"),
        participantsCount: 8,
        contribution: 50,
        reward: 200,
        league: "KHL",
        teams: [
          {name: "СКА"},
          {name: "Торпедо"},
          {name: "Локомотив"},
          {name: "Северсталь"}
        ],
        schedule: [
          {
            homeTeam: {name: "СКА"},
            guestTeam: {name: "Торпедо"},
          },
          {
            homeTeam: {name: "Локомотив"},
            guestTeam: {name: "Северсталь"},
          }
        ],
        results: [
          {homeTeam: {name: "СКА"},
          guestTeam: {name: "Торпедо"},homeTeamScore: 4, guestTeamScore: 1, winner: {name: "СКА"}},
          {homeTeam: {name: "Локомотив"},
          guestTeam: {name: "Северсталь"},homeTeamScore: 2, guestTeamScore: 3, winner: {name: "Северсталь"}}
        ],
        participants:[
            {
                userName:'FrostyJoker23'
            },
            {
                userName:'QuantumTiger78'
            },
            {
                userName:'SilverDragon42'
            }
          ]
      },
      {
        id: 9,
        name: "Морозные Дуэли",
        startDate: new Date("2025-01-01T00:00:00.000Z"),
        endDate: new Date("2025-02-01T00:00:00.000Z"),
        participantsCount: 8,
        contribution: 50,
        reward: 200,
        league: "NHL",
        teams: [
          {name: "Boston Bruins"},
          {name: "Detroit Red Wings"},
          {name: "Pittsburgh Penguins"},
          {name: "Ottawa Senators"}
        ],
        schedule: [
          {
            homeTeam: {name: "Boston Bruins"},
            guestTeam: {name: "Detroit Red Wings"},
          },
          {
            homeTeam: {name: "Pittsburgh Penguins"},
            guestTeam: {name: "Ottawa Senators"},
          }
        ],
        results: [
          {homeTeam: {name: "Boston Bruins"},
          guestTeam: {name: "Detroit Red Wings"},homeTeamScore: 3, guestTeamScore: 2, winner: {name: "Boston Bruins"}},
          {homeTeam: {name: "Pittsburgh Penguins"},
          guestTeam: {name: "Ottawa Senators"},homeTeamScore: 1, guestTeamScore: 4, winner: {name: "Ottawa Senators"}}
        ],
        participants:[
            {
                userName:'FrostyJoker23'
            },
            {
                userName:'QuantumTiger78'
            },
            {
                userName:'SilverDragon42'
            }
          ]
      },
      {
        id: 10,
        name: "Замороженные Схватки",
        startDate: new Date("2026-01-01T00:00:00.000Z"),
        endDate: new Date("2026-02-01T00:00:00.000Z"),
        participantsCount: 8,
        contribution: 50,
        reward: 200,
        league: "KHL",
        teams: [
          {name: "СКА"},
          {name: "Торпедо"},
          {name: "Локомотив"},
          {name: "Северсталь"}
        ],
        schedule: [
          {
            homeTeam: {name: "СКА"},
            guestTeam: {name: "Торпедо"},
          },
          {
            homeTeam: {name: "Локомотив"},
            guestTeam: {name: "Северсталь"},
          }
        ],
        results: [
          {homeTeam: {name: "СКА"},
          guestTeam: {name: "Торпедо"},homeTeamScore: 4, guestTeamScore: 1, winner: {name: "СКА"}},
          {homeTeam: {name: "Локомотив"},
          guestTeam: {name: "Северсталь"},homeTeamScore: 2, guestTeamScore: 3, winner: {name: "Северсталь"}}
        ],
        participants:[
            {
                userName:'FrostyJoker23'
            },
            {
                userName:'QuantumTiger78'
            },
            {
                userName:'SilverDragon42'
            }
          ]
      },
  ]
  ;