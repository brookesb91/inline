const patterns = {
    tag: /^([a-zA-Z0-9-_]+)/,
    id: /\#([a-zA-Z0-9-_]+)/,
    class: /\.([a-zA-Z0-9-_]+)/g,
};
export const $ = (...props) => {
    const [selector, ...rest] = props;
    const tag = selector.match(patterns.tag)?.[1] ?? 'div';
    const el = document.createElement(tag);
    const id = selector.match(patterns.id)?.[1];
    if (id) {
        el.id = id;
    }
    const classes = selector.match(patterns.class)?.map((i) => i.slice(1));
    if (classes) {
        el.classList.add(...classes);
    }
    rest.forEach((prop) => {
        if (prop instanceof HTMLElement) {
            // Directly append child element.
            el.appendChild(prop);
        }
        else if (typeof prop === 'function') {
            // Call the function with the element as argument.
            prop(el);
        }
        else if (typeof prop === 'string') {
            // Append the text node as child.
            el.appendChild(document.createTextNode(prop));
        }
        else {
            // Set the properties.
            Object.assign(el, prop);
        }
    });
    return el;
};
