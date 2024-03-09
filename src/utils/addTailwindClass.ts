import { type Element } from "hast";
import { visit } from "unist-util-visit";

// Add a tailwind class to all elements in O(n) time!
// This is a workaround for the fact that the remark-rehype plugin does not support adding classes to elements
const addTailwindClass = () => {
	return (tree: Element) => {
		visit(tree, "element", (node: Element) => {
			// Initialize an empty array for accumulating class names
			let classesToAdd = "";

			// Apply classes based on the element type
			switch (node.tagName) {
				case "h1":
					classesToAdd = "my-5 text-2xl font-bold";
					break;
				case "h2":
					classesToAdd = "my-5 text-xl font-bold";
					break;
				case "h3":
					classesToAdd = "my-5 text-lg font-bold";
					break;
				case "h4":
					classesToAdd = "my-5 text-md font-bold";
					break;
				case "p":
					classesToAdd = "my-5";
					break;
				case "li":
					classesToAdd = "text-sm mb-1";
					break;
				case "img":
					classesToAdd = "my-5 rounded-lg";
					break;
				case "hr":
					classesToAdd = "my-5 border-stone-700 border-t-2";
					break;
			}

			// Ensure existingClasses is always an array and exclude boolean values
			let existingClasses: Array<string | number> = [];
			if (
				node.properties?.className &&
				typeof node.properties.className !== "boolean"
			) {
				if (Array.isArray(node.properties.className)) {
					existingClasses = node.properties.className.filter(
						(cls) => typeof cls === "string" || typeof cls === "number",
					);
				} else if (
					typeof node.properties.className === "string" ||
					typeof node.properties.className === "number"
				) {
					existingClasses = [node.properties.className];
				}
			}

			// Combine existing classes with the new ones
			node.properties = {
				...node.properties,
				className: [...existingClasses, ...classesToAdd.split(" ")],
			};
		});
	};
};

export default addTailwindClass;
