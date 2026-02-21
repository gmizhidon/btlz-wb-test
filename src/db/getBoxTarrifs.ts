import knex from "#postgres/knex.js";

export async function getBoxTarrifs() {
    const boxTarrifs = await knex("box_tarrifs")
        .select("*")
        .orderBy("box_delivery_coef_expr", "asc")
        .orderBy("box_delivery_marketplace_coef_expr", "asc")
        .orderBy("box_storage_coef_expr", "asc");
    return boxTarrifs;
}
