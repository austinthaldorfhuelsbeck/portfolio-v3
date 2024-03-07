import { type NextPage } from "next";
import Link from "next/link";
import { LoadingPage } from "~/components/Loading";
import { NotFoundPage } from "~/components/NotFound";
import { api } from "~/utils/api";

const Blog: NextPage = () => {
	const { data, isLoading: postsLoading } = api.post.getAll.useQuery();

	if (postsLoading) return <LoadingPage />;

	if (!data) return <NotFoundPage />;

	return (
		<div className="">
			<h2 className="mb-10 text-2xl font-bold tracking-tight text-stone-300 md:text-3xl">
				Writing
			</h2>

			<div className="text-stone-300 hover:text-stone-600 hover:transition-all">
				{data.map((post) => (
					<Link key={post.id} href={`/blog/${post.slug}`}>
						<article className="flex cursor-pointer items-start justify-between border-t border-stone-700 py-5  hover:text-stone-100 hover:transition-all">
							<div className="group relative">
								<h3 className="text-md font-semibold leading-6">{post.name}</h3>
							</div>

							<div className="text-xs font-extralight">
								<time dateTime={post.createdAt.toDateString()} className="">
									{post.createdAt.toLocaleDateString()}
								</time>
							</div>
						</article>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Blog;
