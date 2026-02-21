import fs from "fs";
import path from "path";
import process from "process";

const spreadsheets = JSON.parse(fs.readFileSync(path.join(process.cwd(), "spreadsheets.json"), "utf-8"));

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */

export async function seed(knex) {
    await knex("spreadsheets")
        .insert(spreadsheets.map((/** @type {string} */ spreadsheet_id) => ({ spreadsheet_id })))
        .onConflict(["spreadsheet_id"])
        .ignore();
}
