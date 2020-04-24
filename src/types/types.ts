interface ShowInfo {
  id: number;
  genres: string[];
  image: Image;
  runtime: number;
  language: string;
  name: string;
  network: any;
  officialSite: string;
  premiered: string;
  status: string;
  summary: string;
  type: string;
  updated: number;
  url: string;
  weight: number;
  rating: Rating;
  schedule: Schedule;
  webChannel: WebChannel;
}

interface Image {
  medium: string;
  original: string;
}

interface Rating {
  average: any;
}

interface Schedule {
  days: string[];
  time: string;
}

interface WebChannel {
  id: number;
  name: string;
  country: Country;
}

interface Country {
  code: string;
  name: string;
  timezone: string;
}

interface IShow {
  score: number;
  show: ShowInfo;
}

// eslint-disable-next-line no-undef
export {IShow, ShowInfo};
