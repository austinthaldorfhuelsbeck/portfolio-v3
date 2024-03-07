import axios from "axios";
import { type GitHubRepo, type GithubApiResponse } from "~/types";

const getLatestRepos = async (
	username: string,
): Promise<GitHubRepo[] | null> => {
	const apiUrl = `https://api.github.com/search/repositories?q=user:${username}+sort:author-date-asc`;

	try {
		const res: GithubApiResponse = await axios.get(apiUrl);
		const repos = res.data.items;
		const latestRepos = repos.slice(0, 4);

		return latestRepos;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export default getLatestRepos;
