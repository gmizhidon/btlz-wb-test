import { getBoxTarrifs } from "#api/getBoxTarrifs.js";
import cron from "node-cron";
import { upsertBoxTarrifs } from "#db/upsertBoxTarrifs.js";
import { updateSpreadsheet } from "#api/updateSpreadsheet.js";
import { retry } from "#utils/retry.js";

export function runner() {
    // run(); // для тестирования

    cron.schedule("0 * * * *", run);
}

async function run() {
    const date = new Date().toISOString().split('T')[0];
    const boxTarrifs = await retry(() => getBoxTarrifs({ date }), 3, 60_000, "Превышен лимит запросов: 429");
    await upsertBoxTarrifs(date, boxTarrifs);
    await updateSpreadsheet();
}
