import type { Component } from "svelte";
import ParagraphPlaintext   from "$components/docs/paragraphs/Plaintext.svelte";
import ParagraphCodeblock   from "$components/docs/paragraphs/Codeblock.svelte";
import ParagraphCallout,    { type CalloutStyle } from "$components/docs/paragraphs/Callout.svelte";
import ParagraphBlockquote  from "$components/docs/paragraphs/Blockquote.svelte";
import Table,       { type TableProps } from "$components/docs/elements/Table.svelte";
import Code,        { type CodeProps } from "$components/docs/elements/Code.svelte";
import Filename,    { type FilenameProps } from "$components/docs/elements/Filename.svelte";
import Text,        { type TextProps } from "$components/docs/elements/Text.svelte";

// types for everything allow easier parsing and constructing your own doc
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

export type Element = string | number | boolean | TextElement | CodeElement | FilenameElement | TableElement;
export type ElementProps = TextProps | CodeProps | FilenameProps | TableProps;

// Specific element types contain props and the explicitly set type to be picked up by the loader
interface TextElement       extends TextProps { type: "text" }
interface CodeElement       extends CodeProps { type: "code" }
interface FilenameElement   extends FilenameProps { type: "filename" }
interface TableElement      extends TableProps { type: "table" }


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
        return Text;
    
    switch (element.type) {
        case "text":     return Text
        case "code":     return Code
        case "filename": return Filename
        case "table":    return Table
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