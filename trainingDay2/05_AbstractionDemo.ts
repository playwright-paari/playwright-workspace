export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

// ---- Interfaces: pure contracts (no code inside) --------------------------

interface Notifier {
  send(message: string): string;
}

interface Loggable {
  logLine(): string;
}

// A class "implements" an interface = it promises to provide every method in it.
class EmailNotifier implements Notifier {
  send(message: string): string {
    return `EMAIL: ${message}`;
  }
}

// A class may implement MANY interfaces.
class SmsNotifier implements Notifier, Loggable {
  send(message: string): string {
    return `SMS: ${message}`;
  }

  logLine(): string {
    return "SmsNotifier used";
  }
}

// ---- Abstract class: a partly finished class ------------------------------

abstract class Report {
  // abstract = "every child MUST write its own version"
  abstract title(): string;
  abstract body(): string;

  // normal method = shared code that every child gets for free (the "template")
  print(): string {
    return `[${this.title()}] ${this.body()}`;
  }
}

class TestReport extends Report {
  title(): string {
    return "Test Report";
  }

  body(): string {
    return "6 passed, 0 failed";
  }
}

class BugReport extends Report {
  title(): string {
    return "Bug Report";
  }

  body(): string {
    return "Login button not clickable";
  }
}

// This function knows ONLY the interface. It works with any Notifier, now or in the future.
function alertAll(notifiers: Notifier[], message: string): string[] {
  return notifiers.map((notifier) => notifier.send(message));
}

/**
 * DAY 3 - CLASS 5: ABSTRACTION - show WHAT it does, hide HOW
 *
 * TypeScript gives you TWO tools:
 *
 *   interface        a pure contract. No code. A class can implement many.   Erased at run time.
 *   abstract class   contract + shared code. A class can extend only one.     Real class at run time.
 *
 *        interface Notifier                      abstract class Report
 *        +------------------+                    +-------------------------+
 *        | send(message)    |                    | abstract title()        |  child must write
 *        +------------------+                    | abstract body()         |  child must write
 *           ^           ^                        | print()  <- real code   |  child gets free
 *   EmailNotifier   SmsNotifier                  +-------------------------+
 *   (each writes send)                             ^                 ^
 *                                              TestReport        BugReport
 *
 * Run this file:  npx tsx training/day3/05_AbstractionDemo.ts
 */
class AbstractionDemo {
  /** A class that implements an interface must provide every method. */
  classImplementsInterface(): void {
    section("classImplementsInterface");
    const email: Notifier = new EmailNotifier();
    console.log(email.send("Build passed")); // => EMAIL: Build passed
    // ERROR-DEMO: class Broken implements Notifier {} // @ERR  "send" is missing
  }

  /** One class, several interfaces. */
  multipleInterfaces(): void {
    section("multipleInterfaces");
    const sms = new SmsNotifier();
    console.log(sms.send("Build passed")); // => SMS: Build passed
    console.log(sms.logLine()); // => SmsNotifier used
  }

  /** Program to the INTERFACE: the same function works with any Notifier. */
  programToInterface(): void {
    section("programToInterface");
    const results = alertAll([new EmailNotifier(), new SmsNotifier()], "Deploy done");
    console.log(results); // => [ 'EMAIL: Deploy done', 'SMS: Deploy done' ]
  }

  /** Abstract class: children fill the gaps, the parent's print() does the shared work. */
  abstractClass(): void {
    section("abstractClass");
    const report1 = new TestReport();
    const report2 = new BugReport();
    console.log(report1.print()); // => [Test Report] 6 passed, 0 failed
    console.log(report2.print()); // => [Bug Report] Login button not clickable
  }

  /** You cannot build an object from an abstract class, and children cannot skip abstract methods. */
  cannotInstantiate(): void {
    section("cannotInstantiate");
    // ERROR-DEMO: const r = new Report(); // @ERR  cannot create an instance of an abstract class
    // ERROR-DEMO: class Lazy extends Report {} // @ERR  Lazy must implement title() and body()
    console.log("Un-comment an ERROR-DEMO line to see the rule");
    // => Un-comment an ERROR-DEMO line to see the rule
  }

  /** Both give you a parent TYPE to hold many different objects (polymorphism again). */
  holdManyKindsInOneList(): void {
    section("holdManyKindsInOneList");
    const reports: Report[] = [new TestReport(), new BugReport()];
    console.log(reports.map((report) => report.title())); // => [ 'Test Report', 'Bug Report' ]
  }

  /** Which one to pick? */
  interfaceVsAbstractClass(): void {
    section("interfaceVsAbstractClass");
    console.log("interface      : only a contract, many allowed, no shared code");
    console.log("abstract class : contract + shared code, only one parent allowed");
    console.log("Test code idea : interface for 'what a page can do', abstract class for 'common page code'");
    // => Test code idea : interface for 'what a page can do', abstract class for 'common page code'
  }

  runAll(): void {
    this.classImplementsInterface();
    this.multipleInterfaces();
    this.programToInterface();
    this.abstractClass();
    this.cannotInstantiate();
    this.holdManyKindsInOneList();
    this.interfaceVsAbstractClass();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new AbstractionDemo().runAll();
//   One scenario only  : new AbstractionDemo().abstractClass();
// ---------------------------------------------------------------
new AbstractionDemo().runAll();
