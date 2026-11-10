export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 8: CONDITIONS - making decisions
 *
 *   if / else if / else     choose one path
 *   ternary                 a one-line if/else
 *   switch                  pick one of many fixed values
 *
 *        score >= 90 ? --yes--> "Grade A"
 *            | no
 *        score >= 60 ? --yes--> "Grade B"
 *            | no
 *        "Grade C"
 *
 * Run this file:  npx tsx training/day2/08_ConditionsDemo.ts
 */
class ConditionsDemo {
  /** if / else: one of two paths runs. */
  ifElse(): void {
    section("ifElse");
    const age: number = 20;
    if (age >= 18) {
      console.log("Adult"); // => Adult
    } else {
      console.log("Minor");
    }
  }

  /** else-if ladder: checked top to bottom, the FIRST true branch runs, the rest are skipped. */
  elseIfLadder(): void {
    section("elseIfLadder");
    const grade = (score: number): string => {
      if (score >= 90) {
        return "Grade A";
      } else if (score >= 60) {
        return "Grade B";
      } else {
        return "Grade C";
      }
    };
    console.log(grade(95)); // => Grade A
    console.log(grade(72)); // => Grade B
    console.log(grade(40)); // => Grade C
  }

  /** Ternary: condition ? valueIfTrue : valueIfFalse. Good for short, simple choices. */
  ternary(): void {
    section("ternary");
    const score: number = 72;
    const result: string = score >= 40 ? "Pass" : "Fail";
    console.log(result); // => Pass
  }

  /** switch: compare one value against many cases. break stops the fall-through. */
  switchCase(): void {
    section("switchCase");
    const day: string = "Fri";
    switch (day) {
      case "Mon":
        console.log("Start of week");
        break;
      case "Fri":
        console.log("End of week"); // => End of week
        break;
      default:
        console.log("Midweek");
    }
  }

  /** Grouped cases: several values share one result (fall-through used on purpose). */
  switchGrouped(): void {
    section("switchGrouped");
    const daysIn = (month: string): number => {
      switch (month) {
        case "Feb":
          return 28;
        case "Apr":
        case "Jun":
        case "Sep":
        case "Nov":
          return 30;
        default:
          return 31;
      }
    };
    console.log(daysIn("Feb")); // => 28
    console.log(daysIn("Jun")); // => 30
    console.log(daysIn("Jan")); // => 31
  }

  /**
   * Truthy and falsy: in an if(), every value counts as true or false.
   *
   *   FALSY (act as false) : false  0  ""  null  undefined  NaN
   *   everything else is TRUTHY, even "0", [] and {}
   */
  truthyFalsy(): void {
    section("truthyFalsy");
    console.log(Boolean(0)); // => false
    console.log(Boolean("")); // => false
    console.log(Boolean(null)); // => false
    console.log(Boolean(undefined)); // => false
    console.log(Boolean("0")); // => true
    console.log(Boolean([])); // => true
    console.log(Boolean({})); // => true
  }

  /** Combining conditions with && and ||. */
  combinedConditions(): void {
    section("combinedConditions");
    const age: number = 25;
    const hasId: boolean = true;
    if (age >= 18 && hasId) {
      console.log("Entry allowed"); // => Entry allowed
    }
    if (age < 18 || !hasId) {
      console.log("never printed");
    }
  }

  runAll(): void {
    this.ifElse();
    this.elseIfLadder();
    this.ternary();
    this.switchCase();
    this.switchGrouped();
    this.truthyFalsy();
    this.combinedConditions();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new ConditionsDemo().runAll();
//   One scenario only  : new ConditionsDemo().switchCase();
// ---------------------------------------------------------------
new ConditionsDemo().runAll();
