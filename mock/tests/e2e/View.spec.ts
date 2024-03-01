import { expect, test } from "@playwright/test";

/**
 * Tests normal view for valid csv in brief
 */
test("brief viewing normally", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("12345Thesongremainsthesame.");
});
/**
 * Tests normal view for valid csv in verbose
 */
test("verbose viewing normally", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("result: succesfully loaded: csv1");
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[5]?.textContent;
  });
  expect(secondChild).toEqual("result: 12345Thesongremainsthesame.");
});
/**
 * In Brief: Tests that correct error message is shown when view is called and nothing is loaded
 */
test("brief-view without loading", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(secondChild).toEqual("sorry data not loaded");
});
/**
 * In verbose: Tests that correct error message is shown when view is called and nothing is loaded
 */
test("verbose- view without loading", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("result: sorry data not loaded");
});
/**
 * Brief- Test that the outputted table is different after changing the loaded csv
 */
test("b-changing load between views", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("12345Thesongremainsthesame.");

  await page.getByLabel("Command input").fill("load csv2");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();

  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  const newlyLoaded = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  expect(newlyLoaded).toEqual("10987SecondCSVfilebka");
});
/**
 * Verbose-Test that the outputted table is different after changing the loaded csv
 */
test("v-changing load between views", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load csv1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("succesfully loaded: csv1");
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("12345Thesongremainsthesame.");

  await page.getByLabel("Command input").fill("load csv2");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();

  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 4 times" }).click();
  const newlyLoaded = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[7]?.textContent;
  });
  expect(newlyLoaded).toEqual("result: 10987SecondCSVfilebka");
});
