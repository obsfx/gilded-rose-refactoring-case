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

//new Item("+5 Dexterity Vest", 10, 20), //
//new Item("Aged Brie", 2, 0), //
//new Item("Elixir of the Mongoose", 5, 7), //
//new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
//new Item("Sulfuras, Hand of Ragnaros", -1, 80),
//new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
//new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
//new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
//// this conjured item does not work properly yet
//new Item("Conjured Mana Cake", 3, 6)];

export enum ItemIdentifier {
  AGED = "aged",
  SULFURAS = "sulfuras",
  BACKSTAGE_PASSES = "backstage passes",
  CONJURED = "conjured",
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  isIdentifiedBy(name: string, identifier: ItemIdentifier) {
    return name.toLowerCase().includes(identifier);
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      // --
      if (
        !this.isIdentifiedBy(item.name, ItemIdentifier.AGED) &&
        !this.isIdentifiedBy(item.name, ItemIdentifier.BACKSTAGE_PASSES)
      ) {
        if (item.quality > 0) {
          if (!this.isIdentifiedBy(item.name, ItemIdentifier.SULFURAS)) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (this.isIdentifiedBy(item.name, ItemIdentifier.BACKSTAGE_PASSES)) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      // --
      if (!this.isIdentifiedBy(item.name, ItemIdentifier.SULFURAS)) {
        item.sellIn = item.sellIn - 1;
      }
      // --
      if (item.sellIn < 0) {
        if (!this.isIdentifiedBy(item.name, ItemIdentifier.AGED)) {
          if (!this.isIdentifiedBy(item.name, ItemIdentifier.BACKSTAGE_PASSES)) {
            if (item.quality > 0) {
              if (!this.isIdentifiedBy(item.name, ItemIdentifier.SULFURAS)) {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
      // --
    }
  }

  getItems() {
    return this.items;
  }
}
