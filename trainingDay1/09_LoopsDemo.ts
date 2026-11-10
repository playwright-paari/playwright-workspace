export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 9: LOOPS - repeating work
 *
 *   for (start; keepGoingWhile; afterEachRound) { ... }
 *
 *   for (let i = 0; i < 3; i++)
 *        |        |       |
 *     start     check    step
 *
 *   round 1: i = 0  (0 < 3 yes)  run  then i becomes 1
 *   round 2: i = 1  (1 < 3 yes)  run  then i becomes 2
 *   round 3: i = 2  (2 < 3 yes)  run  then i becomes 3
 *   round 4: i = 3  (3 < 3 NO)   stop
 *
 * Run this file:  npx tsx training/day2/09_LoopsDemo.ts
 */
class LoopsDemo {
  /** Classic for loop. i starts at 0 because array indexes start at 0. */
  forLoop(): void {
    section("forLoop");
    for (let i = 0; i < 3; i++) {
      console.log("i =", i); // => i = 0 ~~ i = 1 ~~ i = 2
    }
  }

  /** while: repeat as long as the condition is true. Make sure something changes, or it never ends. */
  whileLoop(): void {
    section("whileLoop");
    let n: number = 3;
    while (n > 0) {
      console.log("n =", n); // => n = 3 ~~ n = 2 ~~ n = 1
      n--;
    }
  }

  /** do...while: runs the body at least ONCE, then checks the condition. */
  doWhileLoop(): void {
    section("doWhileLoop");
    let attempts: number = 0;
    do {
      attempts++;
      console.log("attempt", attempts); // => attempt 1
    } while (attempts < 1);
  }

  /** for...of: take each ITEM of an array, one by one. The easiest way to loop an array. */
  forOfLoop(): void {
    section("forOfLoop");
    const browsers: string[] = ["chromium", "firefox", "webkit"];
    for (const browser of browsers) {
      console.log(browser); // => chromium ~~ firefox ~~ webkit
    }
  }

  /** Need the index too? Use entries(). */
  forOfWithIndex(): void {
    section("forOfWithIndex");
    const browsers: string[] = ["chromium", "firefox"];
    for (const [index, browser] of browsers.entries()) {
      console.log(index, browser); // => 0 chromium ~~ 1 firefox
    }
  }

  /** for...in: loop over the KEYS of an object. */
  forInLoop(): void {
    section("forInLoop");
    const person = { name: "Paari", age: 25 };
    for (const key in person) {
      console.log(key); // => name ~~ age
    }
  }

  /** forEach: the array's own loop method, takes a function. */
  forEachMethod(): void {
    section("forEachMethod");
    ["a", "b"].forEach((item, index) => {
      console.log(index, item); // => 0 a ~~ 1 b
    });
  }

  /**
   * break stops the loop completely. continue skips just this round.
   *
   *   i = 1  print
   *   i = 2  continue  (skip)
   *   i = 3  print
   *   i = 4  break     (stop everything)
   */
  breakAndContinue(): void {
    section("breakAndContinue");
    for (let i = 1; i <= 5; i++) {
      if (i === 2) {
        continue;
      }
      if (i === 4) {
        break;
      }
      console.log("i =", i); // => i = 1 ~~ i = 3
    }
  }

  /** Add the numbers 1 to 5 with a running total. */
  sumOfNumbers(): void {
    section("sumOfNumbers");
    let sum: number = 0;
    for (let i = 1; i <= 5; i++) {
      sum += i;
    }
    console.log("sum =", sum); // => sum = 15
  }

  /** A loop inside a loop: the inner loop completes fully for each round of the outer loop. */
  nestedLoops(): void {
    section("nestedLoops");
    for (let row = 1; row <= 2; row++) {
      for (let col = 1; col <= 3; col++) {
        console.log(`row ${row} col ${col}`); // => row 1 col 1 ~~ row 1 col 3 ~~ row 2 col 1 ~~ row 2 col 3
      }
    }
  }

  runAll(): void {
    this.forLoop();
    this.whileLoop();
    this.doWhileLoop();
    this.forOfLoop();
    this.forOfWithIndex();
    this.forInLoop();
    this.forEachMethod();
    this.breakAndContinue();
    this.sumOfNumbers();
    this.nestedLoops();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new LoopsDemo().runAll();
//   One scenario only  : new LoopsDemo().breakAndContinue();
// ---------------------------------------------------------------
new LoopsDemo().runAll();
