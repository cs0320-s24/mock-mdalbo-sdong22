import { expect, test } from "@playwright/test";

test.beforeEach(() => {});

/**
 * Test mode before command
 */
test("mode before command", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByLabel("Command input").fill("myCommand");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  expect(firstChild).toEqual("result: no known function for given command");
});

/**
 * Test mode after command
 */
test("mode after command", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("myCommand");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("result: no known function for given command");
});

/**
 * Test mode then mode
 */
test("mode then mode", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("myCommand");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("no known function for given command");
});
