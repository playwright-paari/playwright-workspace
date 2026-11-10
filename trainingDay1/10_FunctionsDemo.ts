export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 10: FUNCTIONS - reusable steps
 *
 * A function takes INPUTS (parameters), does some work, and gives back an OUTPUT (return value).
 *
 *             +-------------------+
 *   2, 3 ---> |  add(a, b)        | ---> 5
 *             |  return a + b     |
 *             +-------------------+
 *   inputs                          output
 *
 * Types go on both: the inputs  (a: number)  and the output  ): number.
 *
 * Run this file:  npx tsx training/day2/10_FunctionsDemo.ts
 */
class FunctionsDemo {
  /** Function declaration: the classic way. */
  declaration(): void {
    section("declaration");
    function add(a: number, b: number): number {
      return a + b;
    }
    console.log(add(2, 3)); // => 5
  }

  /** Arrow function: a shorter way to write the same idea. Used everywhere in Playwright. */
  arrowFunction(): void {
    section("arrowFunction");
    const multiply = (a: number, b: number): number => a * b;
    console.log(multiply(2, 3)); // => 6
    const square = (n: number): number => n * n; // one expression: no braces, no return keyword
    console.log(square(4)); // => 16
  }

  /** Default parameter: used when the caller does not pass a value. */
  defaultParameter(): void {
    section("defaultParameter");
    const greet = (user: string, greeting: string = "Hello"): string => `${greeting}, ${user}!`;
    console.log(greet("Paari")); // => Hello, Paari!
    console.log(greet("Paari", "Welcome")); // => Welcome, Paari!
  }

  /** Optional parameter (?): may be left out. Inside the function its value is undefined then. */
  optionalParameter(): void {
    section("optionalParameter");
    const fullName = (first: string, last?: string): string => (last ? `${first} ${last}` : first);
    console.log(fullName("Paari")); // => Paari
    console.log(fullName("Paari", "Chandrasekaran")); // => Paari Chandrasekaran
  }

  /** Rest parameter (...): collects any number of inputs into an array. */
  restParameter(): void {
    section("restParameter");
    const sum = (...numbers: number[]): number => numbers.reduce((total, n) => total + n, 0);
    console.log(sum(1, 2, 3)); // => 6
    console.log(sum()); // => 0
  }

  /** A function can return any type: string, boolean, array, object. */
  returnTypes(): void {
    section("returnTypes");
    const asText = (n: number): string => `Number ${n}`;
    const isPositive = (n: number): boolean => n > 0;
    const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1);
    const pair = (a: string, b: number): { name: string; age: number } => ({ name: a, age: b });
    console.log(asText(7)); // => Number 7
    console.log(isPositive(-1)); // => false
    console.log(range(3)); // => [ 1, 2, 3 ]
    console.log(pair("Paari", 25)); // => { name: 'Paari', age: 25 }
  }

  /** void: the function does something but returns nothing. The result is undefined. */
  voidFunction(): void {
    section("voidFunction");
    const logMessage = (message: string): void => {
      console.log("LOG:", message); // => LOG: saved
    };
    const result = logMessage("saved");
    console.log(result); // => undefined
  }

  /**
   * Functions are VALUES: store them in variables, pass them to other functions.
   * A function you pass in is called a CALLBACK.
   */
  functionAsValue(): void {
    section("functionAsValue");
    const double = (n: number): number => n * 2;
    const operation: (n: number) => number = double; // a variable that holds a function
    console.log(operation(5)); // => 10
    const applyTwice = (fn: (n: number) => number, value: number): number => fn(fn(value));
    console.log(applyTwice(double, 3)); // => 12
  }

  /**
   * Scope: a variable lives only inside the { } where it was declared.
   *
   *   function f() {
   *     let inside = 1;     <- exists only in here
   *   }
   *   inside  -> not visible outside
   */
  scope(): void {
    section("scope");
    const outer: string = "visible everywhere in this method";
    {
      const inner: string = "visible only inside these braces";
      console.log(inner); // => visible only inside these braces
    }
    console.log(outer); // => visible everywhere in this method
    // ERROR-DEMO: console.log(inner); // @ERR  inner does not exist out here
  }

  runAll(): void {
    this.declaration();
    this.arrowFunction();
    this.defaultParameter();
    this.optionalParameter();
    this.restParameter();
    this.returnTypes();
    this.voidFunction();
    this.functionAsValue();
    this.scope();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new FunctionsDemo().runAll();
//   One scenario only  : new FunctionsDemo().arrowFunction();
// ---------------------------------------------------------------
new FunctionsDemo().runAll();
