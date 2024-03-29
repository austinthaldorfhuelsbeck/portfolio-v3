import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import AnimateWrapper from "~/components/AnimateWrapper";
import { LoadingPage } from "~/components/Loading";
import NotFoundPage from "~/pages/404";
import { api } from "~/utils/api";

const Blog: NextPage = () => {
	// check for tech query param
	// if it exists, use it to get case studies by tech
	const router = useRouter();
	const tech = router.query.tech as string;
	const { data, isLoading: studiesLoading } = tech
		? api.caseStudy.getByTech.useQuery({
				tech,
			})
		: api.caseStudy.getAll.useQuery();

	if (studiesLoading) return <LoadingPage />;

	if (!data) return <NotFoundPage />;

	return (
		<>
			{tech && (
				<AnimateWrapper>
					<div className="flex gap-2 text-sm font-extralight text-stone-300">
						<ArrowLeftIcon className="my-auto h-5 w-5" />
						<Link href="/projects">
							<p className="hover:text-stone-100 hover:underline">
								<em>All projects</em>
							</p>
						</Link>
					</div>

					<div className="mb-10 flex gap-2">
						<h2 className="text-2xl font-bold tracking-tight text-stone-300 md:text-3xl">
							{`Projects using ${tech}`}
						</h2>
						<Image
							src={`/technologies/${tech}.svg`}
							width={24}
							height={24}
							alt={tech}
							className="w-8 p-1"
						/>
					</div>
				</AnimateWrapper>
			)}

			{!tech && (
				<AnimateWrapper>
					<h2 className="mb-10 text-2xl font-bold tracking-tight text-stone-300 md:text-3xl">
						Projects
					</h2>
				</AnimateWrapper>
			)}

			<div className="flex flex-col gap-4 pb-4 text-stone-300 sm:grid sm:grid-cols-2">
				{data.map((study) => (
					<Link key={study.id} href={`/projects/${study.slug}`}>
						<AnimateWrapper>
							<div className="hover:scale-102 mx-auto rounded-lg bg-indigo-500/20 brightness-90 grayscale duration-300 ease-in-out hover:brightness-100 hover:grayscale-0 hover:transition-all">
								<Image
									src={study.image}
									alt={study.name}
									width={500}
									height={500}
									className="aspect-video w-full rounded-t-lg object-cover"
								/>
								<p className="p-2 text-sm">{study.name}</p>
							</div>
						</AnimateWrapper>
					</Link>
				))}
			</div>
		</>
	);
};

export default Blog;
