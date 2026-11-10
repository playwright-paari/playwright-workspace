export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

// ---- Classes used by the scenarios below ---------------------------------

class Employee {
  constructor(
    public name: string,
    protected salary: number,
  ) {}

  work(): string {
    return `${this.name} is working`;
  }

  describe(): string {
    return `${this.name} earns ${this.salary}`; // protected salary: usable inside the family
  }
}

class Tester extends Employee {
  constructor(
    name: string,
    salary: number,
    public tool: string,
  ) {
    super(name, salary); // run the PARENT constructor first
  }

  override work(): string {
    return `${this.name} is testing with ${this.tool}`; // replaces the parent version
  }
}

class Developer extends Employee {
  override work(): string {
    return `${super.work()} and writing code`; // reuse the parent version, then add more
  }
}

// Method overloads: one method name, several allowed input shapes.
class Printer {
  print(value: string): string;
  print(value: number): string;
  print(value: string | number): string {
    return typeof value === "number" ? `Number: ${value}` : `Text: ${value}`;
  }
}

/**
 * DAY 3 - CLASS 4: INHERITANCE AND POLYMORPHISM
 *
 * Inheritance: a child class gets everything from its parent ("is-a" relationship).
 *
 *              Employee            work(), describe()
 *              /      \
 *         Tester     Developer     each can REPLACE work() with its own version
 *
 * Polymorphism: "many forms". Call the SAME method on different objects, each does its own thing.
 *
 *   team = [ Tester, Developer, Employee ]
 *   for each member -> member.work()    ->   three different results
 *
 * Run this file:  npx tsx training/day3/04_InheritanceAndPolymorphism.ts
 */
class InheritanceAndPolymorphism {
  /** The child gets the parent's fields and methods for free. */
  basicInheritance(): void {
    section("basicInheritance");
    const dev = new Developer("Ravi", 50000);
    console.log(dev.name); // => Ravi
    console.log(dev.describe()); // => Ravi earns 50000
  }

  /** The child constructor must call super(...) to build the parent part. */
  superConstructor(): void {
    section("superConstructor");
    const tester = new Tester("Paari", 40000, "Playwright");
    console.log(tester.name, tester.tool); // => Paari Playwright
  }

  /** override: the child replaces a parent method. */
  overrideMethod(): void {
    section("overrideMethod");
    const plain = new Employee("Sam", 30000);
    const tester = new Tester("Paari", 40000, "Playwright");
    console.log(plain.work()); // => Sam is working
    console.log(tester.work()); // => Paari is testing with Playwright
  }

  /** super.method() calls the parent version, so you extend it instead of rewriting it. */
  callingSuperMethod(): void {
    section("callingSuperMethod");
    const dev = new Developer("Ravi", 50000);
    console.log(dev.work()); // => Ravi is working and writing code
  }

  /** Polymorphism: one loop, three kinds of object, each answers in its own way. */
  polymorphism(): void {
    section("polymorphism");
    const team: Employee[] = [
      new Tester("Paari", 40000, "Playwright"),
      new Developer("Ravi", 50000),
      new Employee("Sam", 30000),
    ];
    for (const member of team) {
      console.log(member.work());
      // => Paari is testing with Playwright ~~ Ravi is working and writing code ~~ Sam is working
    }
  }

  /** instanceof asks "was this object built from that class (or a child of it)?" */
  instanceofCheck(): void {
    section("instanceofCheck");
    const tester = new Tester("Paari", 40000, "Playwright");
    console.log(tester instanceof Tester); // => true
    console.log(tester instanceof Employee); // => true    (a Tester IS an Employee)
    console.log(tester instanceof Developer); // => false
    console.log(tester.constructor.name); // => Tester
  }

  /** protected: the family can use it, outside code cannot. */
  protectedAccess(): void {
    section("protectedAccess");
    const tester = new Tester("Paari", 40000, "Playwright");
    console.log(tester.describe()); // => Paari earns 40000
    // ERROR-DEMO: console.log(tester.salary); // @ERR  salary is protected
  }

  /** Overloading: same method name, different input types. */
  methodOverloads(): void {
    section("methodOverloads");
    const printer = new Printer();
    console.log(printer.print("hello")); // => Text: hello
    console.log(printer.print(42)); // => Number: 42
    // ERROR-DEMO: console.log(printer.print(true)); // @ERR  no overload accepts a boolean
  }

  /** Inheritance has a cost: keep chains short. Prefer "has-a" (composition) when "is-a" does not fit. */
  isAVersusHasA(): void {
    section("isAVersusHasA");
    console.log("is-a  : a Tester IS an Employee            -> use extends");
    console.log("has-a : a LoginPage HAS a username field   -> use a property, not extends");
    // => has-a : a LoginPage HAS a username field   -> use a property, not extends
  }

  runAll(): void {
    this.basicInheritance();
    this.superConstructor();
    this.overrideMethod();
    this.callingSuperMethod();
    this.polymorphism();
    this.instanceofCheck();
    this.protectedAccess();
    this.methodOverloads();
    this.isAVersusHasA();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new InheritanceAndPolymorphism().runAll();
//   One scenario only  : new InheritanceAndPolymorphism().polymorphism();
// ---------------------------------------------------------------
new InheritanceAndPolymorphism().runAll();
