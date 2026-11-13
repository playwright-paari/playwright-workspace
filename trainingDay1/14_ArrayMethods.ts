export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 14: ARRAY METHODS (loops over arrays)
 *
 * An array is a list of items. These tools let you work on EVERY item without writing a long loop.
 *
 *   forEach  -> do something with each item         returns nothing
 *   map      -> change each item                    returns a NEW array
 *   filter   -> keep some items                     returns a NEW array
 *   reduce   -> combine all items into ONE value    returns one value
 *   some     -> does ANY item pass?                 true / false
 *   every    -> do ALL items pass?                  true / false
 *
 * The original array is never changed by map, filter, reduce, some or every.
 *
 * Run this file: npx tsx trainingDay1/14_ArrayMethods.ts
 */
class ArrayMethods {
  /**
   * DO...WHILE: runs the code FIRST, then checks the condition.
   * So it always runs at least once. (A normal while checks first.)
   *
   *   do { code } while (condition);
   */
  doWhileLoop(): void {
    section("doWhileLoop");
    let count: number = 0;
    do {
      console.log(count); // => 0 ~~ 1 ~~ 2 ~~ 3 ~~ 4
      count++;
    } while (count < 5);

    let n: number = 10;
    do {
      console.log("runs once even though 10 < 5 is false"); // => runs once even though 10 < 5 is false
      n++;
    } while (n < 5);
  }

  /**
   * FOREACH: goes through every item. Gives back nothing.
   *   (fruit, index) => ...   fruit = the item, index = its position (starts at 0)
   *
   * Remember:
   *   - you cannot use break or continue inside forEach. Use for...of when you need them.
   *   - forEach does NOT wait for async/await. Use for...of (or Promise.all) for that.
   */
  forEachLoop(): void {
    section("forEachLoop");
    const fruits: string[] = ["apple", "banana", "cherry"];

    fruits.forEach((fruit: string, index: number) => {
      console.log(index, fruit); // => 0 apple ~~ 1 banana ~~ 2 cherry
    });

    // for...of CAN stop early with break
    for (const fruit of fruits) {
      if (fruit === "banana") {
        break;
      }
      console.log("for...of:", fruit); // => for...of: apple
    }
    // ERROR-DEMO: fruits.forEach((fruit) => { break; }); // @ERR  break is not allowed inside forEach
  }

  /**
   * TYPE INFERENCE vs TYPE ANNOTATION. Both give number[].
   *
   *   const marks2 = [10, 20, 30, 40];            TypeScript GUESSES the type   (Java: var)
   *   const marks1: number[] = [10, 20, 30, 40];  YOU write the type
   *
   * Write the type yourself when:
   *   - the array starts empty:  const a: number[] = [];
   *   - you want the compiler to catch wrong values.
   */
  inferenceVsAnnotation(): void {
    section("inferenceVsAnnotation");
    const marks2 = [10, 20, 30, 40];
    const marks1: number[] = [10, 20, 30, 40];
    const empty: number[] = [];

    empty.push(5);
    console.log(marks1, marks2); // => [ 10, 20, 30, 40 ] [ 10, 20, 30, 40 ]
    console.log(empty); // => [ 5 ]
    // ERROR-DEMO: marks1.push("fifty"); // @ERR  text cannot go into a number array
  }

  /**
   * MAP: change every item. Gives back a NEW array. The original stays the same.
   *
   *   [10, 20, 30, 40]  --(n) => n * 2-->  [20, 40, 60, 80]
   *
   * Note: array.map() is NOT the same as the Map data structure (key-value pairs).
   * Java: Arrays.stream(marks1).map(n -> n * 2).toArray();
   */
  mapMethod(): void {
    section("mapMethod");
    const marks1: number[] = [10, 20, 30, 40];
    const result = marks1.map((n: number) => n * 2);

    console.log(result); // => [ 20, 40, 60, 80 ]
    console.log(marks1); // => [ 10, 20, 30, 40 ]   (original is not changed)
  }

  /**
   * FILTER: keep only the items that pass a test. Gives back a NEW array.
   *
   *   [10, 20, 30, 40]  --(n) => n > 20-->  [30, 40]
   *
   * You can chain methods: filter first, then map.
   * Java: Arrays.stream(marks1).filter(n -> n > 20).toArray();
   */
  filterMethod(): void {
    section("filterMethod");
    const marks1: number[] = [10, 20, 30, 40];
    const result = marks1.filter((n: number) => n > 20);

    console.log(result); // => [ 30, 40 ]
    console.log(marks1.filter((n) => n > 20).map((n) => n * 2)); // => [ 60, 80 ]
  }

  /**
   * REDUCE: turn the whole array into ONE value.
   *
   *   marks1.reduce((sum, value) => sum + value, 0)
   *                   |     |                     |
   *                   |     |                     +-- starting value
   *                   |     +-- the current item
   *                   +-- the running total so far
   *
   *   step 1:  sum = 0    value = 10   ->  10
   *   step 2:  sum = 10   value = 20   ->  30
   *   step 3:  sum = 30   value = 30   ->  60
   *   step 4:  sum = 60   value = 40   ->  100
   */
  reduceMethod(): void {
    section("reduceMethod");
    const marks1: number[] = [10, 20, 30, 40];
    const total = marks1.reduce((sum: number, value: number) => sum + value, 0);

    console.log(total); // => 100
  }

  /**
   * WHY a starting value?
   *   - it is where counting begins (opening balance, shipping cost ...)
   *   - without it, an EMPTY array crashes
   *   - it decides WHAT you are building (a number, a text, an object, an array)
   */
  reduceStartingValue(): void {
    section("reduceStartingValue");
    const marks1: number[] = [10, 20, 30, 40];

    console.log(marks1.reduce((sum, value) => sum + value, 0)); // => 100
    console.log(marks1.reduce((sum, value) => sum + value, 2)); // => 102
    console.log(marks1.reduce((sum, value) => sum + value, 1000)); // => 1100

    const letters: string[] = ["a", "b", "c"];
    console.log(letters.reduce((text, letter) => text + letter, "")); // => abc   (building a text, not a number)

    const empty: number[] = [];
    console.log(empty.reduce((sum, value) => sum + value, 0)); // => 0   (safe: the starting value is returned)
    try {
      empty.reduce((sum, value) => sum + value); // no starting value
    } catch (error) {
      console.log(error instanceof Error ? error.message : error); // => Reduce of empty array with no initial value
    }
  }

  /**
   * SUM: there is NO .sum() on arrays in TypeScript / JavaScript. Use reduce.
   * Java has it built in: Arrays.stream(marks1).sum();
   *
   * reduce or a for loop?
   *   - both work for a simple sum
   *   - reduce fits nicely in  .filter().map().reduce()  chains
   *   - a for loop is better when you need break, async/await, or long logic
   */
  sumOfArray(): void {
    section("sumOfArray");
    const sum = (arr: number[]): number => arr.reduce((acc, n) => acc + n, 0);

    console.log(sum([10, 20, 30, 40])); // => 100
    console.log(sum([])); // => 0

    let loopTotal: number = 0;
    for (const n of [10, 20, 30, 40]) {
      loopTotal += n;
    }
    console.log(loopTotal); // => 100   (same answer with a for loop)
    // ERROR-DEMO: [10, 20].sum(); // @ERR  arrays have no sum method
  }

  /**
   * SOME and EVERY: both answer true or false.
   *   some  = is there AT LEAST ONE item that passes?     (Java: anyMatch)
   *   every = do ALL items pass?                          (Java: allMatch)
   *
   * Empty array:  some -> false (nothing passed)   every -> true (nothing failed)
   */
  someAndEvery(): void {
    section("someAndEvery");
    const marks1: number[] = [10, 20, 30, 40];

    console.log(marks1.some((n: number) => n > 30)); // => true
    console.log(marks1.every((n: number) => n > 10)); // => false   (10 fails)
    console.log(marks1.every((n: number) => n >= 10)); // => true

    const empty: number[] = [];
    console.log(empty.some((n) => n > 0)); // => false
    console.log(empty.every((n) => n > 0)); // => true
  }

  /**
   * CHEAT SHEET
   */
  cheatSheet(): void {
    section("cheatSheet");
    console.log("forEach -> do something with each item, returns nothing");
    console.log("map     -> change each item, returns new array");
    console.log("filter  -> keep some items, returns new array");
    console.log("reduce  -> combine all items into one value");
    console.log("some    -> any item passes? true/false");
    console.log("every   -> all items pass? true/false");
    // => every   -> all items pass? true/false
  }

  runAll(): void {
    this.doWhileLoop();
    this.forEachLoop();
    this.inferenceVsAnnotation();
    this.mapMethod();
    this.filterMethod();
    this.reduceMethod();
    this.reduceStartingValue();
    this.sumOfArray();
    this.someAndEvery();
    this.cheatSheet();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new ArrayMethods().runAll();
//   One scenario only  : new ArrayMethods().mapMethod();
// ---------------------------------------------------------------
new ArrayMethods().runAll();