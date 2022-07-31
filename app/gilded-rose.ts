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
        const baseQualityChange = this.isIdentifiedBy(item.name, ItemIdentifier.CONJURED) ? -2 : -1;
        const qualityChangeMultiplier = item.sellIn < 0 ? 2 : 1;
        const actualQualityChange = baseQualityChange * qualityChangeMultiplier;
        item.quality = this.getUpdatedQuality(item.quality, actualQualityChange);
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
