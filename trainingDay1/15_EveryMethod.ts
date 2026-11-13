export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 15: THE every() METHOD
 *
 * every = "do ALL items pass my test?"   Answer: true or false.
 *
 *   [10, 20, 30, 40].every((n) => n >= 10)
 *                             \_________/
 *                             the test, asked about EACH item
 *
 *   10 >= 10 ? yes
 *   20 >= 10 ? yes
 *   30 >= 10 ? yes      -> all yes -> true
 *   40 >= 10 ? yes
 *
 *   ONE "no" is enough to give false (it stops checking at the first "no").
 *
 * Java: allMatch
 *
 * Run this file: npx tsx trainingDay1/15_EveryMethod.ts
 */
class EveryMethod {
  /**
   * SCENARIO 1: all pass -> true.
   */
  allPass(): void {
    section("allPass");
    const marks: number[] = [10, 20, 30, 40];

    console.log(marks.every((n: number) => n >= 10)); // => true
    console.log(marks.every((n: number) => n > 0)); // => true
  }

  /**
   * SCENARIO 2: one fails -> false.
   *   10 > 10 is false, so every() answers false.
   */
  oneFails(): void {
    section("oneFails");
    const marks: number[] = [10, 20, 30, 40];

    console.log(marks.every((n: number) => n > 10)); // => false
    console.log(marks.every((n: number) => n < 40)); // => false
  }

  /**
   * SCENARIO 3: every() works on any type of array. Text example.
   */
  textArray(): void {
    section("textArray");
    const names: string[] = ["maya", "ravi", "anu"];

    console.log(names.every((name) => name.length > 2)); // => true
    console.log(names.every((name) => name.startsWith("m"))); // => false
    console.log(names.every((name) => name === name.toLowerCase())); // => true
  }

  /**
   * SCENARIO 4: array of objects. "Did every student pass?"
   */
  objectArray(): void {
    section("objectArray");
    const students = [
      { name: "Maya", marks: 80 },
      { name: "Ravi", marks: 45 },
      { name: "Anu", marks: 90 },
    ];

    console.log(students.every((s) => s.marks >= 40)); // => true
    console.log(students.every((s) => s.marks >= 50)); // => false   (Ravi has 45)
  }

  /**
   * SCENARIO 5: EMPTY array -> always true.
   * Nothing failed, so "all items pass" is true. Surprising, but it is the rule.
   */
  emptyArray(): void {
    section("emptyArray");
    const empty: number[] = [];

    console.log(empty.every((n) => n > 100)); // => true
    console.log(empty.every((n) => n < 0)); // => true
  }

  /**
   * SCENARIO 6: it stops at the first failure (look at the printed lines).
   */
  stopsEarly(): void {
    section("stopsEarly");
    const marks: number[] = [50, 5, 70, 80];

    const result = marks.every((n) => {
      console.log("checking", n); // => checking 50 ~~ checking 5
      return n >= 10;
    });
    console.log(result); // => false   (70 and 80 were never checked)
  }

  /**
   * SCENARIO 7: every vs some.
   *   every = ALL must pass      some = AT LEAST ONE must pass
   */
  everyVsSome(): void {
    section("everyVsSome");
    const marks: number[] = [10, 20, 30, 40];

    console.log(marks.every((n) => n > 30)); // => false
    console.log(marks.some((n) => n > 30)); // => true
  }

  /**
   * SCENARIO 8: every() with filter.
   * After filter, ask: "is everything left good?"
   */
  everyAfterFilter(): void {
    section("everyAfterFilter");
    const marks: number[] = [10, 25, 30, 45];
    const bigOnes = marks.filter((n) => n > 20);

    console.log(bigOnes); // => [ 25, 30, 45 ]
    console.log(bigOnes.every((n) => n > 20)); // => true
  }

  /**
   * SCENARIO 9: the test must return true or false.
   * Forgetting  return  inside { } gives undefined for every item -> every() says false.
   */
  forgottenReturn(): void {
    section("forgottenReturn");
    const marks: number[] = [10, 20, 30, 40];

    const wrong = marks.every((n) => {
      n >= 10; // no return!
    });
    const right = marks.every((n) => {
      return n >= 10;
    });
    console.log(wrong); // => false
    console.log(right); // => true
  }

  /**
   * SCENARIO 10: where you may use it in Playwright tests (text only, nothing runs here).
   */
  inPlaywright(): void {
    section("inPlaywright");
    console.log("const texts = await page.locator('li').allTextContents();");
    console.log("expect(texts.every((t) => t.trim() !== '')).toBe(true);");
    // => expect(texts.every((t) => t.trim() !== '')).toBe(true);
  }

  runAll(): void {
    this.allPass();
    this.oneFails();
    this.textArray();
    this.objectArray();
    this.emptyArray();
    this.stopsEarly();
    this.everyVsSome();
    this.everyAfterFilter();
    this.forgottenReturn();
    this.inPlaywright();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new EveryMethod().runAll();
//   One scenario only  : new EveryMethod().emptyArray();
// ---------------------------------------------------------------
new EveryMethod().runAll();