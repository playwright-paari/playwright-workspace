export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

// ---- Small helpers used by the scenarios below ---------------------------

// A function that waits (used to imitate slow browser actions).
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// A pretend Playwright "page" so we can run test-style code without a browser.
class FakePage {
  constructor(public url: string = "about:blank") {}

  async goto(url: string): Promise<void> {
    await sleep(1);
    this.url = url;
  }

  title(): string {
    return `Title of ${this.url}`;
  }
}

// What Playwright hands to every test: an object of "fixtures".
type Fixtures = { page: FakePage; browserName: string };
type TestBody = (fixtures: Fixtures) => void | Promise<void>;

// A tiny imitation of  test(...)  and  test.beforeEach(...)  so you can SEE how the arrow functions are used.
class MiniRunner {
  private hooks: TestBody[] = [];
  private tests: Array<[string, TestBody]> = [];

  beforeEach(hook: TestBody): void {
    this.hooks.push(hook); // just remember it, call it later
  }

  test(name: string, body: TestBody): void {
    this.tests.push([name, body]); // just remember it, call it later
  }

  async runAll(): Promise<void> {
    for (const [name, body] of this.tests) {
      const fixtures: Fixtures = { page: new FakePage(), browserName: "chromium" };
      for (const hook of this.hooks) {
        await hook(fixtures); // call YOUR arrow function and hand it the fixtures
      }
      await body(fixtures);
      console.log(`PASSED: ${name}`);
    }
  }
}

class Report {
  title: string = "Smoke";

  // Arrow function: "this" is simply the Report object around it.
  withArrow(items: string[]): string[] {
    return items.map((item) => `${this.title}:${item}`);
  }

  // Normal function: gets its OWN "this", so we must pass the object in by hand (2nd argument of map).
  withFunction(items: string[]): string[] {
    return items.map(function (this: Report, item: string) {
      return `${this.title}:${item}`;
    }, this);
  }
}

class ClickCounter {
  count: number = 0;

  incrementArrow = (): void => {
    this.count++; // arrow property: "this" is locked to this object for good
  };

  incrementMethod(): void {
    this.count++; // normal method: "this" depends on HOW it is called
  }
}

/**
 * DAY 4 - CLASS 1: ARROW FUNCTIONS (and where Playwright uses them)
 *
 * An arrow function is a shorter way to write a function. You see it in almost every Playwright line:
 *
 *   test("has title", async ({ page }) => { ... });
 *                      \________________________/
 *                       an arrow function: a recipe you HAND to Playwright.
 *                       Playwright keeps it and calls it LATER, passing in { page }.
 *
 *   normal :  function add(a: number, b: number): number { return a + b; }
 *   arrow  :  const add = (a: number, b: number): number => a + b;
 *                         \_____ inputs _____/  \_ output _/    \_ body, returned automatically
 *
 * Where you will meet arrow functions in Playwright:
 *   1. the test body                       test("...", async ({ page }) => { ... })
 *   2. hooks and groups                    test.beforeEach(async ({ page }) => { ... })
 *   3. array methods on results            texts.map((t) => t.trim())
 *   4. conditions on events                page.waitForResponse((res) => res.status() === 200)
 *   5. code that runs INSIDE the browser   page.evaluate(() => document.title)
 *   6. polling checks                      expect.poll(() => someValue)
 *
 * Run this file:  npx tsx trainingDay4/01_ArrowFunctions.ts
 * (Real Playwright version of the same ideas: tests/arrow-functions.spec.ts)
 */
class ArrowFunctions {
  /** The same function written both ways. */
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
   * Syntax variations.
   *
   *   () => value                  no inputs
   *   (n) => n * 2                 expression body: the value is returned automatically
   *   (n) => { ...; return x; }    block body: you MUST write return yourself
   */
  syntaxVariations(): void {
    section("syntaxVariations");
    const sayHi = (): string => "Hi";
    const double = (n: number): number => n * 2;
    const addThree = (a: number, b: number, c: number): number => a + b + c;
    const describe = (n: number): string => {
      const label = n % 2 === 0 ? "even" : "odd";
      return `${n} is ${label}`; // block body: explicit return
    };
    console.log(sayHi()); // => Hi
    console.log(double(4)); // => 8
    console.log(addThree(1, 2, 3)); // => 6
    console.log(describe(7)); // => 7 is odd
    // ERROR-DEMO: console.log(double("4")); // @ERR  the input must be a number, not text
  }

  /** Common bug: braces without return give back undefined. */
  forgottenReturn(): void {
    section("forgottenReturn");
    const goodExpression = (n: number): number => n * 2; // no braces: returned for you
    const goodBlock = (n: number): number => {
      return n * 2; // braces: you must write return
    };
    const forgot = (n: number): void => {
      n * 2; // calculated and thrown away
    };
    console.log(goodExpression(4), goodBlock(4)); // => 8 8
    console.log(forgot(4)); // => undefined
  }

  /**
   * Returning an object: wrap it in ( ).
   * Without the brackets, { } is read as the function BODY, not as an object.
   * (VS Code may show a faint "unused label" hint on the wrong line - that is the clue.)
   */
  returnsObjectLiteral(): void {
    section("returnsObjectLiteral");
    const wrong = (name: string) => {
      name: name;
    };
    const right = (name: string) => ({ name: name });
    console.log(wrong("Paari")); // => undefined
    console.log(right("Paari")); // => { name: 'Paari' }
  }

  /**
   * Arrow functions inside array methods. Playwright gives you arrays all the time:
   *
   *   const texts = await page.locator(".todo-list li").allTextContents();
   *   const clean = texts.map((t) => t.trim());
   *
   * Here the "texts" array is typed in by hand so it runs without a browser.
   */
  callbacksInArrayMethods(): void {
    section("callbacksInArrayMethods");
    const rawTexts: string[] = ["  Buy milk ", "Walk dog", "  ", "Read book"];
    const texts = rawTexts.map((t) => t.trim()); // transform every item
    console.log(texts); // => [ 'Buy milk', 'Walk dog', '', 'Read book' ]
    console.log(texts.filter((t) => t !== "")); // => [ 'Buy milk', 'Walk dog', 'Read book' ]
    console.log(texts.find((t) => t.startsWith("W"))); // => Walk dog
    console.log(texts.some((t) => t.includes("dog"))); // => true
    console.log(texts.every((t) => t.length > 0)); // => false
    console.log(["b", "c", "a"].sort((x, y) => x.localeCompare(y))); // => [ 'a', 'b', 'c' ]
    const chained = rawTexts
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .map((t) => t.toUpperCase());
    console.log(chained); // => [ 'BUY MILK', 'WALK DOG', 'READ BOOK' ]
  }

  /**
   * The  ({ page }) =>  part.  Playwright builds ONE object of fixtures and passes it in.
   * Curly brackets in the parameter pick out only the parts you need (destructuring).
   *
   *   fixtures = { page, browserName, context, request, ... }
   *
   *   async ({ page }) => ...                 take ONLY page
   *   async ({ page, browserName }) => ...    take two
   *   async () => ...                         take nothing
   */
  destructuredParameter(): void {
    section("destructuredParameter");
    const fixtures = { page: "PAGE-OBJECT", browserName: "chromium", viewport: "1280x720" };
    const onlyPage = ({ page }: { page: string }): string => `got ${page}`;
    const two = ({ page, browserName }: { page: string; browserName: string }): string => `${browserName} + ${page}`;
    const renamed = ({ page: p }: { page: string }): string => `short name p = ${p}`;
    const withDefault = ({ retries = 2 }: { retries?: number }): number => retries;
    console.log(onlyPage(fixtures)); // => got PAGE-OBJECT
    console.log(two(fixtures)); // => chromium + PAGE-OBJECT
    console.log(renamed(fixtures)); // => short name p = PAGE-OBJECT
    console.log(withDefault({})); // => 2
    console.log(withDefault({ retries: 5 })); // => 5
  }

  /**
   * How  test("name", async ({ page }) => { ... })  really works.
   *
   *   1. You call test(name, yourArrow).         test only STORES yourArrow.
   *   2. Later the runner builds { page, ... }.
   *   3. The runner CALLS yourArrow({ page, ... }) and waits for it to finish.
   *
   * An arrow function you pass to another function is called a CALLBACK.
   */
  async miniTestRunner(): Promise<void> {
    section("miniTestRunner");
    const runner = new MiniRunner();

    runner.beforeEach(async ({ page }) => {
      await page.goto("https://demo.playwright.dev/todomvc");
    });

    runner.test("has title", async ({ page }) => {
      console.log(page.title()); // => Title of https://demo.playwright.dev/todomvc
    });

    runner.test("knows the browser", async ({ page, browserName }) => {
      console.log(browserName, page.url); // => chromium https://demo.playwright.dev/todomvc
    });

    await runner.runAll(); // the runner now calls each arrow function you stored
    // => PASSED: has title ~~ PASSED: knows the browser
  }

  /**
   * async arrow: an arrow function that can use await. It always returns a Promise.
   * Every Playwright test body is an async arrow, because browser actions take time.
   *
   *   const pending = slowDouble(4);    pending is a Promise: "a result that is not ready yet"
   *   await pending                     wait here until it is ready -> 8
   */
  async asyncArrow(): Promise<void> {
    section("asyncArrow");
    const slowDouble = async (n: number): Promise<number> => {
      await sleep(10);
      return n * 2;
    };
    const pending = slowDouble(4);
    console.log(pending); // => Promise { <pending> }
    console.log(await pending); // => 8
  }

  /**
   * The BIG difference: "this".
   *   arrow function   uses the "this" of the code AROUND it (lexical this)
   *   normal function  gets its own "this", decided by how it is called
   *
   * Inside a class (like a Page Object) this is why arrow callbacks "just work".
   */
  lexicalThis(): void {
    section("lexicalThis");
    const report = new Report();
    console.log(report.withArrow(["a", "b"])); // => [ 'Smoke:a', 'Smoke:b' ]
    console.log(report.withFunction(["a", "b"])); // => [ 'Smoke:a', 'Smoke:b' ]  (needed the extra "this" argument)
    // ERROR-DEMO: ["a"].map(function (item) { return this.title + item; }); // @ERR  a normal function has no "this" to use here
  }

  /**
   * Arrow function as a class property keeps "this" even when you pass it around.
   * A normal method loses "this" when you copy it into a variable or hand it over as a callback.
   *
   *   Real example:  page.on("response", this.handleResponse)
   *   If handleResponse is a normal method, "this" is gone when Playwright calls it.
   */
  arrowAsClassProperty(): void {
    section("arrowAsClassProperty");
    const counter = new ClickCounter();

    const arrowCopy = counter.incrementArrow;
    arrowCopy();
    console.log(counter.count); // => 1

    const methodCopy = counter.incrementMethod;
    try {
      methodCopy();
    } catch (error) {
      console.log("method lost its this:", error instanceof TypeError); // => method lost its this: true
    }
    console.log(counter.count); // => 1   (the broken copy changed nothing)
  }

  /** Things an arrow function cannot do. */
  arrowLimits(): void {
    section("arrowLimits");
    const makeUser = (name: string) => ({ name });
    console.log(makeUser("Paari")); // => { name: 'Paari' }
    // ERROR-DEMO: const u = new makeUser("x"); // @ERR  arrow functions cannot be used with "new"

    console.log(hoisted(3)); // => 6   (a normal function declaration is available above its own line)
    function hoisted(n: number): number {
      return n * 2;
    }
    // ERROR-DEMO: const result = notYet(2); const notYet = (n: number): number => n; // @ERR  a const arrow only exists AFTER its line
  }

  /**
   * Cheat sheet: the real Playwright shapes (not run here - run them in tests/arrow-functions.spec.ts).
   */
  playwrightCheatSheet(): void {
    section("playwrightCheatSheet");
    console.log("test body     : test('title', async ({ page }) => { await page.goto(url); });");
    console.log("hook          : test.beforeEach(async ({ page }) => { await page.goto(url); });");
    console.log("group         : test.describe('login', () => { test('a', async ({ page }) => {}); });");
    console.log("clean texts   : (await page.locator('li').allTextContents()).map((t) => t.trim())");
    console.log("wait for API  : page.waitForResponse((res) => res.url().includes('/api') && res.status() === 200)");
    console.log("in browser    : await page.evaluate(() => document.title)");
    console.log("polling       : await expect.poll(() => getCount()).toBe(3)");
    // => polling       : await expect.poll(() => getCount()).toBe(3)
  }

  /** Quick rules. */
  whenToUse(): void {
    section("whenToUse");
    console.log("Arrow  : short callbacks, test bodies, array methods, code that must keep 'this'");
    console.log("Normal : when you need hoisting, 'new', or your own 'this' (rare in test code)");
    // => Normal : when you need hoisting, 'new', or your own 'this' (rare in test code)
  }

  async runAll(): Promise<void> {
    this.normalVsArrow();
    this.syntaxVariations();
    this.forgottenReturn();
    this.returnsObjectLiteral();
    this.callbacksInArrayMethods();
    this.destructuredParameter();
    await this.miniTestRunner();
    await this.asyncArrow();
    this.lexicalThis();
    this.arrowAsClassProperty();
    this.arrowLimits();
    this.playwrightCheatSheet();
    this.whenToUse();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new ArrowFunctions().runAll();
//   One scenario only  : new ArrowFunctions().callbacksInArrayMethods();
//   (miniTestRunner and asyncArrow are async - use:  new ArrowFunctions().miniTestRunner();)
// ---------------------------------------------------------------
new ArrowFunctions().runAll();