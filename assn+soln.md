# Assignment: Applied ECP and BVA

Q1. [5 marks] A coworker said they spent several hours writing a thourogh set of tests against a new specification. Once the implementations was complete, they ran the tests and they all passed. Your coworker was upset since they felt that all of the work they put into creating the test suite was wasted since it didn't catch any bugs. Do you agree with your coworker that creating the test suite was wasted effort? Why or why not?

> I do not agree with the coworker: systematically creating a test suite from the specification (using ECP and BVA) gives you and your team confidence that the implementation is actually correct. You also know that you are protected from introducing regressions when making future changes to the system. And, through the process of translating the specification into concrete test cases, either identified missing or contradictory specifications, or verified that non were present.

Q2. Consider the specification for the `isValidEmail` function below.

```ts
/**
 * Checks whether the provided email address adheres to the syntax local@domin, which is described below.
 *      
 * The local part must be between 1 and 12 characters and may only consist of:
 *  - Uppercase and lowercase Latin letters A to Z and a to z;
 *  - Digits 0 to 9;
 *  - dot ., provided that it is not the first or last character and provided also that it does not appear consecutively.
 * 
 *  The domain part must be between 3 and 20 characters and may only consist of:
 *   - Uppercase and lowercase Latin letters A to Z and a to z;
 *   - Digits 0 to 9, provided that they are not all-numeric;
 *   - Hyphen -, provided that it is not the first or last character;
 *  AND end with one of: .com .edu .org
 */
function isValidEmail(email: string): boolean;
```

Given the following test suite for `isValidEmail`:

```ts
assert(isValidEmail("simple@example.com", true))
assert(isValidEmail("john.doe@my-domain.com"), true) 
assert(isValidEmail("common1234@example.org"), true)
assert(isValidEmail("0@fake.org"), false)
assert(isValidEmail("hello@me.com"), true)
assert(isValidEmail("J.smith@a-a.org"), false)
assert(isValidEmail(".private@proton-mail.com"), false)
assert(isValidEmail("you+me@hookup.com"), false)
asert(isValidEmail("first/last@email.org"), false)
assert(isValidEmail("r.r.martin@tol.org"), false)
assert(isValidEmail("joe@live.ca"), true)
assert(isValidEmail("bob@1-11.org"), false)
```

A. [8 marks] **Test suite completeness.** What test cases are missing from the test suite, if any? 
> The test suite is missing _at least_ the following cases:
>  1. empty local
>  2. long (13+ chars) local
>  3. consecutive dots in local
>  4. only dot local (e.g. ".@example.org") 
>  5. uppercase letter in domain 
>  6. all-numeric domain
>  7. domain ending with .edu
>  8. domain starting with hyhpen

B. [4 marks] **Test suite correctness.** What test cases assert an incorrect result, if any?
> The following tests are incorrect:
> ```ts
> assert(isValidEmail("0@fake.org"), false) // this is valid (one digit local-part OK)
> assert(isValidEmail("hello@me.com"), true) // domain too short
> assert(isValidEmail("J.smith@a-a.org"), false) // this is valid (middle hyphen OK)
> assert(isValidEmail("r.r.martin@tol.org"), false) // this is valid (two dots OK)
> assert(isValidEmail("joe@live.ca"), true)  // .ca is not accepted
> assert(isValidEmail("bob@1-11.org"), false) // all-numeric with a hyphen is OK
> ```

C. [1 mark] Assuming this test fails `assert(isValidEmail("tweleve.long@name.com"), false)`, what is likely the cause?
> Given that the length of the local-part of the email is on the boundary of the allowed length, it is likely that the check in the implementation of `isValidEmail` uses `<` instead of `<=` (an off-by-one error).

D. [1 mark] What ambiguity, if any, is present in the specification?
> It is not clear whether a hyphen is allowed in the domain before the suffix (e.g., .com). You might have also wondered whether the length of the domain includes the suffix (if it does, why is the minimum length allowed to be 3 chars?).



Q3. [25 marks] Write a complete test suite for the `POS` methods below using equivalence class partioning with boundary value analysis.

For full marks, your test suite must:
- fully cover the input space,
- fully cover the output space,
- test all boundaries cases, and
- not contain redundant tests.

Note: this question is autograded. If your test suite fails to execute, you will receive a grade of 0. Otherwise, your tests are first executed against a correct implementation, and then run repeatedly against buggy implementations. At least one of your tests which passed against the correct implementation should fail against each of the buggy implementations. Your grade is calculated from the number of buggy implementations your tests identify inversely weighted by the number of tests you wrote beyond the minimum required. You may submit one revised solution for additional grades with any improvement scaled by 50%.

```ts
interface Product {
  /** max length is 12 chars */
  name: string; 
  quantity: number;
  /** must be positive */
  price: number;
}

/**
 * A point-of-sales system that handles select foregin currency exchange.
 */ 
interface POS {
  /**
   * Computes the optimal quantities of each domination that sum up the difference between the amountDue and amountPaid.
   * Throws an error if amountPaid < amountDue.
   */
  calculateChange(amountDue: number, amountPaid: number):
    {twentites: number, tens: number, fives: number, toonies: numbers, loonies: number, quarters: number, dimes: number, nickels: number};

  /**
   * Search for products by providing a query. Products can be filtered by name, price, and stock levels.
   * 
   * The query must be at least 3 chars long and may have the following components:
   *  - a search string enclosed in double quotes
   *  - `price[op][number]`
   *  - `stock[op][number]`
   * where `[op]` can be one of `<`, `=`, or `>`.
   * 
   * EXAMPLE: 
   * The query `diaper price<15.00 stock>5` would return all products whose name contains `diaper`, 
   * price is less than 15.00, and stock is greater than 5.
   */
  findProduct(query: string): Product[];
  
  /**
   * Creates a formatted receipt for the provided products.
   * 
   * The receipt includes the following details:
   * Header: "Receipt"
   * Product List:
   *   Each product should be listed with its name, quantity, unit price, and total price (quantity * unit price).
   * Total Amount: The total amount for all products.
   * Footer: "Thank you for your purchase!"
   * 
   * EXAMPLE:
   * 
   * Receipt
   * --------------------------------------------------
   * Product Name   Quantity   Unit Price   Total Price
   * --------------------------------------------------
   * Apple          2          $1.00        $2.00
   * Banana         3          $0.50        $1.50
   * Orange         1          $1.25        $1.25
   * --------------------------------------------------
   * Total Amount: $4.75
   * -------------------------
   * Thank you for your purchase!
   * 
   */
  printReceipt(productsPurchased: Product[]): string;
}
```

> The full test suite is in `POS.test.ts`.