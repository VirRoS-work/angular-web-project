export class Event {

  id: number;
  title: string;
  type: string;
  address: string;
  description: string;
  time: Date;

  constructor(id: number, title: string, type: string, address: string, description: string, time: Date) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.address = address;
    this.description = description;
    this.time = time;
  }
}
