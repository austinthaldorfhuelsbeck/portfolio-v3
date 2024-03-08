import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import markdownToHtml from "~/utils/markdownToHtml";

export const postRouter = createTRPCRouter({
	getLatest: publicProcedure.query(async ({ ctx }) => {
		const posts = await ctx.db.post.findMany({
			take: 2,
			where: {
				published: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return posts;
	}),

	getAll: publicProcedure.query(async ({ ctx }) => {
		const posts = await ctx.db.post.findMany({
			where: {
				published: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return posts;
	}),

	getBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ input, ctx }) => {
			const post = await ctx.db.post.findUnique({
				where: {
					slug: input.slug,
				},
			});

			if (!post) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			try {
				const { frontmatter, contentHtml } = await markdownToHtml(
					input.slug,
					"posts",
				);
				return {
					...post,
					content: contentHtml,
					frontmatter,
				};
			} catch (error) {
				return post;
			}
		}),
});
