import {
	ClipboardDocumentIcon,
	ClockIcon,
	LinkIcon,
} from "@heroicons/react/20/solid";
import { type NextPage } from "next";
import { useState } from "react";
import AnimateWrapper from "~/components/AnimateWrapper";
import { api } from "~/utils/api";

// Page
const About: NextPage = () => {
	const { data: experiences } = api.experience.getAll.useQuery();
	const { data: resume } = api.resume.get.useQuery();

	const [isCv, setIsCv] = useState(false);

	if (!experiences) return <></>;

	return (
		<div className="flex flex-col gap-6">
			<div className="mx-auto flex gap-2 sm:ml-0">
				<button
					className="inline-flex items-center rounded-lg border border-stone-600 bg-stone-800 px-4 py-2 text-sm font-medium text-stone-400 hover:bg-stone-700 hover:text-white focus:text-stone-500 focus:outline-none focus:ring-4 focus:ring-stone-700"
					onClick={() => setIsCv(!isCv)}
				>
					{isCv ? (
						<ClockIcon className="mr-2 h-4 w-4" />
					) : (
						<ClipboardDocumentIcon className="mr-2 h-4 w-4" />
					)}
					{isCv ? "Show timeline" : "Show CV"}
				</button>
				{/* <button className="inline-flex items-center rounded-lg border border-stone-600 bg-stone-800 px-4 py-2 text-sm font-medium text-stone-400 hover:bg-stone-700 hover:text-white focus:text-stone-500 focus:outline-none focus:ring-4 focus:ring-stone-700">
					<ArrowDownTrayIcon className="mr-2 h-4 w-4" />
					Download CV
				</button> */}
			</div>

			{isCv && resume && (
				<AnimateWrapper>
					<div dangerouslySetInnerHTML={{ __html: resume.content ?? "" }} />
				</AnimateWrapper>
			)}

			{!isCv && (
				<ol
					role="list"
					className="relative m-0 mx-3 mt-8 list-none border-s border-stone-700"
				>
					{experiences.map((experience, idx) => (
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
			)}
		</div>
	);
};

export default About;
