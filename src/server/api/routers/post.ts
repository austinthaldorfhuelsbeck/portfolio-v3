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
});
