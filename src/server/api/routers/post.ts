import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
	getThree: publicProcedure.query(async ({ ctx }) => {
		const posts = await ctx.db.post.findMany({
			take: 3,
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

			return post;
		}),
});
