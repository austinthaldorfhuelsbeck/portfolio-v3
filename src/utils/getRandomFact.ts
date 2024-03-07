import axios from "axios";

const getRandomFact = async (apiKey: string) => {
	const apiUrl = "https://api.api-ninjas.com/v1/facts?limit=1";

	try {
		const res = await axios.get(apiUrl, {
			headers: {
				"X-Api-Key": apiKey,
			},
		});

		const fact = res.data[0].fact;
		return fact;
	} catch (err) {
		console.log(err);
	}
};

export default getRandomFact;
