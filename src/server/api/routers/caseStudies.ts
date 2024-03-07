import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const caseStudiesRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const caseStudies = await ctx.db.caseStudy.findMany({
			where: {
				published: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return caseStudies;
	}),
});
