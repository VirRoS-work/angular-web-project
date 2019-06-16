import {PageInfo} from "../../PageInfo";

export class CompanyFilter {

  name: string;
  isEmptyCompany: boolean;
  info: PageInfo;

  constructor(name: string, isEmptyCompany: boolean, info: PageInfo) {
    this.name = name;
    this.isEmptyCompany = isEmptyCompany;
    this.info = info;
  }
}
