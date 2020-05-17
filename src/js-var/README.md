# Javascript variable Utils

> Utils functions for manipulating js variables.

## List of functions

+ **[Javascript variable Utils](#javascript-variable-utils)**
    + [String](#string)
        + [spliceString](#splicestring)
+ **[Copyright](#copyright)**

---

### String

#### spliceString

Splice method for string.

```javascript
// Example with an insertion. Works the same way as arr.splice().
str = spliceString(str, 1, 0, 'text');
```

⚠️ Unlike Array splice method, spliceString doesn't mutate the original string, but rather generates a new one.

## Copyright
2020 Kushuh - MIT license