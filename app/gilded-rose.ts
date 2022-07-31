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

import { Item, ItemIdentifier } from "./Item";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  isIdentifiedBy(name: string, identifier: ItemIdentifier) {
    return name.toLowerCase().includes(identifier);
  }

  getUpdatedQuality(quality: number, value: number = 1) {
    if (quality + value >= 50) {
      return 50;
    }

    if (quality + value <= 0) {
      return 0;
    }

    return quality + value;
  }

  getUpdatedBackstagePassItemQuality(item: Item) {
    if (item.sellIn + 1 <= 0) {
      return 0;
    }

    if (item.sellIn + 1 > 10) {
      return this.getUpdatedQuality(item.quality);
    }

    if (item.sellIn + 1 <= 10 && item.sellIn + 1 > 5) {
      return this.getUpdatedQuality(item.quality, 2);
    }

    return this.getUpdatedQuality(item.quality, 3);
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      const doesQualityDecrease =
        !this.isIdentifiedBy(item.name, ItemIdentifier.AGED) &&
        !this.isIdentifiedBy(item.name, ItemIdentifier.BACKSTAGE_PASSES) &&
        !this.isIdentifiedBy(item.name, ItemIdentifier.SULFURAS);
      const doesSellInDecrease = !this.isIdentifiedBy(item.name, ItemIdentifier.SULFURAS);
      const isBackstagePassItem = this.isIdentifiedBy(item.name, ItemIdentifier.BACKSTAGE_PASSES);
      const isAgedItem = this.isIdentifiedBy(item.name, ItemIdentifier.AGED);

      if (doesSellInDecrease) {
        item.sellIn = item.sellIn - 1;
      }

      if (doesQualityDecrease) {
        const qualityChange = item.sellIn < 0 ? -2 : -1;
        item.quality = this.getUpdatedQuality(item.quality, qualityChange);
        continue;
      }

      if (isBackstagePassItem) {
        item.quality = this.getUpdatedBackstagePassItemQuality(item);
        continue;
      }

      if (isAgedItem) {
        const qualityChange = item.sellIn < 0 ? 2 : 1;
        item.quality = this.getUpdatedQuality(item.quality, qualityChange);
        continue;
      }
    }
  }

  getItems() {
    return this.items;
  }
}
