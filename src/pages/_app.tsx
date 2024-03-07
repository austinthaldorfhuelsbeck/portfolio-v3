import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })


export default function App({ Component, pageProps }: AppProps) {
	return (
		<main
			className={`flex h-screen justify-center overflow-y-auto ${inter.className}`}
		>
			<div className="h-full w-full md:max-w-3xl flex flex-col justify-between">
				<Navbar />
				<Component {...pageProps} />
				<Footer />
			</div>
		</main>
	)
}
