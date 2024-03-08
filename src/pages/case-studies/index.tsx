import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoadingPage } from "~/components/Loading";
import { NotFoundPage } from "~/components/NotFound";
import { api } from "~/utils/api";

const Blog: NextPage = () => {
	const { data, isLoading: studiesLoading } = api.caseStudy.getAll.useQuery();

	if (studiesLoading) return <LoadingPage />;

	if (!data) return <NotFoundPage />;

	return (
		<div className="">
			<h2 className="mb-10 text-2xl font-bold tracking-tight text-stone-300 md:text-3xl">
				Case Studies
			</h2>

			<div className="flex flex-col gap-4 text-stone-300 sm:grid sm:grid-flow-col sm:grid-cols-2">
				{data.map((study) => (
					<Link key={study.id} href={`/case-studies/${study.slug}`}>
						<div className="mx-auto rounded-lg bg-indigo-500/20 brightness-90 grayscale duration-300 ease-in-out hover:brightness-100 hover:grayscale-0 hover:transition-all">
							<Image
								src={study.image}
								alt={study.name}
								width={500}
								height={500}
								className="aspect-video rounded-t-lg object-cover"
							/>
							<p className="p-2 text-sm">{study.name}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Blog;
