import getLatestRepos from "@/utils/getLatestRepos"
import { ArrowUpRightIcon } from "@heroicons/react/20/solid"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"

type Repo = {
	name: string
	description: string
	clone_url: string
}

type Card = {
	name: string
	description: string
	url: string
}

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
]

export const getServerSideProps = (async () => {
	const token = process.env.GITHUB_AUTH_TOKEN || ""
	const repositories = await getLatestRepos("austinthaldorfhuelsbeck", token)

	return {
		props: {
			repositories,
		},
	}
}) satisfies GetServerSideProps<{ repositories: Repo[] }>

export default function Home({
	repositories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<div className="mx-4 flex flex-col gap-8">
			<section className="flex flex-col gap-3">
				<p className="text-stone-500 text-sm">About me</p>
				<p className="text-stone-100 font-extralight">
					Hi there! I'm <strong>Austin</strong>. I'm a self-taught software
					engineer specialized in <strong>frontend</strong> and{" "}
					<strong>full-stack development</strong>. I enjoy{" "}
					<strong>building software</strong> that{" "}
					<strong>solves real problems</strong> and{" "}
					<strong>enhances peoples' lives.</strong>
				</p>
				<p className="text-stone-100 font-extralight">
					I'm currently working on <strong>Vowsuite</strong>, a{" "}
					<strong>CRM and hosting solution</strong> created for wedding industry
					professionals.
				</p>
			</section>

			<section className="">
				<div className="flex w-full flex-col gap-6 sm:flex-row sm:gap-2">
					<div className="flex-1">
						<h1 className="text-sm text-stone-500 pb-4">Case studies</h1>
						<ul className="flex flex-col gap-4">
							{caseStudies.map((card, idx) => (
								<Card card={card} key={idx} />
							))}
						</ul>
					</div>

					<div className="flex-1">
						<h1 className="text-sm text-stone-500 pb-4">Repos</h1>
						<div className="">
							{repositories && (
								<ul className="flex flex-col gap-4">
									{repositories.map((repo: Repo, idx: string) => (
										<RepoCard repo={repo} key={idx} />
									))}
								</ul>
							)}
						</div>
					</div>

					<div className="flex-1">
						<h1 className="text-sm text-stone-500 pb-4">Writing</h1>
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
		</div>
	)
}

const Card = (props: { card: Card }) => {
	return (
		<li className="">
			<Link href={props.card.url}>
				<div className="text-stone-100 underline decoration-stone-500 hover:decoration-stone-100 leading-8">
					{props.card.name}
				</div>
			</Link>
			<p className="text-sm text-stone-400">{props.card.description}</p>
		</li>
	)
}

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
	)
}
