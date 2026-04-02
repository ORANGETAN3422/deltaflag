import type { Component, ComponentProps } from "svelte";
import ParagraphPlaintext from "./components/docs/Paragraph_Plaintext.svelte";
import ParagraphCodeblock from "./components/docs/Paragraph_Codeblock.svelte";
import ElementText from "./components/docs/Element_Text.svelte";
import ElementCode from "./components/docs/Element_Code.svelte";

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
    contents: Element[]
};

export type ElementType = "code" | "text";

export interface Element {
    type: ElementType,
    value: string
};

/**
* Parses a JSON string into a JsonDoc object.
* Note: casts type any to JsonDoc, so there is a chance it silently fails.
*/
export function parseJson(json: string): JsonDoc {
    const doc: JsonDoc = JSON.parse(json);
    return doc;
}

/**
* Stringifies a JsonDoc to a JSON string.
*/
export function exportJson(doc: JsonDoc): string {
    const json: string = JSON.stringify(doc, null, 4); // indent with 4 spaces for debugging
    return json;
}

export function getParagraphComponent(type: ParagraphType): Component {
    switch (type) {
        case "plaintext": return ParagraphPlaintext
        case "codebox":   return ParagraphCodeblock
    }
}

export function getElementComponent(type: ElementType): Component<{ value: string }> {
    switch (type) {
        case "text": return ElementText
        case "code": return ElementCode
    }
}