export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 4 - CLASS 1: ARROW FUNCTIONS
 *
 * An arrow function is a SHORTER way to write a function.
 *
 *   normal :  function add(a: number, b: number): number { return a + b; }
 *   arrow  :  const add = (a: number, b: number): number => a + b;
 *                         \_______ inputs _______/  \_ output _/    \_ what it gives back
 *
 * Read  =>  as "gives back".   (a, b) => a + b     means   "a and b give back a + b"
 *
 * Run this file: npx tsx trainingDay1/12_ArrowFunctions.ts
 */
class ArrowFunctions {
  /**
   * SCENARIO 1: the same function, written two ways.
   */
  normalVsArrow(): void {
    section("normalVsArrow");
    function addNormal(a: number, b: number): number {
      return a + b;
    }
    const addArrow = (a: number, b: number): number => a + b;

    console.log(addNormal(2, 3)); // => 5
    console.log(addArrow(2, 3)); // => 5
  }

  /**
   * SCENARIO 2: how many inputs?
   *
   *   no input      ()          =>  ...
   *   one input     (n)         =>  ...
   *   two inputs    (a, b)      =>  ...
   */
  numberOfInputs(): void {
    section("numberOfInputs");
    const sayHello = (): string => "Hello";
    const double = (n: number): number => n * 2;
    const add = (a: number, b: number): number => a + b;
    const add3 = (a: number, b: number, c: number): number => a + b + c;

    console.log(sayHello()); // => Hello
    console.log(double(4)); // => 8
    console.log(add(2, 3)); // => 5
    console.log(add3(1, 2, 3)); // => 6
    // ERROR-DEMO: double("4"); // @ERR  the input must be a number, not text
  }

  /**
   * SCENARIO 3: short body vs long body.
   *
   *   No { }  ->  the answer is returned for you         (n) => n * 2
   *   With { } ->  you MUST write  return  yourself       (n) => { return n * 2; }
   */
  shortBodyVsLongBody(): void {
    section("shortBodyVsLongBody");
    const shortWay = (n: number): number => n * 2;
    const longWay = (n: number): number => {
      return n * 2;
    };
    const evenOrOdd = (n: number): string => {
      if (n % 2 === 0) {
        return `${n} is even`;
      }
      return `${n} is odd`;
    };

    console.log(shortWay(5)); // => 10
    console.log(longWay(5)); // => 10
    console.log(evenOrOdd(7)); // => 7 is odd
    console.log(evenOrOdd(8)); // => 8 is even
  }

  /**
   * SCENARIO 4: the most common beginner mistake.
   * Used { } but forgot  return  -> the function gives back nothing (undefined).
   */
  forgottenReturn(): void {
    section("forgottenReturn");
    const good = (n: number): number => {
      return n * 2;
    };
    const forgot = (n: number) => {
      n * 2; // calculated, then thrown away
    };

    console.log(good(4)); // => 8
    console.log(forgot(4)); // => undefined
    // ERROR-DEMO: const broken = (n: number): number => { n * 2; }; // @ERR  says it returns a number but there is no return
  }

  /**
   * SCENARIO 5: a default value for an input, used when the caller passes nothing.
   */
  defaultValue(): void {
    section("defaultValue");
    const greet = (name: string = "friend"): string => `Hi ${name}`;

    console.log(greet("Maya")); // => Hi Maya
    console.log(greet()); // => Hi friend
  }

  /**
   * SCENARIO 6: store an arrow function in a variable and use it many times.
   */
  useManyTimes(): void {
    section("useManyTimes");
    const withTax = (price: number): number => Math.round(price * 1.1);

    console.log(withTax(100)); // => 110
    console.log(withTax(200)); // => 220
    console.log(withTax(50)); // => 55
  }

  /**
   * SCENARIO 7: arrow functions inside array methods. You will use this a lot.
   *
   *   map     -> change EVERY item
   *   filter  -> keep only items that pass a test
   *   find    -> get the FIRST item that passes a test
   */
  arrowInArrays(): void {
    section("arrowInArrays");
    const numbers: number[] = [1, 2, 3, 4, 5, 6];

    console.log(numbers.map((n) => n * 10)); // => [ 10, 20, 30, 40, 50, 60 ]
    console.log(numbers.filter((n) => n % 2 === 0)); // => [ 2, 4, 6 ]
    console.log(numbers.find((n) => n > 3)); // => 4

    const names: string[] = ["  maya ", "  ravi", "anu  "];
    console.log(names.map((name) => name.trim())); // => [ 'maya', 'ravi', 'anu' ]
  }

  /**
   * SCENARIO 8: pass an arrow function INTO another function (a callback).
   * doTwice does not know WHAT to do. The caller tells it by passing an arrow function.
   */
  arrowAsCallback(): void {
    section("arrowAsCallback");
    const doTwice = (action: () => void): void => {
      action();
      action();
    };

    doTwice(() => {
      console.log("Hello"); // => Hello
    });
    doTwice(() => console.log("Bye")); // => Bye
  }

  /**
   * SCENARIO 9: same function, different arrow function passed in = different result.
   */
  swapTheBehaviour(): void {
    section("swapTheBehaviour");
    const calculate = (a: number, b: number, operation: (x: number, y: number) => number): number => {
      return operation(a, b);
    };

    console.log(calculate(10, 5, (x, y) => x + y)); // => 15
    console.log(calculate(10, 5, (x, y) => x - y)); // => 5
    console.log(calculate(10, 5, (x, y) => x * y)); // => 50
  }

  /**
   * SCENARIO 10: arrow function that returns an object. Wrap the object in ( ).
   * Without ( ), the { } is read as the function body, not as an object.
   */
  returnObject(): void {
    section("returnObject");
    const makeUser = (name: string, age: number) => ({ name: name, age: age });

    console.log(makeUser("Maya", 25)); // => { name: 'Maya', age: 25 }
  }

  /**
   * SCENARIO 11: one rule - a const arrow function only exists AFTER its own line.
   * A normal function can be called before the line where it is written.
   */
  orderMatters(): void {
    section("orderMatters");
    console.log(normalOne(3)); // => 6
    function normalOne(n: number): number {
      return n * 2;
    }
    // ERROR-DEMO: console.log(arrowOne(3)); const arrowOne = (n: number): number => n * 2; // @ERR  arrowOne is used before it is created
  }

  /**
   * SCENARIO 12: where you will SEE arrow functions in Playwright (just text here, nothing runs).
   */
  inPlaywright(): void {
    section("inPlaywright");
    console.log("test body : test('has title', async ({ page }) => { ... });");
    console.log("clean text: texts.map((t) => t.trim())");
    console.log("keep some : texts.filter((t) => t !== '')");
    // => clean text: texts.map((t) => t.trim())
  }

  runAll(): void {
    this.normalVsArrow();
    this.numberOfInputs();
    this.shortBodyVsLongBody();
    this.forgottenReturn();
    this.defaultValue();
    this.useManyTimes();
    this.arrowInArrays();
    this.arrowAsCallback();
    this.swapTheBehaviour();
    this.returnObject();
    this.orderMatters();
    this.inPlaywright();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new ArrowFunctions().runAll();
//   One scenario only  : new ArrowFunctions().arrowInArrays();
// ---------------------------------------------------------------
new ArrowFunctions().runAll();