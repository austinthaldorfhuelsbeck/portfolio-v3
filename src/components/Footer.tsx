import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "next/dist/build/templates/pages";
import Image from "next/image";
import Link from "next/link";

// Social links configuration
const socialLinks = [
	{
		href: "https://github.com/austinthaldorfhuelsbeck",
		icon: "/social/github.svg",
		alt: "GitHub",
	},
	{
		href: "https://www.linkedin.com/in/austinhuelsbeck",
		icon: "/social/linkedin.svg",
		alt: "LinkedIn",
	},
	{
		href: "https://twitter.com/AHuelsbeck39985",
		icon: "/social/x.svg",
		alt: "X (formerly Twitter)",
	},
];

const Footer = ({
	fact,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<footer className="m-3">
			<hr className="border-stone-500" />
			<div className="flex items-center justify-between mt-4">
				<span className="text-sm text-stone-400 text-center hidden sm:inline-flex">
					<Link
						href="mailto:austin@thaldorfhuelsbeck.com"
						className="p-2 rounded hover:bg-stone-800"
					>
						austin@thaldorfhuelsbeck.com
					</Link>
				</span>
				<div className="ml-auto flex justify-center">
					{socialLinks.map((social) => (
						<Link
							key={social.alt}
							href={social.href}
							target="_blank"
							className="p-2 rounded hover:bg-stone-800"
						>
							<Image
								src={social.icon}
								alt={social.alt}
								width={16}
								height={16}
							/>
						</Link>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
