import { Item, GildedRose, SpecialItem } from "@/gilded-rose";

const iterateUpdateQualityNTimes = (gildedRoseInstance: GildedRose, n: number) => {
  for (let i = 0; i < n; i++) {
    gildedRoseInstance.updateQuality();
  }
};

describe("Gilded Rose", () => {
  it("sell by date passed, quality degrades twice as fast", () => {
    const items = [new Item("+5 Dexterity Vest", -1, 12), new Item("Broken Shield", -2, 14)];

    const gildedRose = new GildedRose(items);
    iterateUpdateQualityNTimes(gildedRose, 4);
    const updatedItems = gildedRose.getItems();

    expect(updatedItems[0].quality).toBe(4);
    expect(updatedItems[1].quality).toBe(6);
  });

  it("quality of an item is never negative", () => {
    const items = [
      new Item(SpecialItem.AGED_BRIE, 1, 0),
      new Item(SpecialItem.BACKSTAGE_PASSES, 1, 2),
      new Item("+5 Dexterity Vest", -1, 2),
      new Item("+10 Holy Sword", 2, 6),
    ];

    const gildedRose = new GildedRose(items);
    iterateUpdateQualityNTimes(gildedRose, 4);
    const updatedItems = gildedRose.getItems();

    for (let i = 0; i < updatedItems.length; i++) {
      expect(updatedItems[i].quality).not.toBeLessThan(0);
    }
  });

  it("aged brie increases in quality the older it gets", () => {
    // 2 * 1 + 8 * 2 = 18, // 5 * 1 + 5 * 2 = 15
    const items = [new Item(SpecialItem.AGED_BRIE, 2, 0), new Item(SpecialItem.AGED_BRIE, 5, 0)];

    const gildedRose = new GildedRose(items);
    iterateUpdateQualityNTimes(gildedRose, 10);
    const updatedItems = gildedRose.getItems();

    expect(updatedItems[0].quality).toBe(18);
    expect(updatedItems[1].quality).toBe(15);
  });

  it("quality of an item is never more than 50", () => {
    const items = [
      new Item(SpecialItem.AGED_BRIE, 2, 45),
      new Item(SpecialItem.AGED_BRIE, 5, 42),
      new Item(SpecialItem.BACKSTAGE_PASSES, 10, 40),
      new Item(SpecialItem.BACKSTAGE_PASSES, 8, 36),
    ];

    const gildedRose = new GildedRose(items);
    iterateUpdateQualityNTimes(gildedRose, 9);
    const updatedItems = gildedRose.getItems();

    for (let i = 0; i < updatedItems.length; i++) {
      expect(updatedItems[i].quality).not.toBeGreaterThan(50);
    }
  });

  it("sulfuras never decreases in quality", () => {
    const items = [new Item(SpecialItem.SULFURAS, 0, 80), new Item(SpecialItem.SULFURAS, -1, 80)];

    const gildedRose = new GildedRose(items);
    iterateUpdateQualityNTimes(gildedRose, 10);
    const updatedItems = gildedRose.getItems();

    for (let i = 0; i < updatedItems.length; i++) {
      expect(updatedItems[i].quality).toBe(80);
    }
  });

  it("backstage passes, like aged brie, increases in quality as its sellIn value approaches", () => {
    const items = [
      new Item(SpecialItem.BACKSTAGE_PASSES, 16, 8),
      new Item(SpecialItem.BACKSTAGE_PASSES, 20, 4),
      new Item(SpecialItem.BACKSTAGE_PASSES, 12, 4),
      new Item(SpecialItem.BACKSTAGE_PASSES, 6, 4),
    ];

    const gildedRose = new GildedRose(items);
    iterateUpdateQualityNTimes(gildedRose, 4);
    const updatedItems = gildedRose.getItems();

    expect(updatedItems[0].quality).toBe(12);
    expect(updatedItems[1].quality).toBe(8);
    expect(updatedItems[2].quality).toBe(10);
    expect(updatedItems[3].quality).toBe(15);
  });

  it("backstage passes increases in quality by 2 when there are 10 days or less", () => {
    const items = [
      new Item(SpecialItem.BACKSTAGE_PASSES, 10, 20),
      new Item(SpecialItem.BACKSTAGE_PASSES, 9, 12),
    ];

    const gildedRose = new GildedRose(items);
    iterateUpdateQualityNTimes(gildedRose, 4);
    const updatedItems = gildedRose.getItems();

    expect(updatedItems[0].quality).toBe(28);
    expect(updatedItems[1].quality).toBe(20);
  });

  it("backstage passes increases in quality by 3 when there are 5 days or less", () => {
    const items = [
      new Item(SpecialItem.BACKSTAGE_PASSES, 8, 20),
      new Item(SpecialItem.BACKSTAGE_PASSES, 7, 12),
    ];

    const gildedRose = new GildedRose(items);
    iterateUpdateQualityNTimes(gildedRose, 6);
    const updatedItems = gildedRose.getItems();

    expect(updatedItems[0].quality).toBe(35);
    expect(updatedItems[1].quality).toBe(28);
  });

  it("backstage passes quality drops to 0 after the concert", () => {
    const items = [
      new Item(SpecialItem.BACKSTAGE_PASSES, 12, 40),
      new Item(SpecialItem.BACKSTAGE_PASSES, 14, 50),
    ];

    const gildedRose = new GildedRose(items);
    iterateUpdateQualityNTimes(gildedRose, 15);
    const updatedItems = gildedRose.getItems();

    expect(updatedItems[0].quality).toBe(0);
    expect(updatedItems[1].quality).toBe(0);
  });

  // TODO:
  // conjured items degrade in quality as fast as normal items
});
