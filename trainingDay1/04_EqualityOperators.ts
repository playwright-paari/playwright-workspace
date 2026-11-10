export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 4: == versus ===
 *
 *   ==   loose  : converts the types first, then compares the values
 *   ===  strict : type AND value must both match, no conversion
 *
 * RULE FOR THIS COURSE:  always use ===  and  !==.   Never use ==  or  !=.
 *
 * Note: the values below are typed `any` on purpose. With normal types,
 * TypeScript already refuses to compare a number with a string.
 *
 * Run this file:  npx tsx training/day2/04_EqualityOperators.ts
 */
class EqualityOperators {
  /**
   * == converts first.
   *
   *   5  == "5"   ->  "5" is turned into 5  ->  5 == 5  ->  true
   */
  looseEquality(): void {
    section("looseEquality");
    const n: any = 5;
    const s: any = "5";
    console.log(n == s); // => true
  }

  /**
   * === never converts.
   *
   *   5  [ number ]     "5" [ string ]    different types -> false
   */
  strictEquality(): void {
    section("strictEquality");
    const n: any = 5;
    const s: any = "5";
    console.log(n === s); // => false
  }

  /** Same type and same value: === says true. */
  sameTypeSameValue(): void {
    section("sameTypeSameValue");
    const letter: string = "a";
    console.log(5 === 5); // => true
    console.log("5" === "5"); // => true
    console.log(letter === "A"); // => false   (case matters)
  }

  /**
   * Surprising results of == (the reason we avoid it).
   * Every line below is "true" with ==, and "false" with ===.
   */
  looseEqualityTraps(): void {
    section("looseEqualityTraps");
    const zero: any = 0;
    const empty: any = "";
    const no: any = false;
    console.log(zero == empty); // => true    (0 equals empty text?!)
    console.log(zero == no); // => true
    console.log(empty == no); // => true
    console.log(zero === empty); // => false
    console.log(zero === no); // => false
  }

  /** null and undefined: loosely equal, strictly different. */
  nullAndUndefined(): void {
    section("nullAndUndefined");
    const nothing: any = null;
    const notSet: any = undefined;
    console.log(nothing == notSet); // => true
    console.log(nothing === notSet); // => false
  }

  /** The + and - operators also convert types, which causes the same kind of surprises. */
  numberStringTraps(): void {
    section("numberStringTraps");
    const text: any = "5";
    console.log(text + 3); // => 53   (+ joins text)
    console.log(text - 3); // => 2    (- must be maths, so "5" becomes 5)
  }

  /** != versus !== follows the same rule. */
  inequality(): void {
    section("inequality");
    const n: any = 5;
    const s: any = "5";
    console.log(n != s); // => false   (loosely: they are "equal")
    console.log(n !== s); // => true    (strictly: different types)
  }

  /**
   * Objects and arrays are compared by ADDRESS, not by content.
   *
   *   a --> { x: 1 }       b --> { x: 1 }       two different boxes in memory
   *   c ------^ (same box as a)
   *
   *   a === b  false     (different addresses)
   *   a === c  true      (same address)
   */
  objectsCompareByAddress(): void {
    section("objectsCompareByAddress");
    const a = { x: 1 };
    const b = { x: 1 };
    const c = a;
    console.log(a === b); // => false
    console.log(a === c); // => true
    console.log(JSON.stringify(a) === JSON.stringify(b)); // => true   (compare the CONTENT instead)
  }

  /** With real types, TypeScript refuses silly comparisons before you even run. */
  typescriptHelps(): void {
    section("typescriptHelps");
    const x: number = 5;
    const y: string = "5";
    // ERROR-DEMO: console.log(x === y); // @ERR  number and string have no overlap
    console.log(String(x) === y); // => true   (convert on purpose, then compare)
  }

  runAll(): void {
    this.looseEquality();
    this.strictEquality();
    this.sameTypeSameValue();
    this.looseEqualityTraps();
    this.nullAndUndefined();
    this.numberStringTraps();
    this.inequality();
    this.objectsCompareByAddress();
    this.typescriptHelps();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new EqualityOperators().runAll();
//   One scenario only  : new EqualityOperators().looseEqualityTraps();
// ---------------------------------------------------------------
new EqualityOperators().runAll();
