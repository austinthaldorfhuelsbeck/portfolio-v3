import { ArrowDownTrayIcon, LinkIcon } from "@heroicons/react/20/solid";
import { type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";

// const experiences: Experience[] = [
// 	{
// 		role: "Contributor",
// 		company: "Wiki.js",
// 		description:
// 			"Designed a feature to sort comments, improving user interaction, using Vue.js and Node.js.",
// 		date: "2024-03-01",
// 	},
// 	{
// 		role: "Freelance Developer",
// 		company: "Vowsuite",
// 		description:
// 			"Developed a CRM and hosting solution for wedding industry professionals, using Next.js and Prisma.",
// 		date: "2023-10-01",
// 	},
// 	{
// 		role: "Systems Administrator",
// 		company: "The Seattle School",
// 		description:
// 			"Enhanced system security and managed the school's network infrastructure using PowerShell, C#, and bash scripting.",
// 		date: "2022-10-01",
// 	},
// 	{
// 		role: "Freelance Developer",
// 		company: "cathyloerzel.com",
// 		description:
// 			"Blog website with a custom CMS, using React and Node.js with Postgres.",
// 		date: "2021-08-01",
// 	},
// 	{
// 		role: "Bootcamp Graduate",
// 		company: "Thinkful Academy",
// 		description:
// 			"Completed intensive coding bootcamp, learning full-stack web development with React and Node.js.",
// 		date: "2021-05-01",
// 	},
// 	{
// 		role: "Self-Taught Programmer",
// 		description:
// 			"Began my self-taught journey in programming, dedicating myself to learning and mastering front-end and back-end technologies through online resources, projects, and community participation.",
// 		date: "2018-01-01",
// 	},
// 	{
// 		role: "B.A. in Audio Engineering",
// 		company: "George Fox University",
// 		description:
// 			"Graduated with a Bachelor of Arts in Audio Engineering, with a focus on music production and sound design.",
// 		date: "2013-05-01",
// 	},
// ];

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
			<ol className="relative mx-3 mt-8 border-s border-stone-700">
				{data.map((experience, idx) => (
					<li key={idx} className="mb-14 ms-6">
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
					</li>
				))}
			</ol>
		</div>
	);
};

export default About;
