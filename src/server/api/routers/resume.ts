import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import markdownToHtml from "~/utils/markdownToHtml";

export const resumeRouter = createTRPCRouter({
	get: publicProcedure.query(async () => {
		try {
			const { frontmatter, contentHtml } = await markdownToHtml(
				"resume",
				"resume",
			);
			console.log(contentHtml);
			return {
				content: contentHtml,
				frontmatter,
			};
		} catch (error) {
			throw new TRPCError({
				message: "Error reading file",
				code: "INTERNAL_SERVER_ERROR",
			});
		}
	}),
});
