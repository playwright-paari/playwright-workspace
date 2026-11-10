export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * A small class used by the scenarios below.
 *   - static  members belong to the CLASS   -> ONE shared copy
 *   - instance members belong to each OBJECT -> every object has its own copy
 */
class Counter {
  static totalCreated: number = 0; // static: one copy, lives on the class
  readonly id: number; // instance: each object gets its own id

  constructor() {
    Counter.totalCreated++; // update the shared count (use the CLASS name)
    this.id = Counter.totalCreated; // give THIS object its own id
  }

  describe(): string {
    return `Counter #${this.id}`; // instance method: can use this.id
  }

  static resetAll(): void {
    Counter.totalCreated = 0; // static method: works with static data only
    // ERROR-DEMO: console.log(this.id); // @ERR  a static method has no "this object", so no id
  }
}

/** Utility class: nothing to remember per object, so everything is static. */
class MathHelper {
  static readonly PI: number = 3.14159;

  static square(n: number): number {
    return n * n;
  }
}

/**
 * DAY 2 - CLASS 11: STATIC vs INSTANCE
 *
 *   CLASS Counter  (ONE copy, shared)           OBJECTS (each has its own copy)
 *   +-------------------------+
 *   | static totalCreated = 3 |                 c1 --> [ id: 1 ]
 *   | static resetAll()       |                 c2 --> [ id: 2 ]
 *   +-------------------------+                 c3 --> [ id: 3 ]
 *
 *   instance:  const c1 = new Counter();   c1.describe()      needs an object
 *   static:    Counter.totalCreated        MathHelper.square() no object needed
 *
 * Run this file:  npx tsx training/day2/11_StaticVsInstance.ts
 */
class StaticVsInstance {
  /** Instance members: every object has its own values. */
  instanceMembers(): void {
    section("instanceMembers");
    Counter.resetAll();
    const c1 = new Counter();
    const c2 = new Counter();
    console.log(c1.id, c2.id); // => 1 2
    console.log(c1.describe()); // => Counter #1
    console.log(c2.describe()); // => Counter #2
  }

  /** Static members: ONE shared value, reached through the CLASS name. */
  staticMembers(): void {
    section("staticMembers");
    Counter.resetAll();
    new Counter();
    new Counter();
    new Counter();
    console.log(Counter.totalCreated); // => 3
    // ERROR-DEMO: const c = new Counter(); console.log(c.totalCreated); // @ERR  static is on the class, not the object
    // ERROR-DEMO: console.log(Counter.id); // @ERR  id belongs to each object, not the class
  }

  /** Static methods: handy helpers that need no object. */
  staticUtilityMethods(): void {
    section("staticUtilityMethods");
    console.log(MathHelper.square(5)); // => 25
    console.log(MathHelper.PI); // => 3.14159
    console.log(Math.max(1, 5, 3)); // => 5   (JavaScript's own Math class is all static)
  }

  /**
   * DANGER: static data is shared by EVERYONE.
   * In test code, shared static state is a common reason why tests affect each other.
   */
  sharedStateWarning(): void {
    section("sharedStateWarning");
    Counter.resetAll();
    const first = new Counter();
    console.log(Counter.totalCreated); // => 1
    new Counter(); // some other part of the code creates one more
    console.log(Counter.totalCreated); // => 2   (it changed without "first" doing anything)
    console.log(first.id); // => 1   (the instance value did not change)
  }

  /** Quick summary. */
  whenToUse(): void {
    section("whenToUse");
    console.log("Instance : data that differs per object (a user, a page, a browser session)");
    console.log("Static   : helpers, constants, counters shared by all objects");
    // => Static   : helpers, constants, counters shared by all objects
  }

  runAll(): void {
    this.instanceMembers();
    this.staticMembers();
    this.staticUtilityMethods();
    this.sharedStateWarning();
    this.whenToUse();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new StaticVsInstance().runAll();
//   One scenario only  : new StaticVsInstance().staticMembers();
// ---------------------------------------------------------------
new StaticVsInstance().runAll();
