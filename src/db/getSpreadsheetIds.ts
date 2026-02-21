import knex from "#postgres/knex.js";

export async function getSpreadsheetIds(): Promise<string[]> {
    const spreadsheets = await knex("spreadsheets").select("spreadsheet_id as id");
    return spreadsheets.map(({ id }) => id);
}
