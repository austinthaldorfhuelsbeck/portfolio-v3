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

export type Frontmatter = Record<string, string>;

export interface PostOrCaseStudyContent {
	frontmatter: Frontmatter;
	contentHtml: string;
}

export interface PostOrCaseStudy extends PostOrCaseStudyContent {
	// Add other properties from your post or case study here
	id: string;
	name: string;
	slug: string;
	// Include other fields as needed
}