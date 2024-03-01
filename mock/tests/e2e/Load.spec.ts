import { expect, test } from "@playwright/test";

test.beforeEach(() => {});

/**
 * Brief - load a valid csv file
 */
test("b test valid load", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
});

/**
 * Verbose - load a valid csv file
 */
test("v test valid load", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("command: load csv1");
  expect(secondChild).toEqual("result: succesfully loaded: csv1");
});

/**
 * Brief - Tests that we get the correct error message when the csv file that we are attempting
 * to load isn't in the mocked dataset.
 */
test("b test invalid load", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load IDOntExist");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(
    "sorry " + "IDOntExist" + " does not exists in dataset"
  );
});

/**
 * Verbose - Tests that we get the correct error message when the csv file that we are attempting
 * to load isn't in the mocked dataset.
 */
test("v test invalid load", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load IDOntExist");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual(
    "result: sorry " + "IDOntExist" + " does not exists in dataset"
  );
});

/**
 * Tests that when we load two different valid csv files, the loaded file changes.
 */
test("chaining loaded", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  expect(firstChild).toEqual("succesfully loaded: csv1");

  await page.getByLabel("Command input").fill("load csv2");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[5]?.textContent;
  });
  expect(secondChild).toEqual("result: succesfully loaded: csv2");
});
