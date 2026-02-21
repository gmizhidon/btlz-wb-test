import { getBoxTarrifs } from "#api/getBoxTarrifs.js";
import cron from "node-cron";
import { upsertBoxTarrifs } from "#db/upsertBoxTarrifs.js";
import { updateSpreadsheet } from "#api/updateSpreadsheet.js";

export function runner() {
    // cron.schedule("0 * * * *", async () => {
    //     const date = new Date().toISOString().split('T')[0];
    //     const boxTarrifs = await getBoxTarrifs({ date });
    //     if (boxTarrifs) {
    //         if (boxTarrifs) {
    //             upsertBoxTarrifs(date, boxTarrifs);
    //             await updateSpreadsheet();
    //         }
    //     }
    // });

    (async () => {
        const date = new Date().toISOString().split('T')[0];
        const boxTarrifs = await getBoxTarrifs({ date });
        if (boxTarrifs) {
            upsertBoxTarrifs(date, boxTarrifs);
            await updateSpreadsheet();
        }
    })();
}
