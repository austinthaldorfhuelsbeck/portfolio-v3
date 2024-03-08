import Link from "next/link";

// Navigation configuration
const navigation = [
	{ title: "about", path: "/about" },
	{ title: "projects", path: "/case-studies" },
	{ title: "blog", path: "/blog" },
];

const Navbar = () => {
	return (
		<header>
			<nav className="mx-auto flex max-w-screen-xl items-center pb-1 text-sm">
				<div className="flex items-center justify-between py-5 md:block">
					<Link href="/">
						<div className="flex flex-col decoration-stone-400 hover:underline">
							<h1 className="font-bold text-stone-100">
								Austin Thaldorf-Huelsbeck
							</h1>
							<p className="font-extralight text-stone-300">
								Software Engineer
							</p>
						</div>
					</Link>
				</div>

				<div className="ml-auto flex">
					<ul className="ml-auto flex items-center justify-center space-x-2 space-y-0">
						{navigation.map((item, idx) => {
							return (
								<li
									key={idx}
									className="rounded px-2 py-1 font-medium text-stone-400 hover:bg-stone-800 hover:text-stone-200"
								>
									<a href={item.path} className="block">
										{item.title}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
