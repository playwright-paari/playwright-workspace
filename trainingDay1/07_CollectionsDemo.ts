export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 7: COLLECTIONS - Array, Object, Map, Set
 *
 *   Array   ordered list, find by POSITION            arr[0]
 *   Object  named fields, like an ID card             person.name
 *   Map     look up a value by a KEY (any type)       map.get("key")
 *   Set     only UNIQUE values, duplicates vanish     set.has(2)
 *
 *   OBJECT (labelled drawers)         SET (a bag with no duplicates)
 *   person                            you add:  1 2 2 3 3 3
 *    +----------+---------+           set keeps: 1 2 3
 *    | name     | "Paari" |
 *    | age      | 25      |
 *    | isTester | true    |
 *    +----------+---------+
 *
 * Run this file:  npx tsx training/day2/07_CollectionsDemo.ts
 */
class CollectionsDemo {
  /** Object: read by name with dot or square brackets. */
  objectDemo(): void {
    section("objectDemo");
    const person = { name: "Paari", age: 25, isTester: true };
    console.log(person.name); // => Paari
    console.log(person["age"]); // => 25
    person.age = 26; // update a value
    console.log(person); // => { name: 'Paari', age: 26, isTester: true }
  }

  /** Object.keys / values / entries turn an object into arrays so you can loop over it. */
  objectKeysValuesEntries(): void {
    section("objectKeysValuesEntries");
    const person = { name: "Paari", age: 25 };
    console.log(Object.keys(person)); // => [ 'name', 'age' ]
    console.log(Object.values(person)); // => [ 'Paari', 25 ]
    console.log(Object.entries(person)); // => [ [ 'name', 'Paari' ], [ 'age', 25 ] ]
  }

  /** Map: store key -> value pairs. Keys can be any type. */
  mapDemo(): void {
    section("mapDemo");
    const ports = new Map<string, number>();
    ports.set("chromium", 1);
    ports.set("firefox", 2);
    console.log(ports.get("firefox")); // => 2
    console.log(ports.get("webkit")); // => undefined
    console.log(ports.size); // => 2
    console.log(ports.has("webkit")); // => false
    console.log(ports); // => Map(2) { 'chromium' => 1, 'firefox' => 2 }
    ports.delete("chromium");
    console.log(ports.size); // => 1
  }

  /** Looping over a Map gives [key, value] pairs. */
  mapIteration(): void {
    section("mapIteration");
    const ports = new Map<string, number>([
      ["chromium", 1],
      ["firefox", 2],
    ]);
    for (const [browser, port] of ports) {
      console.log(browser, "->", port); // => chromium -> 1 ~~ firefox -> 2
    }
  }

  /** Set: duplicates are dropped automatically. */
  setDemo(): void {
    section("setDemo");
    const ids = new Set<number>([1, 2, 2, 3, 3, 3]);
    console.log(ids); // => Set(3) { 1, 2, 3 }
    console.log(ids.size); // => 3
    ids.add(4);
    console.log(ids.has(4)); // => true
    ids.delete(1);
    console.log(ids.has(1)); // => false
  }

  /** Classic trick: remove duplicates from an array using a Set. */
  removeDuplicates(): void {
    section("removeDuplicates");
    const withDuplicates: number[] = [1, 1, 2, 3, 3];
    const unique: number[] = [...new Set(withDuplicates)];
    console.log(unique); // => [ 1, 2, 3 ]
    console.log(unique.length); // => 3
  }

  /** Which collection when? A quick summary. */
  whichOneToUse(): void {
    section("whichOneToUse");
    console.log("Array  -> ordered list, access by position  : ['a', 'b'][0]");
    console.log("Object -> a thing with named fields         : { name: 'Paari' }.name");
    console.log("Map    -> look up by key, keys of any type  : map.get('key')");
    console.log("Set    -> unique values only                : new Set([1, 1, 2])");
    // => Array  -> ordered list, access by position  : ['a', 'b'][0]
  }

  runAll(): void {
    this.objectDemo();
    this.objectKeysValuesEntries();
    this.mapDemo();
    this.mapIteration();
    this.setDemo();
    this.removeDuplicates();
    this.whichOneToUse();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new CollectionsDemo().runAll();
//   One scenario only  : new CollectionsDemo().setDemo();
// ---------------------------------------------------------------
new CollectionsDemo().runAll();
