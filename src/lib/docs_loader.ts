import type { Component } from "svelte";
import ParagraphPlaintext from "../components/docs/Paragraph_Plaintext.svelte";
import ParagraphCodeblock from "../components/docs/Paragraph_Codeblock.svelte";
import ElementText, { type TextElementProps } from "../components/docs/Element_Text.svelte";
import ElementCode, { type CodeElementProps } from "../components/docs/Element_Code.svelte";
import ElementGmlFilename, { type GmlFilenameElementProps } from "../components/docs/Element_GmlFilename.svelte";
import ElementTable, { type TableElementProps } from "$components/docs/Element_Table.svelte";
import ParagraphCallout, { type CalloutStyle } from "$components/docs/Paragraph_Callout.svelte";
import ParagraphBlockquote from "$components/docs/Paragraph_Blockquote.svelte";

// I added types for literally everything for easier parsing
export interface JsonDoc {
    sections: Section[]
};

export interface Section {
    title: string,
    paragraphs: Paragraph[]
};

type ParagraphType = "plaintext" | "codebox" | "callout" | "blockquote";
export interface Paragraph {
    type: ParagraphType,
    elements: Element[],
    style?: CalloutStyle // Only for callout paragraphs
};

export type Element = string | number | boolean | TextElement | CodeElement | GmlFilenameElement | TableElement;
export type ElementProps = TextElementProps | CodeElementProps | GmlFilenameElementProps | TableElementProps;

// Specific element types contain props and the explicitly set type to be picked up by the loader
interface TextElement extends TextElementProps { type: "text" }
interface CodeElement extends CodeElementProps { type: "code" }
interface GmlFilenameElement extends GmlFilenameElementProps { type: "filename" }
interface TableElement extends TableElementProps { type: "table" }


// Used for rendering paragraph containers
export function getParagraphComponent(paragraph: Paragraph): Component<any> {
    switch (paragraph.type) {
        case "plaintext":   return ParagraphPlaintext
        case "codebox":     return ParagraphCodeblock
        case "callout":     return ParagraphCallout
        case "blockquote":  return ParagraphBlockquote
    }
}

// Used for rendering individual components
export function getElementComponent(element: Element): Component<any> {
    // primitive types are inserted as text when resolved by getElementProps
    if( typeof element === "string" || 
        typeof element === "number" || 
        typeof element === "boolean") 
        return ElementText;
    
    switch (element.type) {
        case "text": return ElementText
        case "code": return ElementCode
        case "filename": return ElementGmlFilename
        case "table": return ElementTable
    }
}

// Return the props for an element as an object.
// This is mainly necessary to convert strings to a text element with a value prop
export function getElementProps(element: Element): ElementProps {
    return  typeof element === "string" || 
            typeof element === "number" || 
            typeof element === "boolean" ? { value: element.toString() } : element;
}

// Loads all json doc files and provides a function that loads one given the name
export const allDocs = import.meta.glob<{ default: JsonDoc }>('/src/assets/docs/*.json', { eager: false });

export async function loadDoc(name: string): Promise<JsonDoc | null> {
    const loader = allDocs[`/src/assets/docs/${name}.json`];
    if (!loader) return null;

    const module = await loader();
    return module.default;
}