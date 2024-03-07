import type Error from "next/error";

export type GithubApiResponse = {
	data: {
		total_count: number;
		incomplete_results: boolean;
		items: GitHubRepo[];
	};
};

export type GitHubRepo = {
	name: string;
	description: string;
	clone_url: string;
};

export type Fact = {
	fact: string;
};

export type NinjasApiResponse = {
	data: Fact[];
	error?: Error;
};
