/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("box_tarrifs", (table) => {
        table.date("date").notNullable();
        table.date("dt_next_box");
        table.date("dt_till_max");
        table.decimal("box_delivery_base", 12, 2);
        table.smallint("box_delivery_coef_expr");
        table.decimal("box_delivery_liter", 12, 2);
        table.decimal("box_delivery_marketplace_base", 12, 2);
        table.smallint("box_delivery_marketplace_coef_expr");
        table.decimal("box_delivery_marketplace_liter", 12, 2);
        table.decimal("box_storage_base", 12, 2);
        table.smallint("box_storage_coef_expr");
        table.decimal("box_storage_liter", 12, 2);
        table.string("geo_name");
        table.string("warehouse_name").notNullable();
        table.primary(["date", "warehouse_name"]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("box_tarrifs");
}
