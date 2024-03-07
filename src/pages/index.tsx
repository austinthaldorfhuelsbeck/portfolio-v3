import getLatestRepos from "@/utils/getLatestRepos";
import getRandomFact from "@/utils/getRandomFact";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";

// Unified type for items that can be a repo or a card
type CardItem = {
	name: string;
	description: string;
	url: string;
	clone_url?: string; // Optional, only for RepoCard use
};

const caseStudies: CardItem[] = [
  {
    name: "Vowsuite",
    description: "A CRM and hosting solution for wedding industry professionals.",
    url: "/case-studies/vowsuite",
  },
  // Add other case studies...
];

const blogs: CardItem[] = [
  {
    name: "How to code",
    description: "A guide on how to code.",
    url: "/writing/how-to-code",
  },
  // Add other blogs...
];

// Server-side rendering
export const getStaticProps = async () => {
	const ninjasApiKey = process.env.API_NINJAS_API_KEY || "";
	const repos = await getLatestRepos("austinthaldorfhuelsbeck");

	// Handle the case where repos could be null
	if (!repos) {
			return {
					props: {
							repos: [],
							fact: '',
					},
			};
	}

	const fact = await getRandomFact(ninjasApiKey);

	// Transform repos to match CardItem structure, with added type safety
	const transformedRepos: CardItem[] = repos.map(repo => ({
			...repo,
			url: repo.clone_url,
	}));

	return {
			props: {
					repos: transformedRepos,
					fact,
			},
	};
};

// Unified card component for items that can be a repo or a card
const UnifiedCard = ({ item }: { item: CardItem }) => (
  <li className="leading-8">
    <Link
      href={item.url}
      className="text-stone-100 underline decoration-stone-500 hover:decoration-stone-100 flex"
    >
      {item.name}
      {item.url.startsWith("http") && <ArrowUpRightIcon className="w-4 h-4 my-auto text-stone-500" />}
    </Link>
    <p className="text-sm text-stone-400">{item.description}</p>
  </li>
);

const PageContent = ({ repos, blogs }: { repos: CardItem[]; blogs: CardItem[] }) => (
  <section>
    <div className="flex w-full flex-col gap-6 sm:flex-row sm:gap-2">
      {/* Case Studies */}
      <div className="flex-1">
        <h1 className="text-sm text-stone-500 pb-4 font-semibold">Case studies</h1>
        <ul className="flex flex-col gap-4">
          {caseStudies.map((item, idx) => (
            <UnifiedCard item={item} key={idx} />
          ))}
        </ul>
      </div>

      {/* Repos */}
      <div className="flex-1">
        <h1 className="text-sm text-stone-500 pb-4 font-semibold">Repos</h1>
        <ul className="flex flex-col gap-4">
          {repos.map((item, idx) => (
            <UnifiedCard item={item} key={idx} />
          ))}
        </ul>
      </div>

      {/* Blogs */}
      <div className="flex-1">
        <h1 className="text-sm text-stone-500 pb-4 font-semibold">Writing</h1>
        <ul className="flex flex-col gap-4">
          {blogs.map((item, idx) => (
            <UnifiedCard item={item} key={idx} />
          ))}
        </ul>
      </div>
    </div>
  </section>
);

// Main page component
const Home = ({
  repos,
  fact,
}: InferGetServerSidePropsType<typeof getStaticProps>) => (
  <div className="mx-4 flex flex-col gap-8">
    <section className="flex flex-col gap-4 text-stone-100 font-extralight">
      <p className="text-stone-500 text-sm font-semibold">About me</p>
      <div className="flex flex-row gap-4">
        <p>
          <strong>Hi there! 👋 I'm Austin</strong>. I'm a self-taught software
          engineer specialized in <strong>frontend</strong> and
          <strong>full-stack development</strong>. I enjoy
          <strong>building software</strong> that
          <strong>solves real problems</strong> and
          <strong>enhances peoples' lives.</strong>
        </p>
        <Image
          src="/images/ath-wedding-portrait.jpg"
          width={100}
          height={100}
          alt="Austin Thaldorf-Huelsbeck"
          className="rounded-full object-cover h-24 w-24 my-auto hidden sm:block"
        />
      </div>
      <p>
        I'm currently working on
        <Link href="/case-studies/vowsuite" className="underline">
          <strong>Vowsuite</strong>
        </Link>
        , a <strong>CRM and hosting solution</strong> created for wedding
        industry professionals.
      </p>
      {fact && <p>{`By the way, here's a random fact: ${fact} 🤓`}</p>}
    </section>
    <PageContent repos={repos} blogs={blogs} />
  </div>
);

export default Home;
