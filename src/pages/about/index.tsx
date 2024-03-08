import { ArrowDownTrayIcon, LinkIcon } from "@heroicons/react/20/solid";
import { type NextPage } from "next";
import Link from "next/link";
import AnimateWrapper from "~/components/AnimateWrapper";
import { api } from "~/utils/api";

// Page
const About: NextPage = () => {
	const { data, isLoading: experiencesLoading } =
		api.experience.getAll.useQuery();

	if (experiencesLoading || !data) return <></>;

	return (
		<div className="flex flex-col gap-6">
			<Link
				href="#"
				className="mx-auto inline-flex items-center rounded-lg border border-stone-600 bg-stone-800 px-4 py-2 text-sm font-medium text-stone-400 hover:bg-stone-700 hover:text-white focus:text-stone-500 focus:outline-none focus:ring-4 focus:ring-stone-700 sm:ml-0"
			>
				<ArrowDownTrayIcon className="mr-2 h-4 w-4" />
				Download CV
			</Link>
			<ol className="relative m-0 mx-3 mt-8 list-none border-s border-stone-700">
				{data.map((experience, idx) => (
					<li key={idx} className="mb-14 ms-6">
						<AnimateWrapper>
							<h1 className="-z-10 -mb-9 block -translate-x-10 -translate-y-8 text-4xl font-extrabold text-stone-700">
								{experience.dateStart.getFullYear()}
							</h1>
							<span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 ring-8 ring-indigo-700/20">
								<LinkIcon className="h-4 w-4 text-white" />
							</span>
							<h3 className="mb-1 flex items-center text-lg font-semibold text-stone-900 dark:text-white">
								{experience.role}
							</h3>
							<time className="mb-2 block text-sm font-normal leading-none text-stone-400 dark:text-stone-500">
								{experience.company}
							</time>
							<p className="mb-4 text-base font-normal text-stone-500 dark:text-stone-400">
								{experience.description}
							</p>
						</AnimateWrapper>
					</li>
				))}
			</ol>
		</div>
	);
};

export default About;
