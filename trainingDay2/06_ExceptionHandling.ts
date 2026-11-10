export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

// ---- Helpers used by the scenarios below ---------------------------------

// Your own error type: carries extra information (a code).
class LoginError extends Error {
  constructor(
    message: string,
    public readonly code: number,
  ) {
    super(message);
    this.name = "LoginError";
  }
}

function login(user: string, password: string): string {
  if (user === "") {
    throw new LoginError("User name is empty", 400);
  }
  if (password !== "secret") {
    throw new LoginError("Wrong password", 401);
  }
  return `Welcome ${user}`;
}

// In strict mode a caught value is "unknown" - this helper reads its message safely.
function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * DAY 3 - CLASS 6: EXCEPTION HANDLING - try / catch / finally
 *
 * An exception is an error that happens while the code runs.
 * If nobody catches it, the program stops. try/catch lets you handle it and carry on.
 *
 *   try {      risky code      }    <- run this
 *   catch (e) { handle error   }    <- only if something threw
 *   finally {  cleanup         }    <- ALWAYS runs, error or not
 *
 * Why testers care: every failed assertion and every timeout in Playwright is a thrown error.
 *
 * TypeScript has NO "checked exceptions": nothing forces you to catch.
 * Under strict mode the caught value has type  unknown  - check it before using it.
 *
 * Run this file:  npx tsx training/day3/06_ExceptionHandling.ts
 */
class ExceptionHandling {
  /** JSON.parse throws on bad text. try/catch stops the crash. */
  tryCatchBasic(): void {
    section("tryCatchBasic");
    try {
      JSON.parse("{ this is not json");
      console.log("never printed");
    } catch (error) {
      console.log("Caught a problem"); // => Caught a problem
      console.log(error instanceof SyntaxError); // => true
    }
    console.log("Program carries on"); // => Program carries on
  }

  /** finally always runs, even when there was no error. Good for cleanup (close browser, close file). */
  finallyBlock(): void {
    section("finallyBlock");
    try {
      console.log("1. try"); // => 1. try
    } finally {
      console.log("2. finally runs"); // => 2. finally runs
    }
    try {
      throw new Error("boom");
    } catch {
      console.log("3. catch"); // => 3. catch
    } finally {
      console.log("4. finally runs again"); // => 4. finally runs again
    }
  }

  /** throw raises your own error. Execution of the current function stops right there. */
  throwOwnError(): void {
    section("throwOwnError");
    const divide = (a: number, b: number): number => {
      if (b === 0) {
        throw new Error("Cannot divide by zero");
      }
      return a / b;
    };
    console.log(divide(10, 2)); // => 5
    try {
      divide(1, 0);
    } catch (error) {
      console.log(messageOf(error)); // => Cannot divide by zero
    }
  }

  /** Custom error class: add a code (or any data) so the caller can decide what to do. */
  customErrorClass(): void {
    section("customErrorClass");
    console.log(login("paari", "secret")); // => Welcome paari
    try {
      login("paari", "wrong");
    } catch (error) {
      if (error instanceof LoginError) {
        console.log(error.name, error.code, error.message); // => LoginError 401 Wrong password
      }
    }
  }

  /**
   * In strict mode the caught value is "unknown": anything can be thrown, even a plain string.
   * So check it first.
   */
  unknownInCatch(): void {
    section("unknownInCatch");
    try {
      throw "just a string"; // legal in JavaScript, but a bad habit
    } catch (error) {
      // ERROR-DEMO: console.log(error.message); // @ERR  error is of type 'unknown'
      if (error instanceof Error) {
        console.log("An Error object:", error.message);
      } else {
        console.log("Not an Error object:", error); // => Not an Error object: just a string
      }
    }
  }

  /** Catch only what you can handle. Pass everything else upward with throw. */
  rethrow(): void {
    section("rethrow");
    try {
      try {
        login("", "secret");
      } catch (error) {
        console.log("Inner catch saw:", messageOf(error)); // => Inner catch saw: User name is empty
        throw error; // not mine to fix - pass it up
      }
    } catch (error) {
      console.log("Outer catch got it too:", messageOf(error)); // => Outer catch got it too: User name is empty
    }
  }

  /**
   * An uncaught error travels UP the call stack until someone catches it.
   *
   *   level1()  <- has try/catch   catches it here
   *     level2()                   passes it up
   *       level3()  throw new Error(...)   starts here
   */
  errorBubblesUp(): void {
    section("errorBubblesUp");
    const level3 = (): void => {
      throw new Error("Failed in level 3");
    };
    const level2 = (): void => {
      level3();
      console.log("never printed"); // skipped: the error left level2 already
    };
    const level1 = (): void => {
      try {
        level2();
      } catch (error) {
        console.log("Caught in level 1:", messageOf(error)); // => Caught in level 1: Failed in level 3
      }
    };
    level1();
  }

  /** Put try/catch INSIDE the loop so one bad item does not stop the rest. */
  collectFailures(): void {
    section("collectFailures");
    const inputs: string[] = ["paari", "", "ravi"];
    const failures: string[] = [];
    for (const user of inputs) {
      try {
        console.log(login(user, "secret")); // => Welcome paari ~~ Welcome ravi
      } catch (error) {
        failures.push(messageOf(error));
      }
    }
    console.log("Failures:", failures); // => Failures: [ 'User name is empty' ]
  }

  /** finally runs even when the function returns from inside try. */
  finallyWithReturn(): void {
    section("finallyWithReturn");
    const read = (): string => {
      try {
        return "value from try";
      } finally {
        console.log("cleanup still runs"); // => cleanup still runs
      }
    };
    console.log(read()); // => value from try
  }

  runAll(): void {
    this.tryCatchBasic();
    this.finallyBlock();
    this.throwOwnError();
    this.customErrorClass();
    this.unknownInCatch();
    this.rethrow();
    this.errorBubblesUp();
    this.collectFailures();
    this.finallyWithReturn();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new ExceptionHandling().runAll();
//   One scenario only  : new ExceptionHandling().finallyBlock();
// ---------------------------------------------------------------
new ExceptionHandling().runAll();
