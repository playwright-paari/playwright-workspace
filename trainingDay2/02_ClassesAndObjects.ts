export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

// ---- Classes used by the scenarios below ---------------------------------

class Person {
  name: string;
  age: number;

  // constructor runs once, when you write  new Person(...)
  constructor(name: string, age: number) {
    this.name = name; // "this" = the object being created
    this.age = age;
  }

  greet(): string {
    return `Hi, I am ${this.name} and I am ${this.age}`;
  }

  birthday(): void {
    this.age++; // changes THIS object only
  }
}

// Parameter properties: "public" in the constructor creates AND fills the field in one go.
class Tester {
  constructor(
    public name: string,
    public level: number = 1, // default value
  ) {}
}

// Methods that return "this" can be chained: a.add(1).add(2)
class Calculator {
  value: number = 0;

  add(n: number): this {
    this.value += n;
    return this;
  }

  multiply(n: number): this {
    this.value *= n;
    return this;
  }
}

/**
 * DAY 3 - CLASS 2: CLASSES AND OBJECTS (OOP basics)
 *
 *   CLASS  = the blueprint (the plan of a house)
 *   OBJECT = a real thing built from it (an actual house)
 *
 *   class Person                       new Person("Paari", 25)     new Person("Ravi", 30)
 *   +----------------+                   |                            |
 *   | name, age      |  ---- blueprint --+----> p1 --> [Paari, 25]    +--> p2 --> [Ravi, 30]
 *   | greet()        |
 *   | birthday()     |                  Two objects, same blueprint, separate data.
 *   +----------------+
 *
 * Run this file:  npx tsx training/day3/02_ClassesAndObjects.ts
 */
class ClassesAndObjects {
  /** new Person(...) builds an object from the class. */
  createObject(): void {
    section("createObject");
    const p1 = new Person("Paari", 25);
    console.log(p1.name, p1.age); // => Paari 25
    console.log(p1.greet()); // => Hi, I am Paari and I am 25
  }

  /** Two objects from one class do NOT affect each other. */
  twoObjectsOneClass(): void {
    section("twoObjectsOneClass");
    const p1 = new Person("Paari", 25);
    const p2 = new Person("Ravi", 30);
    p1.birthday();
    console.log(p1.age, p2.age); // => 26 30
    console.log(p1 === p2); // => false
  }

  /** "this" means "the object this method was called on". */
  thisKeyword(): void {
    section("thisKeyword");
    const p1 = new Person("Paari", 25);
    const p2 = new Person("Ravi", 30);
    console.log(p1.greet()); // => Hi, I am Paari and I am 25
    console.log(p2.greet()); // => Hi, I am Ravi and I am 30
  }

  /** Shortcut: write "public" in the constructor and you skip the boilerplate. */
  parameterProperties(): void {
    section("parameterProperties");
    const t1 = new Tester("Paari");
    const t2 = new Tester("Ravi", 3);
    console.log(t1.name, t1.level); // => Paari 1
    console.log(t2.name, t2.level); // => Ravi 3
  }

  /**
   * Objects are shared by ADDRESS, exactly like arrays.
   *
   *   p1 ----+
   *          +---> [ name: "Paari", age: 25 ]    one object, two labels
   *   p2 ----+
   */
  objectsAreReferences(): void {
    section("objectsAreReferences");
    const p1 = new Person("Paari", 25);
    const p2 = p1; // NOT a copy: both labels point to the same object
    p2.name = "Changed";
    console.log(p1.name); // => Changed
    console.log(p1 === p2); // => true
  }

  /** Printing an object shows its class name and fields. */
  objectPrinting(): void {
    section("objectPrinting");
    const p1 = new Person("Paari", 25);
    console.log(p1); // => Person { name: 'Paari', age: 25 }
    console.log(p1 instanceof Person); // => true
  }

  /** Method chaining: each method returns this, so calls can be linked. (You will meet this in the Builder pattern.) */
  methodChaining(): void {
    section("methodChaining");
    const calc = new Calculator();
    const result = calc.add(2).add(3).multiply(4).value;
    console.log(result); // => 20
  }

  runAll(): void {
    this.createObject();
    this.twoObjectsOneClass();
    this.thisKeyword();
    this.parameterProperties();
    this.objectsAreReferences();
    this.objectPrinting();
    this.methodChaining();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new ClassesAndObjects().runAll();
//   One scenario only  : new ClassesAndObjects().twoObjectsOneClass();
// ---------------------------------------------------------------
new ClassesAndObjects().runAll();
