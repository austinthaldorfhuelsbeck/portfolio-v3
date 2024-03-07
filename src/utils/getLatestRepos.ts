import axios from "axios";

interface GitHubRepo {
	name: string;
	description: string;
	clone_url: string;
}

const getLatestRepos = async (
	username: string,
): Promise<GitHubRepo[] | null> => {
	const apiUrl = `https://api.github.com/search/repositories?q=user:${username}+sort:author-date-asc`;

	try {
		const res = await axios.get(apiUrl);
		const repos: GitHubRepo[] = res.data.items.splice(0, 4);
		return repos;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export default getLatestRepos;
