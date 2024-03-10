import { TRPCError } from "@trpc/server";
import axios from "axios";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type NinjasApiResponse } from "~/types";

const ninjasApiKey = process.env.API_NINJAS_API_KEY ?? "";

const getRandomFact = async (apiKey: string) => {
	const apiUrl = "https://api.api-ninjas.com/v1/facts?limit=1";

	try {
		const res: NinjasApiResponse = await axios.get(apiUrl, {
			headers: {
				"X-Api-Key": apiKey,
			},
		});

		const facts = res.data;
		const firstFact = facts[0];
		return firstFact?.fact ?? "";
	} catch (err) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Failed to fetch random fact",
		});
		return "";
	}
};

export const randomFactRouter = createTRPCRouter({
	get: publicProcedure.query(async () => {
		const fact: string = await getRandomFact(ninjasApiKey);

		return fact;
	}),
});
