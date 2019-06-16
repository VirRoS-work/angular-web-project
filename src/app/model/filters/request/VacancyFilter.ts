import {PageInfo} from "../../PageInfo";

export class VacancyFilter {

  key: string;
  isGlobal: boolean;
  info: PageInfo;

  constructor(key: string, isGlobal: boolean, info: PageInfo) {
    this.key = key;
    this.isGlobal = isGlobal;
    this.info = info;
  }
}
