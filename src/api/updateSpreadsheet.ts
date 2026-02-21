import path from "path";
import process from "process";
import { google } from "googleapis";
import { getSpreadsheetIds } from "#db/getSpreadsheetIds.js";
import { getBoxTarrifs } from "#db/getBoxTarrifs.js";
import { date } from "zod";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SERVICE_KEY_PATH = path.join(process.cwd(), "service-key.json");
const SHEET_NAME = "stocks_coefs";

export async function updateSpreadsheet() {
    const auth = new google.auth.GoogleAuth({
        keyFile: SERVICE_KEY_PATH,
        scopes: SCOPES
    });

    const sheets = google.sheets({version: "v4", auth});

    const boxTarrifs = (await getBoxTarrifs()).map(tarrif => ({
        ...tarrif,
        date: tarrif.date.toISOString().split('T')[0],
        dt_next_box: tarrif.dt_next_box ? tarrif.dt_next_box.toISOString().split('T')[0] : null,
        dt_till_max: tarrif.dt_till_max ? tarrif.dt_till_max.toISOString().split('T')[0] : null,
    }));

    if (boxTarrifs.length === 0) {
        return;
    }

    const values = [
        Object.keys(boxTarrifs[0]),
        ...boxTarrifs.map(tarrif => Object.values(tarrif)),
    ];

    let spreadsheetId: string;
    try {
        const spreadsheetIds = await getSpreadsheetIds();
        for (let i = 0; i < spreadsheetIds.length; i++) {
            spreadsheetId = spreadsheetIds[i];
            await sheets.spreadsheets.values.clear({
                spreadsheetId,
                range: SHEET_NAME,
            });

            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: SHEET_NAME,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values
                },
            });
            console.log(`Данные успешно записаны в Google Sheets: ${spreadsheetId}`);
        }
    } catch (err) {
        console.error(`Ошибка записи в Google Sheets: ${spreadsheetId!}`, err);
    }
}
