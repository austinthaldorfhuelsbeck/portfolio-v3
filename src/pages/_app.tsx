import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import Head from "next/head";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Austin Thaldorf-Huelsbeck</title>
				<meta name="description" content="Software Engineer" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main
				className={`mx-auto h-screen w-full flex-col px-4 font-sans md:max-w-3xl ${inter.variable}`}
			>
				<div className="flex h-full w-full flex-col justify-between">
					<Navbar />
					<Component {...pageProps} />
					<Footer />
				</div>
			</main>
		</>
	);
};

export default api.withTRPC(MyApp);
