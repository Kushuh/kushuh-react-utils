# DOM Utils

> Utils functions for interacting with DOM (requires a valid DOM context).

⚠️ The below utils require a valid DOM context.

⚠️ As operating on DOM, they should only be called after a component has mounted.

## List of functions

+ **[DOM Utils](#dom-utils)**
    + [Style](#style)
        + [getFontInformation](#getfontinformation)
        + [loadFonts](#loadfonts)
    + [Parsers](#parsers)
        + [getSelectionRange](#getselectionrange)
        + [setRange](#setrange)
        + [textNodesUnder](#textnodesunder)
+ **[Copyright](#copyright)**

---

### Style

> Interact with element rendered style.

#### getFontInformation

Returns some information about the rendered fonts of an element.

```javascript
// element must be an HTMLElement, such as returned by a React.RefObject.
const {fontSize, fontFamily, color} = getFontInformation(element);
```

#### loadFonts

Ensure every rendered font has loaded for a given element. Returns a Promise.

```javascript
// Promise returns empty on success.
// Returns {unsupported: true} if FontFaceSet is not implemented on current browser.
// Rejects on unexpected error.
const error = await loadFonts(element);
```

⚠️ Only works with browsers that implement the [FontFaceSet interface](https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts).
As a standard, it is today implemented in most browsers, however keep in mind it may fail with some older devices.

ℹ️ If a browser doesn't support the FontFaceSet interface, the promise will resolve with a special object (to differ from unexpected errors). A warning will display **only in non production environment**.

ℹ️ It won't reject if a font can't load, since it will be antipattern to the ability of providing multiple css fonts. Reject only happens on unexpected errors.

### Parsers

> Advanced DOM manipulation.

#### getSelectionRange

Returns the caret offsets inside an element (if any textNode inside is part of a selection).

```javascript
const {absolute, start, end} = getSelectionRange(element);
```

| parameter | type | description |
| :--- | :--- | :--- |
| absolute | object | Absolute offsets (actual offset if the element contained only a single textNode). |
| absolute.start | number | Absolute start offset. |
| absolute.end | number | Absolute end offset. |
| start | object | Start offset. |
| start.container | HTML Node | The deepest ancestor to which the start caret is pointing. |
| start.offset | number | Offset of the caret inside the container. |
| end | object | End offset. |
| end.container | HTML Node | The deepest ancestor to which the end caret is pointing. |
| end.offset | number | Offset of the caret inside the container. |

#### setRange

Set the caret to the given absolute positions in the element.

```javascript
// start and end refer to the boundaries of the current selection.
// index is based on the character position inside the rendered text (innerText).
// end is optional, and omitting it will merge it with start point.
setRange(element, start, end?);
```

#### textNodesUnder

Returns an Array of all textNodes under an element in the DOM tree.

```javascript
const textNodes = textNodesUnder(element);
```

ℹ️ [textNodes](https://developer.mozilla.org/en-US/docs/Web/API/Text) returned by the function are different from regular HTML elements.
You can access underlying text from textNode.data.

ℹ️ No textNode will return an Array with length 0.

## Copyright
2020 Kushuh - MIT license