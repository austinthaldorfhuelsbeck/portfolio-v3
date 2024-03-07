import { ArrowDownTrayIcon, LinkIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
import Link from "next/link";

type Experience = {
	role: string;
	company?: string;
	description: string;
	date: string;
};

const experiences: Experience[] = [
	{
		role: "Contributor",
		company: "Wiki.js",
		description:
			"Designed a feature to sort comments, improving user interaction, using Vue.js and Node.js.",
		date: "2024-03-01",
	},
	{
		role: "Freelance Developer",
		company: "Vowsuite",
		description:
			"Developed a CRM and hosting solution for wedding industry professionals, using Next.js and Prisma.",
		date: "2023-10-01",
	},
	{
		role: "Systems Administrator",
		company: "The Seattle School",
		description:
			"Enhanced system security and managed the school's network infrastructure using PowerShell, C#, and bash scripting.",
		date: "2022-10-01",
	},
	{
		role: "Freelance Developer",
		company: "cathyloerzel.com",
		description:
			"Blog website with a custom CMS, using React and Node.js with Postgres.",
		date: "2021-08-01",
	},
	{
		role: "Bootcamp Graduate",
		company: "Thinkful Academy",
		description:
			"Completed intensive coding bootcamp, learning full-stack web development with React and Node.js.",
		date: "2021-05-01",
	},
	{
		role: "Self-Taught Programmer",
		description:
			"Began my self-taught journey in programming, dedicating myself to learning and mastering front-end and back-end technologies through online resources, projects, and community participation.",
		date: "2018-01-01",
	},
	{
		role: "B.A. in Audio Engineering",
		company: "George Fox University",
		description:
			"Graduated with a Bachelor of Arts in Audio Engineering, with a focus on music production and sound design.",
		date: "2013-05-01",
	},
];

// Page
const About: NextPage = () => {
	return (
		<div className="mx-4 flex flex-col gap-6">
			<Link
				href="#"
				className="mx-auto sm:ml-0 inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg focus:ring-4 focus:outline-none focus:text-stone-500 bg-stone-800 text-stone-400 border-stone-600 hover:text-white hover:bg-stone-700 focus:ring-stone-700"
			>
				<ArrowDownTrayIcon className="w-4 h-4 mr-2" />
				Download CV
			</Link>
			<ol className="relative border-s border-stone-700 mt-8 mx-3">
				{experiences.map((experience) => (
					<li className="mb-14 ms-6">
						<h1 className="text-4xl font-extrabold text-stone-700 block -translate-x-10 -translate-y-8 -z-10 -mb-9">
							{experience.date.slice(0, 4)}
						</h1>
						<span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-indigo-700/20 bg-stone-900">
							<LinkIcon className="w-4 h-4 text-white" />
						</span>
						<h3 className="flex items-center mb-1 text-lg font-semibold text-stone-900 dark:text-white">
							{experience.role}
						</h3>
						<time className="block mb-2 text-sm font-normal leading-none text-stone-400 dark:text-stone-500">
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
