import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { type CaseStudy } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import type { GetStaticProps, NextPage } from "next";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { LoadingPage } from "~/components/Loading";
import NotFoundPage from "~/pages/404";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const CaseStudyView = (props: CaseStudy) => {
	return (
		<div className="text-stone-400">
			<div className="flex gap-2 text-sm font-extralight text-stone-300 ">
				<ArrowLeftIcon className="my-auto h-5 w-5" />
				<Link href="/case-studies">
					<p className="hover:text-stone-100 hover:underline">
						<em>All projects</em>
					</p>
				</Link>
			</div>

			<div className="my-6">
				<h1 className="text-3xl font-extrabold text-stone-100">{props.name}</h1>
			</div>
			<h3 className="mb-3 text-xl">{props.description}</h3>
			<div className="flex gap-2">
				{props.technologies.split(",").map((tech, idx) => (
					<Image
						key={idx}
						src={`/technologies/${tech}.svg`}
						width={24}
						height={24}
						alt={tech}
						className="w-8 cursor-pointer rounded-lg p-1 hover:bg-stone-800"
					/>
				))}
			</div>

			<Image
				src={props.image}
				alt={`Cover image for ${props.name}`}
				width={1200}
				height={600}
				layout="responsive"
				className="my-5 rounded-lg"
			/>

			{/*TODO  Temporary load of content until I figure out how to read markdown or something */}
			<div dangerouslySetInnerHTML={{ __html: props.content ?? "" }} />
		</div>
	);
};

const SingleStudyPage: NextPage<{ slug: string }> = ({ slug }) => {
	const { data, isLoading: studyIsLoading } = api.caseStudy.getBySlug.useQuery({
		slug,
	});

	if (studyIsLoading) return <LoadingPage />;

	if (!data) return <NotFoundPage />;

	return (
		<>
			<Head>
				<title>{`${data.name} - Austin Thaldorf-Huelsbeck`}</title>
			</Head>
			<CaseStudyView {...data} />
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = generateSSGHelper();

	const slug = context.params?.slug as string;

	if (!slug)
		throw new TRPCError({ message: "No slug provided", code: "BAD_REQUEST" });

	await ssg.caseStudy.getBySlug.prefetch({ slug });

	return {
		props: {
			trpcState: ssg.dehydrate(),
			slug,
		},
	};
};

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};

export default SingleStudyPage;
