import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { type InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { LoadingSpinner } from "~/components/Loading";
import { type GitHubRepo } from "~/types";
import { api } from "~/utils/api";
import getLatestRepos from "~/utils/getLatestRepos";
import getRandomFact from "~/utils/getRandomFact";

type CardItem = {
	name: string;
	description: string;
	url: string;
};

// Server-side rendering
export const getStaticProps = async () => {
	const ninjasApiKey = process.env.API_NINJAS_API_KEY ?? "";
	const fact: string = await getRandomFact(ninjasApiKey);
	const repos: GitHubRepo[] | null = await getLatestRepos(
		"austinthaldorfhuelsbeck",
	);

	return {
		props: {
			fact,
			repos,
		},
	};
};

const FeedCard: FC<CardItem> = ({ name, url, description }) => (
	<li className="leading-8">
		<Link
			href={url}
			className="flex text-stone-100 underline decoration-stone-500 hover:decoration-stone-100"
			target={url.startsWith("http") ? "_blank" : undefined}
		>
			{name}
			{url.startsWith("http") && (
				<ArrowUpRightIcon className="my-auto h-4 w-4 text-stone-500" />
			)}
		</Link>
		<p className="text-sm text-stone-400">{description}</p>
	</li>
);

const CaseStudiesFeed = () => {
	const { data, isLoading: caseStudiesLoading } =
		api.caseStudy.getAll.useQuery();

	if (caseStudiesLoading) return <LoadingSpinner size={32} />;

	if (!data) return <></>;

	return (
		<ul className="flex flex-col gap-2">
			{data.map((caseStudy, idx) => {
				const config = {
					...caseStudy,
					url: `/case-studies/${caseStudy.slug}`,
				};
				return <FeedCard key={idx} {...config} />;
			})}
		</ul>
	);
};

const PostsFeed = () => {
	const { data, isLoading: postsLoading } = api.post.getThree.useQuery();

	if (postsLoading) return <LoadingSpinner size={32} />;

	if (!data) return <></>;

	return (
		<ul className="flex flex-col gap-2">
			{data.map((post, idx) => {
				const config = {
					...post,
					url: `/blog/${post.slug}`,
				};
				return <FeedCard key={idx} {...config} />;
			})}
		</ul>
	);
};

const Home = ({
	repos,
	fact,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-8">
				<section className="flex flex-col gap-4 font-extralight text-stone-100">
					<p className="text-sm font-semibold text-stone-500">About me</p>
					<div className="flex flex-row gap-4">
						<div className="flex flex-col gap-4">
							<p>
								<strong>👋 Hi, I&#39;m Austin</strong>. I&#39;m a self-taught
								software engineer specialized in <strong>frontend</strong> and{" "}
								<strong>full-stack development</strong>. I enjoy{" "}
								<strong>building software</strong> that{" "}
								<strong>solves real problems</strong> and{" "}
								<strong>enhances peoples&#39; lives.</strong>
							</p>

							<p>
								I&#39;m currently working on{" "}
								<Link href="/case-studies/vowsuite" className="underline">
									<strong>Vowsuite</strong>
								</Link>
								, a <strong>CRM and hosting solution</strong> created for
								wedding industry professionals.
							</p>
						</div>
						<Image
							src="/images/ath-wedding-portrait.jpg"
							width={100}
							height={100}
							alt="Austin Thaldorf-Huelsbeck"
							className="my-auto hidden h-24 w-24 rounded-full object-cover sm:block"
						/>
					</div>
					{fact && <p>{`By the way, here's a random fact: ${fact} 🤓`}</p>}
				</section>
			</div>
			<div className="flex w-full flex-col gap-6 pb-8 sm:flex-row sm:gap-2 sm:pb-4">
				<div className="flex-1">
					<h1 className="pb-4 text-sm font-semibold text-stone-500">
						Case Studies
					</h1>
					<CaseStudiesFeed />
				</div>
				<div className="flex-1">
					<h1 className="pb-4 text-sm font-semibold text-stone-500">
						Projects
					</h1>
					{repos && (
						<ul className="flex flex-col gap-2">
							{repos.map((repo, idx) => {
								const config = { ...repo, url: repo.clone_url };
								return <FeedCard key={idx} {...config} />;
							})}
						</ul>
					)}
				</div>
				<div className="flex-1">
					<h1 className="pb-4 text-sm font-semibold text-stone-500">Writing</h1>
					<PostsFeed />
					<FeedCard
						name="All Writing"
						url="/blog"
						description="Check out more posts"
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
