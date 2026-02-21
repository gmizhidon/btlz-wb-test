import env from "#config/env/env.js";
import { z } from "zod";

const responseSchema = z.object({
    response: z.object({
        data: z.object({
            dtNextBox: z.string(),
            dtTillMax: z.string(),
            warehouseList: z.array(z.object({
                boxDeliveryBase: z.string(),
                boxDeliveryCoefExpr: z.string(),
                boxDeliveryLiter: z.string(),
                boxDeliveryMarketplaceBase: z.string(),
                boxDeliveryMarketplaceCoefExpr: z.string(),
                boxDeliveryMarketplaceLiter: z.string(),
                boxStorageBase: z.string(),
                boxStorageCoefExpr: z.string(),
                boxStorageLiter: z.string(),
                geoName: z.string(),
                warehouseName: z.string()
            }))
        }),
    }),
});

export type IGetBoxTarrifsData = z.infer<typeof responseSchema>["response"]["data"];

interface IGetBoxTarrifsQueryParams {
    date: string
}

export async function getBoxTarrifs({ date }: IGetBoxTarrifsQueryParams): Promise<IGetBoxTarrifsData> {
    try {
        const params = new URLSearchParams();
        params.append("date", date);
        const response = await fetch(`https://common-api.wildberries.ru/api/v1/tariffs/box?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': env.WB_API_KEY,
            },
        });
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error(`Неверный запрос: ${response.status}`);
            }
            if (response.status === 401) {
                throw new Error(`Ошибка авторизации: ${response.status}`);
            }
            if (response.status === 429) {
                throw new Error(`Превышен лимит запросов: ${response.status}`);
            }
            throw new Error(`Ошибка HTTP: ${response.status}`);
        };
        const validatedResponse = responseSchema.parse(await response.json());
        return validatedResponse.response.data;
    } catch (e) {
        console.error("Error fetching box tarrifs:", e);
        throw e;
    }
}
