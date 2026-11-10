export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 6: ARRAYS - a row of numbered boxes
 *
 *   const browsers = ["chromium", "firefox", "webkit"];
 *
 *   STACK                  HEAP (values sit side by side)
 *   browsers  ----------->  index 0        index 1       index 2       index 3
 *                          +------------+-------------+-------------+ - - - - - -+
 *                          | "chromium" | "firefox"   | "webkit"    |  (nothing) |
 *                          +------------+-------------+-------------+ - - - - - -+
 *   length = 3             last index = length - 1 = 2      browsers[3] -> undefined
 *
 * Simple mental model: the engine is smarter than this picture, but it is enough to
 * understand index, length and why reading a missing index gives undefined.
 *
 * Run this file:  npx tsx training/day2/06_ArraysDemo.ts
 */
class ArraysDemo {
  /** Create an array and read items by index (starts at 0). */
  createAndRead(): void {
    section("createAndRead");
    const browsers: string[] = ["chromium", "firefox", "webkit"];
    console.log(browsers[0]); // => chromium
    console.log(browsers[2]); // => webkit
    console.log(browsers); // => [ 'chromium', 'firefox', 'webkit' ]
  }

  /** length = number of items.  Last item = array[length - 1]. */
  indexAndLength(): void {
    section("indexAndLength");
    const browsers: string[] = ["chromium", "firefox", "webkit"];
    console.log(browsers.length); // => 3
    console.log(browsers[browsers.length - 1]); // => webkit
    console.log(browsers.at(-1)); // => webkit
  }

  /**
   * Asking for an index that has no box gives undefined. It does NOT crash.
   * (TypeScript still says the type is string, so be careful.)
   */
  outOfRange(): void {
    section("outOfRange");
    const browsers: string[] = ["chromium", "firefox", "webkit"];
    console.log(browsers[3]); // => undefined
    console.log(browsers[-1]); // => undefined
  }

  /**
   * push adds at the END, pop removes from the END.
   *
   *   [ a, b, c ]  --push("d")-->  [ a, b, c, d ]  --pop()-->  [ a, b, c ]
   */
  pushPop(): void {
    section("pushPop");
    const browsers: string[] = ["chromium", "firefox", "webkit"];
    browsers.push("edge");
    console.log(browsers); // => [ 'chromium', 'firefox', 'webkit', 'edge' ]
    const removed = browsers.pop();
    console.log(removed); // => edge
    console.log(browsers.length); // => 3
  }

  /** shift removes from the START, unshift adds at the START (all items move). */
  shiftUnshift(): void {
    section("shiftUnshift");
    const queue: number[] = [10, 20, 30];
    queue.unshift(5);
    console.log(queue); // => [ 5, 10, 20, 30 ]
    const first = queue.shift();
    console.log(first); // => 5
    console.log(queue); // => [ 10, 20, 30 ]
  }

  /** Change one item by its index. */
  updateByIndex(): void {
    section("updateByIndex");
    const browsers: string[] = ["chromium", "firefox", "webkit"];
    browsers[1] = "ff";
    console.log(browsers); // => [ 'chromium', 'ff', 'webkit' ]
  }

  /** includes -> true/false.  indexOf -> position, or -1 when not found. */
  searching(): void {
    section("searching");
    const browsers: string[] = ["chromium", "firefox", "webkit"];
    console.log(browsers.includes("firefox")); // => true
    console.log(browsers.indexOf("webkit")); // => 2
    console.log(browsers.indexOf("safari")); // => -1
  }

  /**
   * slice(start, end) makes a COPY of part of the array (original unchanged).
   * splice(start, count) REMOVES items from the original array.
   */
  sliceAndSplice(): void {
    section("sliceAndSplice");
    const letters: string[] = ["a", "b", "c", "d", "e"];
    console.log(letters.slice(1, 3)); // => [ 'b', 'c' ]
    console.log(letters); // => [ 'a', 'b', 'c', 'd', 'e' ]
    letters.splice(1, 2); // remove 2 items starting at index 1
    console.log(letters); // => [ 'a', 'd', 'e' ]
  }

  /** map, filter, find, reduce: the array methods used all the time in test code. */
  mapFilterFind(): void {
    section("mapFilterFind");
    const numbers: number[] = [1, 2, 3, 4];
    console.log(numbers.map((n) => n * 2)); // => [ 2, 4, 6, 8 ]
    console.log(numbers.filter((n) => n % 2 === 0)); // => [ 2, 4 ]
    console.log(numbers.find((n) => n > 2)); // => 3
    console.log(numbers.reduce((sum, n) => sum + n, 0)); // => 10
  }

  /** Number arrays: add the marks. */
  numberArray(): void {
    section("numberArray");
    const marks: number[] = [80, 90, 70];
    console.log(marks[0] + marks[1] + marks[2]); // => 240
    console.log(marks.length); // => 3
  }

  /**
   * Tuple: fixed length, and a fixed type for EACH position.
   *
   *   user = [ "Paari" , 25 ]
   *            index 0    index 1
   *            string     number
   */
  tuple(): void {
    section("tuple");
    const user: [string, number] = ["Paari", 25];
    console.log(user[0], user[1]); // => Paari 25
    // ERROR-DEMO: const bad: [string, number] = [25, "Paari"]; // @ERR  wrong order of types
  }

  /**
   * Why can we push into a const array?
   * const locks the LABEL to this one array. The items INSIDE can still change.
   *
   *   browsers  ---->  [ ... ]   (label cannot move, contents can change)
   */
  constArrayMutation(): void {
    section("constArrayMutation");
    const browsers: string[] = ["chromium"];
    browsers.push("firefox"); // allowed
    console.log(browsers.length); // => 2
    // ERROR-DEMO: browsers = ["other"]; // @ERR  cannot point the const label at a new array
  }

  runAll(): void {
    this.createAndRead();
    this.indexAndLength();
    this.outOfRange();
    this.pushPop();
    this.shiftUnshift();
    this.updateByIndex();
    this.searching();
    this.sliceAndSplice();
    this.mapFilterFind();
    this.numberArray();
    this.tuple();
    this.constArrayMutation();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new ArraysDemo().runAll();
//   One scenario only  : new ArraysDemo().pushPop();
// ---------------------------------------------------------------
new ArraysDemo().runAll();
