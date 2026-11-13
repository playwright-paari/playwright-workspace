export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

// A named type for a callback: "a function that takes a receipt text and returns nothing".
type ReceiptHandler = (receipt: string) => void;

/**
 * DAY 2 - CLASS 13: FUNCTION PARAMETERS
 *
 * PARAMETER = the labelled box declared in the function    (itemName, quantity, unitPrice)
 * ARGUMENT  = the actual value you pass in when calling    ("notebook", 3, 4.5)
 *
 *   orderTotal( "notebook" ,  3       ,  4.5       )     <- arguments (what you pass)
 *                   |         |          |
 *   (itemName: string, quantity: number, unitPrice: number)   <- parameters (typed boxes)
 *
 * TypeScript checks every argument against its parameter's type BEFORE the code runs.
 *
 * Run this file: npx tsx trainingDay1/13_FunctionParameters.ts
 */
class FunctionParameters {
  /**
   * TYPED PARAMETER: each parameter accepts only the type you declared.
   */
  typedParameter(): void {
    section("typedParameter");
    const greet = (customerName: string): string => `Welcome, ${customerName}!`;
    const square = (n: number): number => n * n;
    const statusText = (isActive: boolean): string => (isActive ? "Active" : "Inactive");
    const countItems = (items: string[]): number => items.length;

    console.log(greet("Maya")); // => Welcome, Maya!
    console.log(square(6)); // => 36
    console.log(statusText(false)); // => Inactive
    console.log(countItems(["a", "b", "c"])); // => 3
    // ERROR-DEMO: greet(42); // @ERR  number is not assignable to string
  }

  /**
   * MULTIPLE PARAMETERS: each has its own name and type.
   * Arguments are matched by POSITION (first with first, second with second ...)
   * and you must pass exactly the right number of them.
   */
  multipleParameters(): void {
    section("multipleParameters");
    const orderTotal = (itemName: string, quantity: number, unitPrice: number): string => {
      const total = quantity * unitPrice;
      return `${quantity} ${itemName}(s) cost $${total.toFixed(2)}`;
    };

    console.log(orderTotal("notebook", 3, 4.5)); // => 3 notebook(s) cost $13.50
    // ERROR-DEMO: orderTotal("notebook", "three", 4.5); // @ERR  second argument must be a number
    // ERROR-DEMO: orderTotal("notebook", 3); // @ERR  a required argument is missing
    // ERROR-DEMO: orderTotal("notebook", 3, 4.5, "extra"); // @ERR  one argument too many
  }

  /**
   * ORDER MATTERS. TypeScript checks TYPES, not meaning.
   * If two parameters have the same type, swapping them compiles fine and gives a wrong answer.
   */
  parameterOrderMatters(): void {
    section("parameterOrderMatters");
    const divide = (dividend: number, divisor: number): number => dividend / divisor;
    console.log(divide(10, 2)); // => 5
    console.log(divide(2, 10)); // => 0.2   (swapped by mistake - no error, wrong result)
  }

  /**
   * CALLBACK: a function passed INTO another function as a parameter.
   *
   *   completeOrder(101, printReceipt)
   *                      |
   *                      +--> printReceipt is handed over as a VALUE (a recipe). It has NOT run yet.
   *
   *   inside completeOrder:   onReceiptReady(receipt)    <- NOW the recipe runs
   *
   * The callback parameter has a type too:  (receipt: string) => void
   *   inputs: one string      output: nothing (void)
   */
  callbackFunction(): void {
    section("callbackFunction");
    const completeOrder = (orderNumber: number, onReceiptReady: (receipt: string) => void): void => {
      const receipt = `Receipt for order #${orderNumber}`;
      onReceiptReady(receipt); // call the callback after the order is complete
    };

    const printReceipt = (receipt: string): void => {
      console.log(receipt); // => Receipt for order #101
    };

    completeOrder(101, printReceipt); // pass the function; don't call it here
  }


  add(): void{
    const add = (a: number, b: number): number=> a+b;
    console.log(add(2,3)); // => 5
    
    const multiply = (multi1:number, addSub:(a:number, b:number)=>number): number => {
      return addSub(multi1, 2) * 3;
    }
    console.log(multiply(2, add)); // => 12

  }

  /**
   * Pass the function itself, NOT its result.
   *   run(sayHi)     passes the recipe
   *   run(sayHi())   runs sayHi right now and passes what it returned (nothing)
   */
  callbackNotCalledYet(): void {
    section("callbackNotCalledYet");
    const run = (task: () => void): void => {
      console.log("before");
      task();
      console.log("after");
    };
    const sayHi = (): void => {
      console.log("hi");
    };

    run(sayHi); // => before ~~ hi ~~ after
    // ERROR-DEMO: run(sayHi()); // @ERR  sayHi() already ran - pass sayHi, not sayHi()
  }

  /**
   * A callback can RETURN a value. The outer function decides when to call it,
   * the callback decides what to do. Swap the callback to change the behaviour.
   */
  callbackWithReturnValue(): void {
    section("callbackWithReturnValue");
    const finalPrice = (price: number, discountRule: (price: number) => number): number => discountRule(price);
    const tenPercentOff = (price: number): number => price * 0.9;
    const flatFiveOff = (price: number): number => price - 5;

    console.log(finalPrice(200, tenPercentOff)); // => 180
    console.log(finalPrice(200, flatFiveOff)); // => 195
    console.log(finalPrice(200, (price) => price / 2)); // => 100   (an arrow function written inline)
  }

  /**
   * A type alias gives the callback shape a name, so you can reuse it.
   *   type ReceiptHandler = (receipt: string) => void;
   */
  namedCallbackType(): void {
    section("namedCallbackType");
    const completeOrder = (orderNumber: number, onReceiptReady: ReceiptHandler): void => {
      onReceiptReady(`Receipt for order #${orderNumber}`);
    };
    const saved: string[] = [];
    const saveReceipt: ReceiptHandler = (receipt) => {
      saved.push(receipt);
    };

    completeOrder(7, saveReceipt);
    completeOrder(8, saveReceipt);
    console.log(saved); // => [ 'Receipt for order #7', 'Receipt for order #8' ]
  }

  /**
   * You already use callbacks all the time:
   *   array methods   forEach, map, filter ...
   *   Playwright      test("name", async ({ page }) => { ... })   <- the arrow function is a callback
   */
  callbacksYouAlreadyUse(): void {
    section("callbacksYouAlreadyUse");
    [1, 2, 3].forEach((n) => {
      console.log("item", n); // => item 1 ~~ item 2 ~~ item 3
    });
    console.log([1, 2, 3].map((n) => n * 10)); // => [ 10, 20, 30 ]
  }

  runAll(): void {
    this.typedParameter();
    this.multipleParameters();
    this.parameterOrderMatters();
    this.callbackFunction();
    this.callbackNotCalledYet();
    this.callbackWithReturnValue();
    this.namedCallbackType();
    this.callbacksYouAlreadyUse();
    this.add();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : new FunctionParameters().runAll();
//   One scenario only  : new FunctionParameters().callbackFunction();
// ---------------------------------------------------------------
new FunctionParameters().runAll();