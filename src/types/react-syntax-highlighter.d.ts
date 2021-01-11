/**
 * Workaround for issue with a moudle in storybook
 *
 * node_modules/@storybook/components/dist/syntaxhighlighter/syntaxhighlighter.d.ts:3:27 - error TS7016: Could not find a declaration file for module 'react-syntax-highlighter/dist/cjs/create-element'.
 *
 */
declare module 'react-syntax-highlighter/dist/cjs/create-element' {
  import React from 'react';

  export type SyntaxHighlightNode =
    | (TextNode & Partial<Record<keyof TagNode<any>, never>>)
    | (TagNode<any> & Partial<Record<keyof TextNode, never>>);

  export interface TextNode {
    type: 'text';
    value: string;
  }

  export interface TagNode<T extends React.ElementType> {
    tagName: T;
    properties: React.ComponentProps<T>;
  }

  export interface CreateElementProps {
    node: SyntaxHighlightNode;
    stylesheet: import('react-syntax-highlighter').SyntaxHighlighterProps['customStyle'];
    style?: React.CSSProperties;
    useInlineStyles?: boolean;
    key: string | number;
  }

  export default function createElement(props: CreateElementProps): string | JSX.Element;
}
