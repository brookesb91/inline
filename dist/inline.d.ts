type ExtractTagName<S extends string> = S extends `${infer Tag}#${string}` ? Tag : S extends `${infer Tag}.${string}` ? Tag : S extends `${infer Tag}[${string}` ? Tag : S;
type ElementFromSelector<S extends string> = ExtractTagName<S> extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[ExtractTagName<S>] : HTMLDivElement;
type Props<S extends string> = [
    selector: S,
    ...(HTMLElement | ((el: ElementFromSelector<S>) => void) | string | Partial<ElementFromSelector<S>>)[]
];
export declare const $: <S extends string>(...props: Props<S>) => ElementFromSelector<S>;
export {};
//# sourceMappingURL=inline.d.ts.map