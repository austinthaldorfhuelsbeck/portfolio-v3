import { TRPCError } from "@trpc/server";
import axios from "axios";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
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
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Failed to fetch latest repos",
		});
		return null;
	}
};

export const repoRouter = createTRPCRouter({
	getLatest: publicProcedure.query(async () => {
		const repos = await getLatestRepos("austinthaldorfhuelsbeck");

		return repos;
	}),
});
