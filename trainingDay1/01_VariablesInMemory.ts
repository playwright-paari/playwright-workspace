export {}; // makes this file a "module", so names here never clash with other files

// Prints a heading so the output of each scenario is easy to find.
function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 1: VARIABLES IN MEMORY
 *
 * A variable is a LABELLED BOX in memory.
 *   let   -> a box you can refill with a new value
 *   const -> a locked box: the label can never point to something else
 *
 * Run this file:  npx tsx training/day2/01_VariablesInMemory.ts
 */
class VariablesInMemory {
  /**
   * let: the value CAN change.
   *
   *   age = 25            age = 26
   *   age [ 25 ]   --->   age [ 26 ]      same box, new value
   */
  letDemo(): void {
    section("letDemo");
    let age: number = 25;
    console.log("age is", age); // => age is 25
    age = 26; // refill the same box
    console.log("age is now", age); // => age is now 26
  }

  /**
   * const: the value CANNOT be re-assigned.
   *
   *   PI [ 3.14 ]  (locked)   PI = 3.15  -> compile error
   *
   * Rule of thumb: use const by default, let only when the value must change.
   */
  constDemo(): void {
    section("constDemo");
    const PI: number = 3.14;
    console.log("PI is", PI); // => PI is 3.14
    console.log("PI is", PI);
    // ERROR-DEMO: PI = 3.15; // @ERR  "Cannot assign to 'PI' because it is a constant."
  }

  /**
   * number and string variables.
   *
   *   count    [ 10 ]        type: number
   *   userName [ "Paari" ]   type: string
   */
  numberAndString(): void {
    section("numberAndString");
    const count: number = 10;
    const userName: string = "Paari";
    console.log(count, typeof count); // => 10 number
    console.log(userName, typeof userName); // => Paari string
    console.log(userName.length); // => 5
  }

  /**
   * Type inference: you do not have to write the type.
   * TypeScript looks at the first value and "locks" the type.
   */
  typeInference(): void {
    section("typeInference");
    let city = "Chennai"; // TypeScript decides: string
    console.log(city, typeof city); // => Chennai string
    // ERROR-DEMO: city = 100; // @ERR  number is not assignable to string
  }

  /**
   * any = "turn the type checker OFF for this variable".
   * Flexible, but TypeScript can no longer protect you. Avoid it.
   */
  anyDemo(): void {
    section("anyDemo");
    let flexible: any = 10;
    console.log(typeof flexible); // => number
    flexible = "now text";
    console.log(typeof flexible); // => string
    flexible = true;
    console.log(typeof flexible); // => boolean
    try {
      flexible.toUpperCase(); // compiles fine because of any, but booleans have no toUpperCase
    } catch {
      console.log("Crash at run time - TypeScript did not warn you"); // => Crash at run time - TypeScript did not warn you
    }
  }

  /**
   * unknown = "could be anything, but you must CHECK before you use it".
   * The safe alternative to any.
   */
  unknownDemo(): void {
    section("unknownDemo");
    const value: unknown = "hello";
    // ERROR-DEMO: console.log(value.toUpperCase()); // @ERR  value is of type 'unknown'
    if (typeof value === "string") {
      console.log(value.toUpperCase()); // => HELLO   (safe: we checked first)
    }
  }

  /**
   * Numbers, strings and booleans are COPIED when you assign them.
   *
   *   let b = a;            b = 20;
   *   a [ 10 ]              a [ 10 ]   <- untouched
   *   b [ 10 ]  (a copy)    b [ 20 ]
   */
  primitivesAreCopied(): void {
    section("primitivesAreCopied");
    let a: number = 10;
    let b: number = a; // b gets its own copy of 10
    b = 20;
    console.log("a =", a, "b =", b); // => a = 10 b = 20
  }

  /**
   * Arrays and objects are SHARED, not copied. The variable only holds an address.
   *
   *   STACK (labels)            HEAP (the real data)
   *   x  ------------------+
   *                         +--->  [ 1, 2 ]
   *   y  ------------------+
   *
   *   y.push(3)  changes the one shared array, so x sees [ 1, 2, 3 ] too.
   *   To get a real copy use the spread:  const z = [...x];
   */
  objectsShareReference(): void {
    section("objectsShareReference");
    const x: number[] = [1, 2];
    const y: number[] = x; // same address, NOT a copy
    y.push(3);
    console.log(x.length, y.length); // => 3 3
    console.log(x === y); // => true
    const z: number[] = [...x]; // a real copy in a new place in memory
    z.push(4);
    console.log(x.length, z.length); // => 3 4
  }

  /**
   * Naming rules: letters, digits, _ and $. Cannot start with a digit. No spaces.
   * Names are case-sensitive. Course style: camelCase.
   */
  namingRules(): void {
    section("namingRules");
    let age = 1;
    let Age = 2; // different name from "age"
    console.log(age, Age); // => 1 2
    const userName = "camelCase";
    const _id = 7;
    const $price = 99.5;
    console.log(userName, _id, $price); // => camelCase 7 99.5
    // ERROR-DEMO: let 1stName = "x"; // @ERR  a name cannot start with a digit
  }

  runAll(): void {
    this.letDemo();
    this.constDemo();
    this.numberAndString();
    this.typeInference();
    this.anyDemo();
    this.unknownDemo();
    this.primitivesAreCopied();
    this.objectsShareReference();
    this.namingRules();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new VariablesInMemory().runAll();
//   One scenario only  : new VariablesInMemory().letDemo();
// Comment one line out, un-comment the other, save, run again.
// ---------------------------------------------------------------
new VariablesInMemory().runAll();
