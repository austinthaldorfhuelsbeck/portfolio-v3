import { TRPCError } from "@trpc/server";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import html from "remark-html";
import remarkHype from "remark-rehype";
import { type PostOrCaseStudyContent } from "~/types";
import addTailwindClass from "~/utils/addTailwindClass";

const markdownToHtml = async (
	slug: string,
	baseDirectory: string,
): Promise<PostOrCaseStudyContent> => {
	const fullPath = path.join(
		process.cwd(),
		"public",
		baseDirectory,
		`${slug}.md`,
	);
	try {
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data: frontmatter, content } = matter(fileContents);
		const processedContent = await remark()
			.use(html)
			.use(remarkHype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(addTailwindClass)
			.use(rehypeStringify)
			.process(content);
		const contentHtml = processedContent.toString();

		return { frontmatter, contentHtml };
	} catch (error) {
		throw new TRPCError({
			message: "Error reading file",
			code: "INTERNAL_SERVER_ERROR",
		});
	}
};

export default markdownToHtml;
