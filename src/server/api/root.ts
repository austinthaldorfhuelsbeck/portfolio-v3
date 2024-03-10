import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { caseStudyRouter } from "./routers/caseStudy";
import { experienceRouter } from "./routers/experience";
import { randomFactRouter } from "./routers/randomFact";
import { repoRouter } from "./routers/repo";
import { resumeRouter } from "./routers/resume";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	post: postRouter,
	experience: experienceRouter,
	caseStudy: caseStudyRouter,
	resume: resumeRouter,
	randomFact: randomFactRouter,
	repo: repoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
