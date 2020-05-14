# DOM Utils

> Utils functions for interacting with DOM (requires a valid DOM context).

⚠️ The below utils require a valid DOM context.

⚠️ As operating on DOM, they should only be called after a component has mounted.

## List of functions

+ **[DOM Utils](#dom-utils)**
    + [getFontInformation](#getfontinformation)
    + [loadFonts](#loadfonts)
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

⚠ Only works with browsers that implement the [FontFaceSet interface](https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts).
As a standard, it is today implemented in most browsers, however keep in mind it may fall with some older devices.

ℹ If a browser doesn't support the FontFaceSet interface, the promise will resolve with a special object (to differ from unexpected errors). A warning will display **only in non production environment**.

ℹ It won't reject if a font can't load, since it will be antipattern to the ability of providing multiple css fonts. Reject only happens on unexpected errors.

## Copyright
2020 Kushuh - MIT license