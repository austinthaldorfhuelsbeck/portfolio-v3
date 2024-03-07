import axios from "axios";

const getLatestRepos = async (username: string) => {
	const apiUrl = `https://api.github.com/search/repositories?q=user:${username}+sort:author-date-asc`;

	try {
		const res = await axios.get(apiUrl);
		const repos = res.data.items;
		const latestRepos = repos.splice(0, 4);
		return latestRepos;
	} catch (err) {
		console.log(err);
	}
};

export default getLatestRepos;
