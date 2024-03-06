import axios from "axios"

const getLatestRepos = async (username: string, token: string) => {
	// console.log("data", data);
	try {
		// let token = `token ${process.env.GITHUB_AUTH_TOKEN}`;
		// console.log("TOKEN", token);

		if (token) {
			const res = await axios.get(
				`https://api.github.com/search/repositories?q=user:${username}+sort:author-date-asc`,
				{
					headers: {
						Authorization: `token ${token}`,
					},
				},
			)
			let repos = res.data.items
			let latestRepos = repos.splice(0, 3)
			// console.log("LATEST 6 repos", latestRepos);
			return latestRepos
		} else {
			const res = await axios.get(
				`https://api.github.com/search/repositories?q=user:${username}+sort:author-date-asc`,
			)
			let repos = res.data.items
			let latestRepos = repos.splice(0, 3)
			return latestRepos
		}
	} catch (err) {
		console.log(err)
	}
}

export default getLatestRepos
