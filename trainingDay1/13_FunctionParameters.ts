export {}; // makes this file a "module", so names here never clash with other files

function section(title: string): void {
  console.log(`\n--- ${title} ---`);
}

/**
 * DAY 2 - CLASS 13: FUNCTION PARAMETERS
 *
 * A parameter is an input a function receives from the code that calls it.
 * TypeScript lets us describe what kind of value each parameter accepts.
 *
 * Run this file: npx tsx trainingDay1/13_FunctionParameters.ts
 */
class TypedParameterDemo {
  /**
   * A typed parameter accepts only the declared type.
   * Here, `customerName` must be a string.
   */
  greetCustomer(): void {
    section("Typed parameter");
    const greet = (customerName: string): string => `Welcome, ${customerName}!`;

    console.log(greet("Maya")); // => Welcome, Maya!
    // ERROR-DEMO: greet(42); // @ERR  number is not assignable to string
  }

  runAll(): void {
    this.greetCustomer();
  }
}

class MultipleParametersDemo {
  /**
   * A function can receive several parameters.
   * Each parameter has its own name and type, and callers pass them in order.
   */
  calculateOrderTotal(): void {
    section("Multiple parameters");
    const orderTotal = (itemName: string, quantity: number, unitPrice: number): string => {
      const total = quantity * unitPrice;
      return `${quantity} ${itemName}(s) cost $${total.toFixed(2)}`;
    };

    console.log(orderTotal("notebook", 3, 4.5)); // => 3 notebook(s) cost $13.50
    // ERROR-DEMO: orderTotal("notebook", "three", 4.5); // @ERR  second argument must be a number
  }

  runAll(): void {
    this.calculateOrderTotal();
  }
}

class CallbackFunctionDemo {
  /**
   * A callback is a function passed into another function.
   * `onReceiptReady` is itself a typed parameter: it accepts a receipt string
   * and does not return a value.
   */
  processOrder(): void {
    section("Callback function");
    const completeOrder = (
      orderNumber: number,
      onReceiptReady: (receipt: string) => void,
    ): void => {
      const receipt = `Receipt for order #${orderNumber}`;
      onReceiptReady(receipt); // call the callback after the order is complete
    };

    const printReceipt = (receipt: string): void => {
      console.log(receipt); // => Receipt for order #101
    };

    completeOrder(101, printReceipt); // pass the function; don't call it here
  }

  runAll(): void {
    this.processOrder();
  }
}

// ---------------------------------------------------------------
// HOW TO RUN
//   All scenarios      : runFunctionParameterDemos();
//   One scenario only  : new TypedParameterDemo().runAll();
// ---------------------------------------------------------------
function runFunctionParameterDemos(): void {
  new TypedParameterDemo().runAll();
  new MultipleParametersDemo().runAll();
  new CallbackFunctionDemo().runAll();
}

runFunctionParameterDemos();
