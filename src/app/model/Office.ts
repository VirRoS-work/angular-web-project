export class Office {

  id?: number;
  city: string;
  address: string;
  description: string;

  constructor(city: string, address: string, description: string, id?: number) {
    this.id = id;
    this.city = city;
    this.address = address;
    this.description = description;
  }
}
