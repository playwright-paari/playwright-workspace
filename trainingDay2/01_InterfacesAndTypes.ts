export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

// ---- Shapes used by the scenarios below ----------------------------------

// interface = a CONTRACT that describes the shape of an object.
interface User {
  id: number;
  name: string;
  email?: string; // "?" = optional
  readonly role: string; // readonly = set once, cannot change later
}

// interface can EXTEND another interface (it adds more rules).
interface Admin extends User {
  permissions: string[];
}

// type alias = a new NAME for a type. Great with union types.
type BrowserName = "chromium" | "firefox" | "webkit"; // only these three exact values are allowed
type Id = string | number;

// An interface can also describe a FUNCTION shape.
interface Greeter {
  (name: string): string;
}

/**
 * DAY 3 - CLASS 1: INTERFACES AND TYPES
 *
 * An interface is a contract: "any object that says it is a User MUST have these fields".
 *
 *   interface User            object that follows it
 *   +------------------+      +-----------------------------+
 *   | id: number       |      | { id: 1, name: "Paari",     |
 *   | name: string     | <--- |   role: "tester" }          |
 *   | email?: string   |      +-----------------------------+
 *   | readonly role    |
 *   +------------------+
 *
 * IMPORTANT: interfaces and types exist ONLY while you write and compile code.
 * They are erased in the final JavaScript. Nothing about them exists at run time.
 *
 * Run this file:  npx tsx training/day3/01_InterfacesAndTypes.ts
 */
class InterfacesAndTypes {
  /** An object must match the interface: all required fields, correct types. */
  basicInterface(): void {
    section("basicInterface");
    const user: User = { id: 1, name: "Paari", role: "tester" };
    console.log(user.name, user.role); // => Paari tester
    // ERROR-DEMO: const bad: User = { id: 2, name: "X" }; // @ERR  required field "role" is missing
  }

  /** Optional field (?): may be missing, so its value can be undefined. */
  optionalProperty(): void {
    section("optionalProperty");
    const withEmail: User = { id: 1, name: "Paari", email: "p@test.com", role: "tester" };
    const withoutEmail: User = { id: 2, name: "Ravi", role: "dev" };
    console.log(withEmail.email); // => p@test.com
    console.log(withoutEmail.email); // => undefined
    console.log(withoutEmail.email ?? "no email"); // => no email
  }

  /** readonly: you can read it, you cannot change it. */
  readonlyProperty(): void {
    section("readonlyProperty");
    const user: User = { id: 1, name: "Paari", role: "tester" };
    user.name = "Paari C"; // normal fields can change
    console.log(user.name); // => Paari C
    // ERROR-DEMO: user.role = "admin"; // @ERR  role is read-only
  }

  /** TypeScript rejects fields that are not part of the contract (typo protection). */
  extraPropertyCheck(): void {
    section("extraPropertyCheck");
    // ERROR-DEMO: const typo: User = { id: 1, name: "A", role: "x", emial: "a@b.com" }; // @ERR  "emial" is not in User
    console.log("Un-comment the ERROR-DEMO line to see typo protection");
    // => Un-comment the ERROR-DEMO line to see typo protection
  }

  /** Interface extends: Admin has everything in User, plus permissions. */
  interfaceExtends(): void {
    section("interfaceExtends");
    const admin: Admin = { id: 9, name: "Boss", role: "admin", permissions: ["read", "write"] };
    console.log(admin.name, admin.permissions.length); // => Boss 2
  }

  /** Type alias with a literal union: only the listed exact values are allowed. */
  literalUnion(): void {
    section("literalUnion");
    const browser: BrowserName = "webkit";
    console.log(browser); // => webkit
    // ERROR-DEMO: const wrong: BrowserName = "safari"; // @ERR  "safari" is not one of the three allowed values
  }

  /** Union of different types: a string OR a number. */
  unionOfTypes(): void {
    section("unionOfTypes");
    const show = (id: Id): string => (typeof id === "number" ? `numeric id ${id}` : `text id ${id}`);
    console.log(show(101)); // => numeric id 101
    console.log(show("A-101")); // => text id A-101
  }

  /** An interface can describe a function. */
  functionInterface(): void {
    section("functionInterface");
    const shout: Greeter = (name) => name.toUpperCase() + "!";
    console.log(shout("paari")); // => PAARI!
  }

  /** Interfaces work with arrays too. */
  arrayOfInterface(): void {
    section("arrayOfInterface");
    const team: User[] = [
      { id: 1, name: "Paari", role: "tester" },
      { id: 2, name: "Ravi", role: "dev" },
    ];
    console.log(team.map((member) => member.name)); // => [ 'Paari', 'Ravi' ]
  }

  /**
   * Interfaces are erased. At run time there is only a plain object.
   * You cannot write  "x instanceof User"  - it does not compile, because User is not a real thing in JavaScript.
   */
  interfacesAreErased(): void {
    section("interfacesAreErased");
    const user: User = { id: 1, name: "Paari", role: "tester" };
    console.log(user.constructor.name); // => Object
    // ERROR-DEMO: console.log(user instanceof User); // @ERR  User is only a type, not a value
  }

  /** interface vs type: when to use which. */
  interfaceVsType(): void {
    section("interfaceVsType");
    console.log("interface : describes object shapes, can be extended, can be implemented by a class");
    console.log("type      : any type name - unions, literals, tuples, functions");
    console.log("Rule here : object shape -> interface.  union / literal -> type.");
    // => Rule here : object shape -> interface.  union / literal -> type.
  }

  runAll(): void {
    this.basicInterface();
    this.optionalProperty();
    this.readonlyProperty();
    this.extraPropertyCheck();
    this.interfaceExtends();
    this.literalUnion();
    this.unionOfTypes();
    this.functionInterface();
    this.arrayOfInterface();
    this.interfacesAreErased();
    this.interfaceVsType();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new InterfacesAndTypes().runAll();
//   One scenario only  : new InterfacesAndTypes().optionalProperty();
// ---------------------------------------------------------------
new InterfacesAndTypes().runAll();
