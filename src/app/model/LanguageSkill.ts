import {Language} from "./Language";

export class LanguageSkill {

  id?: number;
  language: Language;
  ownership_level: string;


  constructor(language: Language, ownership_level: string, id?: number) {
    this.id = id;
    this.language = language;
    this.ownership_level = ownership_level;
  }
}
