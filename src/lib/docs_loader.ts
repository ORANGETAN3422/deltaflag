import type { Component } from "svelte";
import ParagraphPlaintext from "../components/docs/Paragraph_Plaintext.svelte";
import ParagraphCodeblock from "../components/docs/Paragraph_Codeblock.svelte";
import ElementText, { type TextElementProps } from "../components/docs/Element_Text.svelte";
import ElementCode, { type CodeElementProps } from "../components/docs/Element_Code.svelte";
import ElementGmlFilename, { type GmlFilenameElementProps } from "../components/docs/Element_GmlFilename.svelte";

// I added types for literally everything for easier parsing
export interface JsonDoc {
    sections: Section[]
};

export interface Section {
    title: string,
    paragraphs: Paragraph[]
};

type ParagraphType = "plaintext" | "codebox";
export interface Paragraph {
    type: ParagraphType,
    elements: Element[]
};

export type Element = string | TextElement | CodeElement | GmlFilenameElement;
export type ElementProps = TextElementProps | CodeElementProps | GmlFilenameElementProps;

// Specific element types contain props and the explicitly set type to be picked up by the loader
interface TextElement extends TextElementProps { type: "text" }
interface CodeElement extends CodeElementProps { type: "code" }
interface GmlFilenameElement extends GmlFilenameElementProps { type: "filename" }


// Used for rendering paragraph containers
export function getParagraphComponent(paragraph: Paragraph): Component {
    switch (paragraph.type) {
        case "plaintext": return ParagraphPlaintext
        case "codebox":   return ParagraphCodeblock
    }
}

// Used for rendering individual components
export function getElementComponent(element: Element): Component<ElementProps> {
    // the string will be inserted into the value prop using getElementProps
    if(typeof element === "string") return ElementText;
    
    switch (element.type) {
        case "text": return ElementText
        case "code": return ElementCode
        case "filename": return ElementGmlFilename
    }
}

// Return the props for an element as an object.
// This is mainly necessary to convert strings to a text element with a value prop
export function getElementProps(element: Element): ElementProps {
    return typeof element === "string" ? { value: element } : element;
}

// Loads all json doc files and provides a function that loads one given the name
export const allDocs = import.meta.glob<{ default: JsonDoc }>('/src/assets/docs/*.json', { eager: false });

export async function loadDoc(name: string): Promise<JsonDoc | null> {
    const loader = allDocs[`/src/assets/docs/${name}.json`];
    if (!loader) return null;

    const module = await loader();
    return module.default;
}