import { expect, test } from "@playwright/test";

/**
 * Brief: Tests when there is a valid search, that a valid row is shown.
 */
test("b-valid search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page.getByLabel("Command input").fill("search 2 target");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("searchingforcsv12target");
});
/**
 * Verbose: Tests when there is a valid search, that a valid row is shown.
 */
test("v-valid search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page.getByLabel("Command input").fill("search 2 target");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("result: searchingforcsv12target");
});
/**
 * Brief: Tests many arguments but valid search
 */
test("b-valid search too many args", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page
    .getByLabel("Command input")
    .fill("search 2 target more words here");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("searchingforcsv12target");
});
/**
 * Verbose: Tests many arguments but valid search
 */
test("v-valid search too many args", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page
    .getByLabel("Command input")
    .fill("search 2 target more words here");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("result: searchingforcsv12target");
});
/**
 * Brief: Tests that the correct error output is shown when no value is specified for searching
 */
test("b-no value search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page.getByLabel("Command input").fill("search 2");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("please specify a value to search for");
});
/**
 * Verbose: Tests that the correct error output is shown when no value is specified for searching
 */
test("v-no value search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page.getByLabel("Command input").fill("search 2");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  const commandChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });
  expect(commandChild).toEqual("command: search 2");
  expect(secondChild).toEqual("result: please specify a value to search for");
});
/**
 * Brief: tests correct error message when no value or column specified
 */
test("b-no value or column search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page.getByLabel("Command input").fill("search");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("please specify both a column and value");
});
/**
 * Verbose: tests correct error message when no value or column specified
 */
test("v-no value or column search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page.getByLabel("Command input").fill("search");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("result: please specify both a column and value");
});
/**
 * Brief: Test search when there is no file loaded
 */
test("b-search with no file loaded", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("search 2 target");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("please load a valid CSV file");
});
/**
 * Verbose: Test search when there is no file loaded
 */
test("v-search with no file loaded", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("search 2 target");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("result: please load a valid CSV file");
});
