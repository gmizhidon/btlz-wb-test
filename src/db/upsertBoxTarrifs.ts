import { IGetBoxTarrifsData } from "#api/getBoxTarrifs.js";
import knex from "#postgres/knex.js";

export async function upsertBoxTarrifs(date: string, boxTarrifs: IGetBoxTarrifsData) {
    try {
        await knex("box_tarrifs").insert(boxTarrifs.warehouseList.map(w => ({
                date,
                dt_next_box: boxTarrifs.dtNextBox || null,
                dt_till_max: boxTarrifs.dtTillMax,
                box_delivery_base: w.boxDeliveryBase,
                box_delivery_coef_expr: w.boxDeliveryCoefExpr,
                box_delivery_liter: w.boxDeliveryLiter,
                box_delivery_marketplace_base: w.boxDeliveryMarketplaceBase,
                box_delivery_marketplace_coef_expr: w.boxDeliveryMarketplaceCoefExpr,
                box_delivery_marketplace_liter: w.boxDeliveryMarketplaceLiter,
                box_storage_base: w.boxStorageBase,
                box_storage_coef_expr: w.boxStorageCoefExpr,
                box_storage_liter: w.boxStorageLiter,
                geo_name: w.geoName,
                warehouse_name: w.warehouseName,
            })))
            .onConflict(["date", "warehouse_name"])
            .merge()
    } catch (e) {
        console.error("Error updating box tarrifs:", e);
    }
}
