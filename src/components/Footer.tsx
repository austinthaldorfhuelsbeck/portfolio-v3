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
		href: "https://twitter.com/austin_athdev",
		icon: "/social/x.svg",
		alt: "X (formerly Twitter)",
	},
];

const Footer = () => {
	return (
		<footer className="pb-6">
			<hr className="border-stone-500" />
			<div className="mt-4 flex items-center justify-between">
				<span className="hidden text-center text-sm text-stone-400 sm:inline-flex">
					<Link
						href="mailto:austin@thaldorfhuelsbeck.com"
						className="rounded p-2 hover:bg-stone-800"
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
							className="rounded p-2 hover:bg-stone-800"
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
