import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const experienceRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const experiences = await ctx.db.experience.findMany({
			where: {
				published: true,
			},
			orderBy: {
				dateStart: "desc",
			},
		});

		return experiences;
	}),
});
