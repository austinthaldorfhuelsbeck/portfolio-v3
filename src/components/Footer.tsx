import Image from "next/image"
import Link from "next/link"

// Social links configuration
const socialLinks = [
	{
		href: "mailto:austin@thaldorfhuelsbeck.com",
		icon: "/social/email.svg",
		alt: "Email",
	},
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
]

const Footer = () => {
	return (
		<footer className="m-3">
			<hr className="border-stone-500" />
			<div className="flex items-center justify-between mt-4">
				<span className="text-sm text-stone-400 text-center hidden sm:inline-flex">
					"The only way to do great work is to love what you do." - Steve Jobs
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
	)
}

export default Footer
