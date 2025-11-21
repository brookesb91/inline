# inline

> Lightweight, type-safe DOM builder with CSS selector syntax

Build DOM elements inline with Pug/Emmet-style selectors and full TypeScript support. No dependencies, no build step, just clean, expressive code.

## Features

- 🎯 **CSS Selector Syntax** - Create elements using familiar `tag#id.class` notation
- 🔒 **Type-Safe** - Full TypeScript inference for element types and properties
- ⏲️ **Lightweight** - ~1KB minified, zero dependencies
- 🔧 **Flexible API** - Mix children, text, properties, and callbacks in any order
- ⚡ **Fast** - Direct DOM API calls, no virtual DOM overhead
- 🧩 **Composable** - Nest elements naturally to reflect DOM structure

## Installation

### Install from GitHub

```bash
npm install github:brookesb91/inline
# or
pnpm add github:brookesb91/inline
# or
yarn add github:brookesb91/inline
```

### CDN

Import directly in the browser.

```html
<script type="module">
  import { $ } from 'https://cdn.jsdelivr.net/gh/brookesb91/inline@master/dist/index.js';

  const app = $(
    '#app',
    $('h1', 'Hello from CDN!'),
    $('p', 'No build step needed!')
  );

  document.body.appendChild(app);
</script>
```

## Quick Start

```typescript
import { $ } from 'inline';

// Simple element with text
const heading = $('h1', 'Hello World');

// Element with ID and classes
const input = $('input#email.form-input.required');

// Complex nested structure
const card = $(
  '.card',
  $('h2', 'Card Title'),
  $('p', 'Card description goes here'),
  $('button.btn.btn-primary', 'Click Me')
);

document.body.appendChild(card);
```

## API

### Basic Syntax

```typescript
$(selector, ...props);
```

The `$` function accepts a CSS selector string followed by any number of arguments:

### Selector Format

```typescript
// Tag only
$('div');

// Tag with ID
$('form#login');

// Tag with classes
$('button.btn.primary');

// Combine ID and classes
$('input#email.form-control.validated');

// Default tag is 'div' if omitted
$('.container'); // Creates <div class="container">
$('#app'); // Creates <div id="app">
```

### Property Types

After the selector, pass any combination of:

#### 1. **String** - Text content

```typescript
$('p', 'This is a paragraph');
$('h1', 'Page Title');
```

#### 2. **HTMLElement** - Child element

```typescript
$('div', $('h2', 'Title'), $('p', 'Content'));
```

#### 3. **Object** - Element properties

```typescript
$('input', {
  type: 'email',
  required: true,
  placeholder: 'Enter email',
});

$('a', { href: '#', target: '_blank' }, 'Link');
```

#### 4. **Function** - Callback with element

```typescript
$('button', (el) => {
  el.addEventListener('click', () => alert('Clicked!'));
});

$('canvas', (el) => {
  const ctx = el.getContext('2d');
  // Draw on canvas
});
```

### TypeScript Support

The library provides full type inference based on the tag name:

```typescript
// Returns HTMLInputElement
const input = $('input', {
  type: 'email', // ✅ Valid property
  value: 'test@example.com', // ✅ Valid property
  // href: '#'  // ❌ TypeScript error - not valid for input
});

// Returns HTMLAnchorElement
const link = $('a', {
  href: '#', // ✅ Valid property
  target: '_blank', // ✅ Valid property
});

// Callback receives correctly typed element
$('canvas', (canvas) => {
  // canvas is HTMLCanvasElement
  const ctx = canvas.getContext('2d');
});
```

## Examples

### Form with Validation

```typescript
const loginForm = $(
  'form#login',
  (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Form submitted');
    });
  },
  $(
    '.form-group',
    $('label', { htmlFor: 'username' }, 'Username'),
    $('input#username.form-control', {
      type: 'text',
      required: true,
    })
  ),
  $(
    '.form-group',
    $('label', { htmlFor: 'password' }, 'Password'),
    $('input#password.form-control', {
      type: 'password',
      required: true,
    })
  ),
  $('button.btn.btn-primary', { type: 'submit' }, 'Sign In')
);

document.body.appendChild(loginForm);
```

### Dynamic List

```typescript
const todos = ['Buy groceries', 'Walk dog', 'Write code'];

const todoList = $(
  'ul.todo-list',
  ...todos.map((text) =>
    $('li.todo-item', $('span', text), $('button.delete', '×'))
  )
);
```

### Card Component

```typescript
function createCard(title: string, content: string, imageUrl?: string) {
  return $(
    '.card',
    imageUrl && $('img.card-img', { src: imageUrl, alt: title }),
    $(
      '.card-body',
      $('h3.card-title', title),
      $('p.card-text', content),
      $('button.card-btn', 'Read More')
    )
  );
}

const card = createCard(
  'TypeScript Tips',
  'Learn advanced TypeScript patterns',
  '/images/typescript.png'
);
```

### Canvas Drawing

```typescript
const canvas = $('canvas#myCanvas', { width: 800, height: 600 }, (el) => {
  const ctx = el.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);
  }
});
```

### Complex Forms

```typescript
const form = $(
  'form',
  (el) => {
    el.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // Handle submit.
      alert('Submitted');
    });
  },
  $(
    'legend',
    $('h1', 'Sign In'),
    $('p', 'Please sign in using the form below.'),
    $('p', $('a', { href: '#' }, 'Need an account?'))
  ),
  $(
    'fieldset',
    $(
      '.field',
      $('label', { htmlFor: 'email' }, 'Email Address'),
      $('input#email.input', { required: true, type: 'email' })
    ),
    $(
      '.field',
      $('label', { htmlFor: 'password' }, 'Password'),
      $('input#password.input', { required: true, type: 'password' })
    ),
    $('.field', $('input', { type: 'submit' }, 'Submit'))
  )
);
```

## Why inline?

### vs. Vanilla DOM

```typescript
// ❌ Vanilla - verbose and repetitive
const div = document.createElement('div');
div.className = 'container';
const h1 = document.createElement('h1');
h1.textContent = 'Title';
div.appendChild(h1);

// ✅ inline - concise and clear
const div = $('.container', $('h1', 'Title'));
```

### vs. JSX/React

- No build step required
- No virtual DOM overhead
- Perfect for vanilla JS projects
- Great for web components
- Ideal for browser extensions

### vs. Other DOM builders (hyperscript, etc.)

- Type-safe with full TypeScript inference
- CSS selector syntax (more intuitive)
- More flexible argument handling
- Modern TypeScript implementation

## Browser Support

Works in all modern browsers that support ES6. For older browsers, transpile with TypeScript/Babel.

## License

MIT

## Contributing

Contributions welcome! Feel free to open issues or submit PRs.

---

**Made with ❤️ for developers who love vanilla JavaScript**
