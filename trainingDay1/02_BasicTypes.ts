export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 2: BASIC TYPES
 *
 * A type tells TypeScript what KIND of value a variable may hold.
 *
 *   string   text                       "Paari"
 *   number   any number                 25   3.14   -7
 *   boolean  true or false              true
 *   null     empty on purpose           null
 *   undefined no value yet              undefined
 *   any      checker OFF                avoid
 *   unknown  anything, must check first
 *
 * Run this file:  npx tsx training/day2/02_BasicTypes.ts
 */
class BasicTypes {
  /** string: text inside single quotes, double quotes or backticks. */
  stringType(): void {
    section("stringType");
    const single: string = 'Hello';
    const double: string = "World";
    const template: string = `${single} ${double}`; // backticks allow ${variables}
    console.log(template); // => Hello World
    console.log(template.length); // => 11
  }

  /**
   * number: whole numbers and decimals share ONE type.
   *
   *   42    [ number ]
   *   3.14  [ number ]     (there is no separate int / float)
   */
  numberType(): void {
    section("numberType");
    const whole: number = 42;
    const decimal: number = 3.14;
    const negative: number = -7;
    const big: number = 1_000_000; // underscores are just for reading
    console.log(typeof whole, typeof decimal); // => number number
    console.log(negative, big); // => -7 1000000
    console.log(whole + decimal); // => 45.14
  }

  /** boolean: only two possible values. Comparisons produce booleans. */
  booleanType(): void {
    section("booleanType");
    const isLoggedIn: boolean = true;
    const isAdmin: boolean = false;
    console.log(isLoggedIn && isAdmin); // => false
    console.log(isLoggedIn || isAdmin); // => true
    console.log(5 > 3); // => true
  }

  /**
   * null = "I deliberately put nothing here".
   * Note the famous JavaScript quirk: typeof null says "object".
   */
  nullType(): void {
    section("nullType");
    const selectedBrowser: string | null = null; // "string OR null"
    console.log(selectedBrowser); // => null
    console.log(typeof selectedBrowser); // => object
  }

  /**
   * undefined = "no value was given yet".
   * You get it from: a variable never assigned, a missing property, a function that returns nothing.
   */
  undefinedType(): void {
    section("undefinedType");
    let notAssigned: string | undefined;
    console.log(notAssigned); // => undefined
    const settings: { timeout?: number } = {}; // timeout is optional
    console.log(settings.timeout); // => undefined
    const list: string[] = ["a"];
    console.log(list[5]); // => undefined   (index 5 does not exist)
  }

  /** any: checker OFF. Compiles anything, fails at run time. Avoid. */
  anyType(): void {
    section("anyType");
    let data: any = "text";
    data = 42;
    data = [1, 2, 3];
    console.log(typeof data, Array.isArray(data)); // => object true
  }

  /** unknown: safe version of any. You must prove the type before using the value. */
  unknownType(): void {
    section("unknownType");
    const input: unknown = 42;
    if (typeof input === "number") {
      console.log(input + 1); // => 43
    }
    if (typeof input === "string") {
      console.log("never printed"); // skipped: input is a number
    }
  }

  /** typeof tells you the type of a value at run time. */
  typeofCheck(): void {
    section("typeofCheck");
    console.log(typeof "text"); // => string
    console.log(typeof 42); // => number
    console.log(typeof true); // => boolean
    console.log(typeof undefined); // => undefined
    console.log(typeof null); // => object
    console.log(typeof [1, 2]); // => object
    console.log(Array.isArray([1, 2])); // => true
    console.log(typeof (() => 1)); // => function
  }

  /** Union type: a variable that may hold one of several types. */
  unionType(): void {
    section("unionType");
    let id: string | number = 101;
    console.log(typeof id); // => number
    id = "A-101";
    console.log(typeof id); // => string
    if (typeof id === "string") {
      console.log(id.toLowerCase()); // => a-101
    }
  }

  /** number has some surprises every tester should know. */
  numberQuirks(): void {
    section("numberQuirks");
    console.log(0.1 + 0.2); // => 0.30000000000000004
    console.log(10 / 0); // => Infinity
    const notANumber: number = Number("abc");
    console.log(notANumber); // => NaN
    console.log(notANumber === notANumber); // => false   (NaN is never equal to itself)
    console.log(Number.isNaN(notANumber)); // => true     (the correct check)
  }

  /** The big win of TypeScript: wrong values are caught BEFORE you run the code. */
  typeMismatch(): void {
    section("typeMismatch");
    // ERROR-DEMO: let age: number = "25"; // @ERR  string is not assignable to number
    // ERROR-DEMO: let title: string = 42; // @ERR  number is not assignable to string
    // ERROR-DEMO: let flag: boolean = "true"; // @ERR  string is not assignable to boolean
    console.log("Un-comment an ERROR-DEMO line to see the red underline in VS Code");
    // => Un-comment an ERROR-DEMO line to see the red underline in VS Code
  }

  runAll(): void {
    this.stringType();
    this.numberType();
    this.booleanType();
    this.nullType();
    this.undefinedType();
    this.anyType();
    this.unknownType();
    this.typeofCheck();
    this.unionType();
    this.numberQuirks();
    this.typeMismatch();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new BasicTypes().runAll();
//   One scenario only  : new BasicTypes().nullType();
// ---------------------------------------------------------------
new BasicTypes().runAll();
