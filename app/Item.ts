export enum ItemIdentifier {
  AGED = "aged",
  SULFURAS = "sulfuras",
  BACKSTAGE_PASSES = "backstage passes",
  CONJURED = "conjured",
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
