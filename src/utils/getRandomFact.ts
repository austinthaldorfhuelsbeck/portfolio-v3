import axios from "axios";
import { type NinjasApiResponse } from "~/types";

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
		console.log(err);
		return "";
	}
};

export default getRandomFact;
