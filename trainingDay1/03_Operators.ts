export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 3: OPERATORS
 *
 * An operator is a symbol that does work on values.
 *   arithmetic  + - * / % **
 *   assignment  =  +=  -=  *=  /=
 *   comparison  >  <  >=  <=  ===  !==
 *   logical     &&  ||  !
 *
 * Run this file:  npx tsx training/day2/03_Operators.ts
 */
class Operators {
  /** Arithmetic with a = 10 and b = 3. */
  arithmetic(): void {
    section("arithmetic");
    const a: number = 10;
    const b: number = 3;
    console.log("add      ", a + b); // => add       13
    console.log("subtract ", a - b); // => subtract  7
    console.log("multiply ", a * b); // => multiply  30
    console.log("divide   ", a / b); // => divide    3.3333333333333335
  }

  /**
   * % gives the REMAINDER after dividing.
   *
   *   10 / 3 = 3 whole times, 1 left over   ->   10 % 3 = 1
   *
   * Classic use: even / odd check (n % 2 === 0 means even).
   */
  remainderEvenOdd(): void {
    section("remainderEvenOdd");
    console.log(10 % 3); // => 1
    console.log(8 % 2); // => 0
    console.log(7 % 2); // => 1
    const isEven = (n: number): boolean => n % 2 === 0;
    console.log(isEven(8), isEven(7)); // => true false
  }

  /** ** means "to the power of":  10 ** 3 = 10 x 10 x 10. */
  power(): void {
    section("power");
    console.log(10 ** 3); // => 1000
    console.log(2 ** 5); // => 32
  }

  /**
   * ++ adds 1, -- subtracts 1.
   *   i++  -> use the value first, THEN add 1   (post-increment)
   *   ++i  -> add 1 first, THEN use the value   (pre-increment)
   */
  incrementDecrement(): void {
    section("incrementDecrement");
    let i: number = 5;
    console.log(i++); // => 5   (printed 5, then i became 6)
    console.log(i); // => 6
    console.log(++i); // => 7   (i became 7, then printed)
    i--;
    console.log(i); // => 6
  }

  /** Short forms: x += 5 means x = x + 5. */
  assignmentOperators(): void {
    section("assignmentOperators");
    let x: number = 10;
    x += 5;
    console.log(x); // => 15
    x -= 3;
    console.log(x); // => 12
    x *= 2;
    console.log(x); // => 24
    x /= 4;
    console.log(x); // => 6
    x %= 4;
    console.log(x); // => 2
  }

  /** Comparison operators always give back true or false. */
  comparison(): void {
    section("comparison");
    const a: number = 10;
    const b: number = 3;
    console.log(a > b); // => true
    console.log(a < b); // => false
    console.log(a >= 10); // => true
    console.log(a <= 9); // => false
    console.log(a === 10); // => true
    console.log(a !== b); // => true
  }

  /**
   * Logical operators combine true/false values.
   *   &&  AND : both must be true
   *   ||  OR  : one is enough
   *   !   NOT : flips the value
   *
   * Truth table for A && B:   T&&T=T   T&&F=F   F&&T=F   F&&F=F
   */
  logicalOperators(): void {
    section("logicalOperators");
    const hasTicket: boolean = true;
    const isAdult: boolean = false;
    console.log(hasTicket && isAdult); // => false
    console.log(hasTicket || isAdult); // => true
    console.log(!hasTicket); // => false
  }

  /**
   * Short-circuit: || and && stop as soon as the answer is known.
   * || is often used to give a default value.
   */
  shortCircuit(): void {
    section("shortCircuit");
    const typedName: string = "";
    console.log(typedName || "Guest"); // => Guest   ("" is empty, so use the default)
    const loggedIn: boolean = true;
    console.log(loggedIn && "Welcome back"); // => Welcome back
  }

  /** Ternary: a one-line if/else.   condition ? valueIfTrue : valueIfFalse */
  ternary(): void {
    section("ternary");
    const age: number = 20;
    const category: string = age >= 18 ? "Adult" : "Minor";
    console.log(category); // => Adult
  }

  /**
   * ?? (nullish) and ?. (optional chaining) are used a LOT in Playwright code.
   *
   *   a || b   uses b when a is ANY falsy value (0, "", false ...)
   *   a ?? b   uses b ONLY when a is null or undefined
   */
  nullishAndOptional(): void {
    section("nullishAndOptional");
    const retries: number = 0;
    console.log(retries || 3); // => 3   (0 counted as "missing" - usually a bug)
    console.log(retries ?? 3); // => 0   (0 is a real value, kept)
    const user: { profile?: { city: string } } = {};
    console.log(user.profile?.city); // => undefined   (no crash, even though profile is missing)
  }

  /** + joins strings. Mixing a string and a number turns the result into a string. */
  stringOperator(): void {
    section("stringOperator");
    console.log("Play" + "wright"); // => Playwright
    console.log("Age: " + 25); // => Age: 25
  }

  runAll(): void {
    this.arithmetic();
    this.remainderEvenOdd();
    this.power();
    this.incrementDecrement();
    this.assignmentOperators();
    this.comparison();
    this.logicalOperators();
    this.shortCircuit();
    this.ternary();
    this.nullishAndOptional();
    this.stringOperator();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new Operators().runAll();
//   One scenario only  : new Operators().incrementDecrement();
// ---------------------------------------------------------------
new Operators().runAll();
