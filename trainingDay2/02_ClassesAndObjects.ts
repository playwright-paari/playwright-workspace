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


    // static = belongs to the CLASS, so you call it as Person.create(...) (no object needed)
  static create(name: string, age: number = 18): Person {
    return new Person(name, age); // it still uses new inside
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

    /**
   * WAY 1: the new keyword. The standard way to create an object.
   *
   *   new Person("Paari", 25)
   *   |   |       \_________/
   *   |   |        values for the constructor
   *   |   the class (blueprint)
   *   asks for a brand new object
   */
  createWithNew(): void {
    section("createWithNew");
    const p1 = new Person("Paari", 25);
    const p2 = new Person("Ravi", 30);
    console.log(p1.greet()); // => Hi, I am Paari and I am 25
    console.log(p2.greet()); // => Hi, I am Ravi and I am 30
    // ERROR-DEMO: new Person("Paari"); // @ERR  the constructor needs 2 values: name and age
  }

  /**
   * WAY 2: a static factory method. A method on the CLASS that builds the object for you.
   *
   *   Person.create("Ravi")      <- called on the class name, not on an object
   *          |
   *          +--> inside it runs  new Person(...)  and gives the object back
   *
   * Why use it?  A clear name, and default values (age becomes 18 when you skip it).
   */
  createWithFactoryMethod(): void {
    section("createWithFactoryMethod");
    const p1 = Person.create("Ravi");
    const p2 = Person.create("Maya", 30);
    console.log(p1); // => Person { name: 'Ravi', age: 18 }
    console.log(p2.greet()); // => Hi, I am Maya and I am 30
    console.log(p1 instanceof Person); // => true   (a real Person, same as with new)
    // ERROR-DEMO: const p3 = p1.create("Anu"); // @ERR  create belongs to the class, not to an object
  }

  /**
   * An object WITHOUT a class: write the fields and the method directly inside { }.
   * Good for ONE object. (Same idea as a class, but no blueprint.)
   *
   *   empData ---> { firstName: "Amy", age: 30, jobTitle: "IT", details: [function] }
   *
   * Do NOT write  const empData: object  - the type "object" hides the fields,
   * so TypeScript will not let you read empData.firstName. Let TypeScript work the type out.
   */
  objectWithMethod(): void {
    section("objectWithMethod");
    const empData = {
      firstName: "Amy",
      age: 30,
      jobTitle: "IT",
      details() {
        console.log(`My name is ${this.firstName}`); // => My name is Amy
        console.log(`My age is ${this.age}`); // => My age is 30
      },
    };

    empData.details();
    empData.age = 31;
    console.log(empData.age); // => 31
    // ERROR-DEMO: const vague: object = { firstName: "Amy" }; console.log(vague.firstName); // @ERR  the type object has no fields
  }

  /**
   * Object literal vs class: when do you use which?
   *
   *   object literal  { ... }   ONE object                      (empData above)
   *   class + new               MANY objects of the same kind   (Person below)
   *
   * With a literal you would copy the whole { ... } again for every new person.
   * With a class you write the blueprint once and then use new.
   */
  objectLiteralVsClass(): void {
    section("objectLiteralVsClass");
    const e1 = new Person("Amy", 30);
    const e2 = new Person("Ravi", 28);
    const e3 = new Person("Maya", 35);
    console.log(e1.greet()); // => Hi, I am Amy and I am 30
    console.log(e2.greet()); // => Hi, I am Ravi and I am 28
    console.log(e3.greet()); // => Hi, I am Maya and I am 35
  }

  runAll(): void {
    this.createObject();
    this.twoObjectsOneClass();
    this.thisKeyword();
    this.parameterProperties();
    this.objectsAreReferences();
    this.objectPrinting();
    this.methodChaining();
    
    this.createWithNew();
    this.createWithFactoryMethod();
    this.objectWithMethod();
    this.objectLiteralVsClass();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new ClassesAndObjects().runAll();
//   One scenario only  : new ClassesAndObjects().twoObjectsOneClass();
// ---------------------------------------------------------------
new ClassesAndObjects().runAll();
