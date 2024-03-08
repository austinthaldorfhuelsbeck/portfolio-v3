import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { type Post } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import type { GetStaticProps, NextPage } from "next";

import Head from "next/head";
import Link from "next/link";
import { LoadingPage } from "~/components/Loading";
import NotFoundPage from "~/pages/404";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const PostView = (props: Post) => {
	return (
		<div className="text-stone-400">
			<div className="flex gap-2 text-sm font-extralight text-stone-300 ">
				<ArrowLeftIcon className="my-auto h-5 w-5" />
				<Link href="/blog">
					<p className="hover:text-stone-100 hover:underline">
						<em>All writing</em>
					</p>
				</Link>
			</div>
			<div className="my-6">
				<p className="text-xs font-extralight">
					<time dateTime={props.createdAt.toDateString()} className="">
						{props.createdAt.toLocaleDateString()}
					</time>
				</p>
				<h1 className="text-3xl font-extrabold text-stone-100">{props.name}</h1>
			</div>
			<h3 className="mb-3 text-xl">{props.description}</h3>
			<div dangerouslySetInnerHTML={{ __html: props.content ?? "" }} />
		</div>
	);
};

const SinglePostPage: NextPage<{ slug: string }> = ({ slug }) => {
	const { data, isLoading: postIsLoading } = api.post.getBySlug.useQuery({
		slug,
	});

	if (postIsLoading) return <LoadingPage />;

	if (!data) return <NotFoundPage />;

	return (
		<>
			<Head>
				<title>{`${data.name} - Austin Thaldorf-Huelsbeck`}</title>
			</Head>
			<PostView {...data} />
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = generateSSGHelper();

	const slug = context.params?.slug as string;

	if (!slug)
		throw new TRPCError({ message: "No slug provided", code: "BAD_REQUEST" });

	await ssg.post.getBySlug.prefetch({ slug });

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

export default SinglePostPage;
