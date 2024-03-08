import { TRPCError } from "@trpc/server";
import { z } from "zod";
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

	getBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ input, ctx }) => {
			const caseStudy = await ctx.db.caseStudy.findUnique({
				where: {
					slug: input.slug,
				},
			});

			if (!caseStudy) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			return caseStudy;
		}),
});
