export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

// ---- Classes used by the scenarios below ---------------------------------

class BankAccount {
  readonly accountNo: string; // can be read, never changed
  private balance: number; // TypeScript hides it from outside code
  #pin: string; // JavaScript hides it for real ("hard private")
  private _nickname: string = "My account";

  constructor(accountNo: string, openingBalance: number, pin: string) {
    this.accountNo = accountNo;
    this.balance = openingBalance;
    this.#pin = pin;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit must be positive");
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new Error("Not enough balance");
    }
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }

  checkPin(pin: string): boolean {
    return pin === this.#pin;
  }

  // getter: used like a property  ->  account.summary
  get summary(): string {
    return `${this.accountNo}: ${this.balance}`;
  }

  // getter + setter pair with validation
  get nickname(): string {
    return this._nickname;
  }

  set nickname(value: string) {
    this._nickname = value.trim() === "" ? "My account" : value.trim();
  }
}

class Wallet {
  protected currency: string = "INR"; // visible to this class and its children only
}

class TravelWallet extends Wallet {
  describe(): string {
    return `Travel wallet in ${this.currency}`; // allowed: child class
  }
}

/**
 * DAY 3 - CLASS 3: ENCAPSULATION - hide the details, expose a safe door
 *
 *   OUTSIDE CODE                          INSIDE THE CLASS
 *                                         +----------------------------------+
 *   account.deposit(500)  ------------->  |  checks amount > 0               |
 *                                         |  then changes private balance    |
 *   account.balance = 999999  X BLOCKED   |  [ balance ]  <- hidden          |
 *                                         +----------------------------------+
 *
 *   public     anyone can use it (default)
 *   private    only this class
 *   protected  this class and its children
 *   readonly   set once, never changed
 *   #name      private AND hidden at run time (real JavaScript private)
 *
 * Run this file:  npx tsx training/day3/03_Encapsulation.ts
 */
class Encapsulation {
  /** public methods are the safe door; private fields are not reachable. */
  publicVsPrivate(): void {
    section("publicVsPrivate");
    const account = new BankAccount("ACC-1", 1000, "1234");
    account.deposit(500);
    console.log(account.getBalance()); // => 1500
    // ERROR-DEMO: console.log(account.balance); // @ERR  balance is private
    // ERROR-DEMO: account.balance = 999999; // @ERR  cannot change a private field from outside
  }

  /** The class protects its own rules (validation) inside the methods. */
  validationInMethods(): void {
    section("validationInMethods");
    const account = new BankAccount("ACC-1", 1000, "1234");
    try {
      account.deposit(-50);
    } catch (error) {
      console.log((error as Error).message); // => Deposit must be positive
    }
    try {
      account.withdraw(5000);
    } catch (error) {
      console.log((error as Error).message); // => Not enough balance
    }
    console.log(account.getBalance()); // => 1000   (nothing changed)
  }

  /** Getter: read like a property. Setter: assign like a property, with rules inside. */
  gettersAndSetters(): void {
    section("gettersAndSetters");
    const account = new BankAccount("ACC-7", 250, "0000");
    console.log(account.summary); // => ACC-7: 250
    console.log(account.nickname); // => My account
    account.nickname = "  Savings  ";
    console.log(account.nickname); // => Savings
    account.nickname = "   ";
    console.log(account.nickname); // => My account
  }

  /** readonly: can be read, cannot be changed after construction. */
  readonlyProperty(): void {
    section("readonlyProperty");
    const account = new BankAccount("ACC-9", 0, "1111");
    console.log(account.accountNo); // => ACC-9
    // ERROR-DEMO: account.accountNo = "HACKED"; // @ERR  accountNo is read-only
  }

  /** #private fields are truly hidden, even from code that ignores TypeScript. */
  hashPrivateField(): void {
    section("hashPrivateField");
    const account = new BankAccount("ACC-2", 10, "9876");
    console.log(account.checkPin("9876")); // => true
    console.log(account.checkPin("0000")); // => false
    // ERROR-DEMO: console.log(account.#pin); // @ERR  #pin is only reachable inside the class
  }

  /**
   * IMPORTANT TRUTH: TypeScript "private" is checked only while you compile.
   * After compiling it is an ordinary JavaScript property. #private is the real thing.
   */
  privateIsOnlyCompileTime(): void {
    section("privateIsOnlyCompileTime");
    const account = new BankAccount("ACC-3", 700, "4321");
    console.log((account as any).balance); // => 700        ("private" was bypassed with any)
    console.log((account as any).pin); // => undefined  (#pin cannot be reached this way)
  }

  /** protected: a child class may use it, outside code may not. */
  protectedMembers(): void {
    section("protectedMembers");
    const wallet = new TravelWallet();
    console.log(wallet.describe()); // => Travel wallet in INR
    // ERROR-DEMO: console.log(wallet.currency); // @ERR  protected: not visible outside the class family
  }

  /** Why bother? Summary. */
  whyEncapsulate(): void {
    section("whyEncapsulate");
    console.log("1. Rules live in ONE place (the class) - nobody can skip validation");
    console.log("2. You can change the inside later without breaking code that uses the class");
    console.log("3. Fewer ways to misuse the object = fewer bugs");
    // => 3. Fewer ways to misuse the object = fewer bugs
  }

  runAll(): void {
    this.publicVsPrivate();
    this.validationInMethods();
    this.gettersAndSetters();
    this.readonlyProperty();
    this.hashPrivateField();
    this.privateIsOnlyCompileTime();
    this.protectedMembers();
    this.whyEncapsulate();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new Encapsulation().runAll();
//   One scenario only  : new Encapsulation().gettersAndSetters();
// ---------------------------------------------------------------
new Encapsulation().runAll();
