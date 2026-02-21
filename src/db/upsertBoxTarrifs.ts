import { IGetBoxTarrifsData } from "#api/getBoxTarrifs.js";
import knex from "#postgres/knex.js";
import { convertStringToNumber } from "#utils/convertStringToNumber.js";
import { isValidDate } from "#utils/isValidDate.js";

export async function upsertBoxTarrifs(date: string, boxTarrifs: IGetBoxTarrifsData) {
    try {
        await knex("box_tarrifs")
            .insert(boxTarrifs.warehouseList.map(w => ({
                date,
                dt_next_box: isValidDate(boxTarrifs.dtNextBox) ? boxTarrifs.dtNextBox : null,
                dt_till_max: isValidDate(boxTarrifs.dtTillMax) ? boxTarrifs.dtTillMax : null,
                box_delivery_base: convertStringToNumber(w.boxDeliveryBase),
                box_delivery_coef_expr: convertStringToNumber(w.boxDeliveryCoefExpr),
                box_delivery_liter: convertStringToNumber(w.boxDeliveryLiter),
                box_delivery_marketplace_base: convertStringToNumber(w.boxDeliveryMarketplaceBase),
                box_delivery_marketplace_coef_expr: convertStringToNumber(w.boxDeliveryMarketplaceCoefExpr),
                box_delivery_marketplace_liter: convertStringToNumber(w.boxDeliveryMarketplaceLiter),
                box_storage_base: convertStringToNumber(w.boxStorageBase),
                box_storage_coef_expr: convertStringToNumber(w.boxStorageCoefExpr),
                box_storage_liter: convertStringToNumber(w.boxStorageLiter),
                geo_name: w.geoName,
                warehouse_name: w.warehouseName,
            })))
            .onConflict(["date", "warehouse_name"])
            .merge();
        console.log("Box tarrifs upserted successfully");
    } catch (e) {
        console.error("Error upserting box tarrifs:", e);
        throw e;
    }
}
