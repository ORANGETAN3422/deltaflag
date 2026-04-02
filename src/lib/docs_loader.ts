import type { Component } from "svelte";
import ParagraphPlaintext from "../components/docs/Paragraph_Plaintext.svelte";
import ParagraphCodeblock from "../components/docs/Paragraph_Codeblock.svelte";
import ElementText from "../components/docs/Element_Text.svelte";
import ElementCode from "../components/docs/Element_Code.svelte";
import ElementGmlFilename from "../components/docs/Element_GmlFilename.svelte";

// I added types for literally everything for easier parsing
export interface JsonDoc {
    sections: Section[]
};

export interface Section {
    title: string,
    paragraphs: Paragraph[]
};

export type ParagraphType = "plaintext" | "codebox";

export interface Paragraph {
    type: ParagraphType,
    elements: Element[]
};

export type Element = TextElement | CodeElement | GmlFilenameElement;

// Specific element types are so that json parser can pick up the aditional properties
export type TextElementStyle = null | "italic" | "muted" | "faint" | "soul" | "yellow" | "green";
export interface TextElement {
    type: "text",
    value: string,
    style?: TextElementStyle,
    bold?: boolean
};

export interface CodeElement {
    type: "code",
    value: string,
    lang?: string,
    theme?: string
};

export interface GmlFilenameElement {
    type: "filename",
    value: string
};

// Used for rendering paragraph containers
export function getParagraphComponent(paragraph: Paragraph): Component {
    switch (paragraph.type) {
        case "plaintext": return ParagraphPlaintext
        case "codebox":   return ParagraphCodeblock
    }
}

// Used for rendering individual components
export function getElementComponent(element: Element): Component<{ value: string }> {
    switch (element.type) {
        case "text": return ElementText
        case "code": return ElementCode
        case "filename": return ElementGmlFilename
    }
}

// Loads all json doc files and provides a function that loads one given the name
export const allDocs = import.meta.glob<{ default: JsonDoc }>('/src/assets/docs/*.json', { eager: false });

export async function loadDoc(name: string): Promise<JsonDoc | null> {
    const loader = allDocs[`/src/assets/docs/${name}.json`];
    if (!loader) return null;

    const module = await loader();
    return module.default;
}