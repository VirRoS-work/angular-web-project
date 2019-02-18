import {Sport} from "./Sport";

export class SportSkill {

  id?: number;
  sport: Sport;
  ownership_level: string;


  constructor(sport: Sport, ownership_level: string, id?: number) {
    this.id = id;
    this.sport = sport;
    this.ownership_level = ownership_level;
  }
}
