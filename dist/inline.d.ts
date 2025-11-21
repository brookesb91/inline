/**
 * Extracts the HTML tag name from a CSS selector string.
 * Handles selectors with IDs (#), classes (.), and attributes ([).
 *
 * @example
 * ExtractTagName<'div#app'> // 'div'
 * ExtractTagName<'button.btn'> // 'button'
 * ExtractTagName<'.container'> // '' (empty, defaults to 'div')
 */
type ExtractTagName<S extends string> = S extends `${infer Tag}#${string}` ? Tag : S extends `${infer Tag}.${string}` ? Tag : S extends `${infer Tag}[${string}` ? Tag : S;
/**
 * Maps a CSS selector to its corresponding HTMLElement type.
 * Returns HTMLDivElement as default for unknown tags or class-only selectors.
 *
 * @example
 * ElementFromSelector<'input'> // HTMLInputElement
 * ElementFromSelector<'a'> // HTMLAnchorElement
 * ElementFromSelector<'.container'> // HTMLDivElement
 */
type ElementFromSelector<S extends string> = ExtractTagName<S> extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[ExtractTagName<S>] : HTMLDivElement;
/**
 * Valid property types that can follow the selector argument.
 * All types are optional and can be mixed in any order.
 */
type Props<S extends string> = [
    selector: S,
    ...(HTMLElement | ((el: ElementFromSelector<S>) => void) | string | Partial<ElementFromSelector<S>>)[]
];
/**
 * Creates a typed HTMLElement from a CSS selector with flexible property arguments.
 *
 * @template S - The selector string type, used for element type inference
 * @param props - Selector followed by any number of properties in any order:
 *   - **selector** (string): CSS selector (tag#id.class1.class2)
 *     - Tag defaults to 'div' if omitted
 *     - Examples: 'button.btn', '#app', 'input#email.form-control'
 *   - **string**: Text content (creates text node)
 *   - **HTMLElement**: Child element (appends to children)
 *   - **object**: Element properties (assigned via Object.assign)
 *   - **function**: Callback receiving the typed element for side effects
 *
 * @returns Typed HTMLElement matching the selector's tag name
 *   - 'input' → HTMLInputElement
 *   - 'button' → HTMLButtonElement
 *   - '.container' → HTMLDivElement (default)
 *
 * @example
 * // Simple text content
 * $('h1', 'Hello World')
 * // <h1>Hello World</h1>
 *
 * @example
 * // Element with ID and classes
 * $('input#email.form-control')
 * // <input id="email" class="form-control">
 *
 * @example
 * // Properties object (fully typed)
 * $('input', { type: 'email', placeholder: 'Enter email', required: true })
 * // <input type="email" placeholder="Enter email" required>
 *
 * @example
 * // Nested children
 * $('.card',
 *   $('h2', 'Title'),
 *   $('p', 'Description')
 * )
 * // <div class="card">
 * //   <h2>Title</h2>
 * //   <p>Description</p>
 * // </div>
 *
 * @example
 * // Callback for event listeners or imperative logic
 * $('button', (el) => {
 *   el.addEventListener('click', () => console.log('clicked'));
 * })
 *
 * @example
 * // Mixed arguments (order independent)
 * $('button.btn',
 *   { type: 'submit', disabled: false },
 *   'Submit',
 *   (el) => el.addEventListener('click', handler)
 * )
 *
 * @example
 * // Type inference in callbacks
 * $('canvas', { width: 800, height: 600 }, (canvas) => {
 *   const ctx = canvas.getContext('2d'); // canvas is HTMLCanvasElement
 *   ctx?.fillRect(0, 0, 100, 100);
 * })
 *
 * @example
 * // Dynamic children with spread
 * $('ul', ...items.map(item => $('li', item.text)))
 */
export declare const $: <S extends string>(...props: Props<S>) => ElementFromSelector<S>;
export {};
//# sourceMappingURL=inline.d.ts.map