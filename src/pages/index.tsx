import getLatestRepos from "@/utils/getLatestRepos";
import getRandomFact from "@/utils/getRandomFact";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";

// Data
type Repo = {
	name: string;
	description: string;
	clone_url: string;
};

type Card = {
	name: string;
	description: string;
	url: string;
};

const caseStudies: Card[] = [
	{
		name: "Vowsuite",
		description:
			"A CRM and hosting solution for wedding industry professionals.",
		url: "/case-studies/vowsuite",
	},
	{
		name: "Sculpture",
		description: "A web app for artists to showcase their work.",
		url: "/case-studies/sculpture",
	},
	{
		name: "Covid-19",
		description: "A web app to track the spread of Covid-19.",
		url: "/case-studies/covid-19",
	},
];

const blogs: Card[] = [
	{
		name: "How to code",
		description: "A guide on how to code.",
		url: "/writing/how-to-code",
	},
	{
		name: "How to design",
		description: "A guide on how to design.",
		url: "/writing/how-to-design",
	},
	{
		name: "How to build",
		description: "A guide on how to build.",
		url: "/writing/how-to-build",
	},
];

// Server-side rendering
export const getStaticProps = async () => {
	const ninjasApiKey = process.env.API_NINJAS_API_KEY || "";
	const repos = await getLatestRepos("austinthaldorfhuelsbeck");
	const fact = await getRandomFact(ninjasApiKey);

	return {
		props: {
			repos,
			fact,
		},
	};
};

// Components
const Card = (props: { card: Card }) => {
	return (
		<li className="leading-8">
			<Link
				href={props.card.url}
				className="text-stone-100 underline decoration-stone-500 hover:decoration-stone-100"
			>
				{props.card.name}
			</Link>
			<p className="text-sm text-stone-400">{props.card.description}</p>
		</li>
	);
};

const RepoCard = (props: { repo: Repo }) => {
	return (
		<li className="">
			<Link href={props.repo.clone_url} target="_blank">
				<div className="text-stone-100 underline decoration-stone-500 hover:decoration-stone-100 flex leading-8">
					{props.repo.name}
					<ArrowUpRightIcon className="w-4 h-4 my-auto text-stone-500" />
				</div>
			</Link>
			<p className="text-sm text-stone-400">{props.repo.description}</p>
		</li>
	);
};

const PageContent = (props: { repos: Repo[]; blogs: Card[] }) => {
	return (
		<section>
			<div className="flex w-full flex-col gap-6 sm:flex-row sm:gap-2">
				<div className="flex-1">
					<h1 className="text-sm text-stone-500 pb-4 font-semibold">
						Case studies
					</h1>
					<ul className="flex flex-col gap-4">
						{caseStudies.map((card, idx) => (
							<Card card={card} key={idx} />
						))}
					</ul>
				</div>

				<div className="flex-1">
					<h1 className="text-sm text-stone-500 pb-4 font-semibold">Repos</h1>
					<div className="">
						{props.repos && (
							<ul className="flex flex-col gap-4">
								{props.repos.map((repo, idx) => (
									<RepoCard repo={repo} key={idx} />
								))}
							</ul>
						)}
					</div>
				</div>

				<div className="flex-1">
					<h1 className="text-sm text-stone-500 pb-4 font-semibold">Writing</h1>
					<div className="">
						{props.blogs && (
							<ul className="flex flex-col gap-4">
								{props.blogs.map((card, idx) => (
									<Card card={card} key={idx} />
								))}
							</ul>
						)}
					</div>
					<Card
						card={{
							name: "All writing",
							description: "My thoughts on code and design.",
							url: "/writing",
						}}
					/>
				</div>
			</div>
		</section>
	);
};

// Page
const Home = ({
	repos,
	fact,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
	return (
		<div className="mx-4 flex flex-col gap-8">
			<section className="flex flex-col gap-4 text-stone-100 font-extralight">
				<p className="text-stone-500 text-sm font-semibold">About me</p>
				<div className="flex flex-row gap-4">
					<p>
						Hi there! I'm <strong>Austin</strong>. I'm a self-taught software
						engineer specialized in <strong>frontend</strong> and{" "}
						<strong>full-stack development</strong>. I enjoy{" "}
						<strong>building software</strong> that{" "}
						<strong>solves real problems</strong> and{" "}
						<strong>enhances peoples' lives.</strong>
					</p>
					<Image
						src="/images/ath-wedding-portrait.jpg"
						width={100}
						height={100}
						alt="Austin Thaldorf-Huelsbeck"
						className="rounded-full object-cover h-24 w-24 my-auto"
					/>
				</div>
				<p>
					I'm currently working on{" "}
					<Link href="/case-studies/vowsuite" className="underline">
						<strong>Vowsuite</strong>
					</Link>
					, a <strong>CRM and hosting solution</strong> created for wedding
					industry professionals.
				</p>
				{fact && <p>{`By the way, here's a random fact: ${fact}. 🤓`}</p>}
			</section>
			<PageContent repos={repos} blogs={blogs} />
		</div>
	);
};

export default Home;
