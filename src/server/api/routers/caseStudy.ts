import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import markdownToHtml from "~/utils/markdownToHtml";

export const caseStudyRouter = createTRPCRouter({
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

	getLatest: publicProcedure.query(async ({ ctx }) => {
		const caseStudies = await ctx.db.caseStudy.findMany({
			take: 3,
			where: {
				published: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return caseStudies;
	}),

	getByTech: publicProcedure
		.input(z.object({ tech: z.string() }))
		.query(async ({ input, ctx }) => {
			const caseStudies = await ctx.db.caseStudy.findMany({
				where: {
					technologies: {
						contains: input.tech,
					},
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

			try {
				const { frontmatter, contentHtml } = await markdownToHtml(
					input.slug,
					"projects",
				);
				return {
					...caseStudy,
					content: contentHtml,
					frontmatter,
				};
			} catch (error) {
				return caseStudy;
			}
		}),
});
