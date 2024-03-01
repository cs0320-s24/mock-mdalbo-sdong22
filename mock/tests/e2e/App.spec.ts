import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

test.beforeEach(() => {});

test("on page load, i see a login button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});
/**
 * Tests that the input box doesn't appear until after logging in.
 */
test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

/**
 * Tests that you can type in the box
 */
test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});
/**
 * The button appears once the page is loaded and logged in.
 */
test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
});
/**
 * The counter is working such that when it is clicked, the counter updates
 */
test("after I click the button, its label increments", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
  await page.getByLabel("Command input").fill("Awesome command");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.getByRole("button", { name: "Submitted 1 times" })
  ).toBeVisible();
});
/**
 * When a random command is typed in, we say that we don't understand that command and the
 * counter increments.
 */
test("after I click the button, my command gets pushed", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Awesome command");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("no known function for given command");
});
/**
 * Tests that if we haven't entered anything, clicking the submit button doesn't do anything.
 */
test("if I click button before typing anything, nothing happens", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
});

/**
 * Testing a command string with many words and spaces
 */
test("test many word input", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page
    .getByLabel("Command input")
    .fill("this is nonsense lol lol haha haha so much nonsense hehe");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("no known function for given command");
});

/**
 * Testing empty input
 */
test("test empty input", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toBeUndefined();
});
