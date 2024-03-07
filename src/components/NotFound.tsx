import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

const svgImages: string[] = [
	"/images/404.svg",
	"/images/back-home.svg",
	"/images/by-the-road.svg",
	"/images/taken.svg",
	"/images/void.svg",
];

const src = svgImages[Math.floor(Math.random() * svgImages.length)]!;

export const NotFoundPage = () => (
	<div className="flex h-full flex-col items-center justify-center gap-6">
		<Image src={src} alt="404" width={300} height={300} />
		<h1 className="text-3xl font-bold text-stone-300">
			Hmmm... that&#39;s not found.
		</h1>
		<Link href="/">
			<div className="flex gap-2 text-stone-300 hover:text-stone-100 hover:underline">
				<ArrowLeftIcon className="my-auto h-5 w-5" />
				<p>Back home</p>
			</div>
		</Link>
	</div>
);
