export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 5: STRINGS (and why counting starts at 0)
 *
 * A string is a row of characters. Each one has a position number called an INDEX.
 * The FIRST character is at index 0  ("how many steps from the start?" - the first is 0 steps away).
 *
 *   text = "Playwright"
 *
 *   index    0   1   2   3   4   5   6   7   8   9
 *          +---+---+---+---+---+---+---+---+---+---+
 *          | P | l | a | y | w | r | i | g | h | t |
 *          +---+---+---+---+---+---+---+---+---+---+
 *   length = 10          last index = length - 1 = 9
 *
 * Run this file:  npx tsx training/day2/05_StringsDemo.ts
 */
class StringsDemo {
  private readonly text: string = "Playwright";

  /** length = how many characters. */
  lengthAndIndex(): void {
    section("lengthAndIndex");
    console.log(this.text.length); // => 10
    console.log(this.text[0]); // => P
    console.log(this.text[4]); // => w
  }

  /** The last index is always length - 1.  at(-1) is the short way. */
  firstAndLastChar(): void {
    section("firstAndLastChar");
    console.log(this.text[0]); // => P
    console.log(this.text[this.text.length - 1]); // => t
    console.log(this.text.at(-1)); // => t
    console.log(this.text[10]); // => undefined   (index 10 does not exist)
  }

  /** Changing case. These give back a NEW string. */
  caseConversion(): void {
    section("caseConversion");
    console.log(this.text.toUpperCase()); // => PLAYWRIGHT
    console.log(this.text.toLowerCase()); // => playwright
  }

  /** Searching inside a string. indexOf gives -1 when nothing is found. */
  searching(): void {
    section("searching");
    console.log(this.text.includes("wright")); // => true
    console.log(this.text.indexOf("w")); // => 4
    console.log(this.text.indexOf("z")); // => -1
    console.log(this.text.startsWith("Play")); // => true
    console.log(this.text.endsWith("ght")); // => true
  }

  /**
   * slice(start, end): from index start UP TO (not including) end.
   *
   *   "Playwright".slice(0, 4)   ->   P l a y   (indexes 0,1,2,3)
   *   Negative numbers count from the end.
   */
  sliceDemo(): void {
    section("sliceDemo");
    console.log(this.text.slice(0, 4)); // => Play
    console.log(this.text.slice(4)); // => wright
    console.log(this.text.slice(-3)); // => ght
  }

  /** trim() removes spaces at both ends. Useful for text read from a web page. */
  trimDemo(): void {
    section("trimDemo");
    const messy: string = "   hello   ";
    console.log(messy.length); // => 11
    console.log(messy.trim()); // => hello
    console.log(messy.trim().length); // => 5
  }

  /** replace, split and join. */
  replaceSplitJoin(): void {
    section("replaceSplitJoin");
    console.log("Hello World".replace("World", "TypeScript")); // => Hello TypeScript
    const parts: string[] = "chromium,firefox,webkit".split(",");
    console.log(parts); // => [ 'chromium', 'firefox', 'webkit' ]
    console.log(parts.join(" - ")); // => chromium - firefox - webkit
  }

  /** Template strings (backticks) put variables inside ${ }. */
  templateStrings(): void {
    section("templateStrings");
    const first: string = "Paari";
    console.log(`Hello ${first}, you are ${25 + 1}`); // => Hello Paari, you are 26
  }

  /** + joins strings (concatenation). */
  concatenation(): void {
    section("concatenation");
    const first: string = "Paari";
    console.log("Hello " + first); // => Hello Paari
    console.log("Hello ".concat(first, "!")); // => Hello Paari!
  }

  /**
   * Strings are IMMUTABLE: you cannot change a character in place.
   * Every method returns a NEW string and leaves the original alone.
   */
  stringsAreImmutable(): void {
    section("stringsAreImmutable");
    const word: string = "hello";
    const upper: string = word.toUpperCase();
    console.log(word); // => hello
    console.log(upper); // => HELLO
    // ERROR-DEMO: word[0] = "J"; // @ERR  index is read-only
  }

  runAll(): void {
    this.lengthAndIndex();
    this.firstAndLastChar();
    this.caseConversion();
    this.searching();
    this.sliceDemo();
    this.trimDemo();
    this.replaceSplitJoin();
    this.templateStrings();
    this.concatenation();
    this.stringsAreImmutable();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new StringsDemo().runAll();
//   One scenario only  : new StringsDemo().sliceDemo();
// ---------------------------------------------------------------
new StringsDemo().runAll();
