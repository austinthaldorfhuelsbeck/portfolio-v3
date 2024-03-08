import { type PropsWithChildren } from "react";

const CustomParagraph = (props: PropsWithChildren) => (
	<p className="my-5">{props.children}</p>
);

const CustomHeading1 = (props: PropsWithChildren) => (
	<h1 className="my-5">{props.children}</h1>
);

const CustomHeading2 = (props: PropsWithChildren) => (
	<h2 className="my-5">{props.children}</h2>
);

const CustomHeading3 = (props: PropsWithChildren) => (
	<h3 className="my-5">{props.children}</h3>
);

const components = {
	p: CustomParagraph,
	h1: CustomHeading1,
	h2: CustomHeading2,
	h3: CustomHeading3,
};

export default components;
