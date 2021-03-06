interface Selection {
    absolute: {
        start: number;
        end: number;
    }
    start: {
        container: Node;
        offset: number;
    }
    end: {
        container: Node;
        offset: number;
    }
}

// From https://stackoverflow.com/a/23030157/9021186
const textNodesUnder: (element: HTMLElement) => Array<Text> = (element: HTMLElement) => {
    const recursor = n => {
        let i: number, a: Text[] = [];
        if (n.nodeType !== 3) {
            if (n.childNodes)
                for (i = 0; i < n.childNodes.length; ++i)
                    a = a.concat(recursor(n.childNodes[i]));
        } else {
            a.push(n as Text);
        }

        return a;
    };

    return recursor(element);
}

// From https://stackoverflow.com/a/4812022/9021186
const getSelectionRange: (element: HTMLElement) => Selection = (element: HTMLElement) => {
    let start = 0;
    let end = 0;
    let startContainer: Node = element;
    let endContainer: Node = element;
    let startOffset = 0;
    let endOffset = 0;
    const doc = element.ownerDocument;
    const win = doc.defaultView;

    const sel = win.getSelection();

    if (sel.rangeCount > 0) {
        const range = win.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        startContainer = range.startContainer;
        endContainer = range.endContainer;
        startOffset = range.startOffset;
        endOffset = range.endOffset;

        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.startContainer, range.startOffset);
        start = preCaretRange.toString().length;
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        end = preCaretRange.toString().length;
    }

    return {
        absolute: {
            start,
            end
        },
        start: {
            container: startContainer,
            offset: startOffset
        },
        end: {
            container: endContainer,
            offset: endOffset
        }
    };
};

const setRange: (element: HTMLElement, start: number, end?: number) => void =
    (element: HTMLElement, start: number, end?: number) => {
        /**
         * No need for useless computation if no text content.
         */
        if (element.innerText == null || element.innerText.length === 0) {
            return;
        }

        const textNodes = textNodesUnder(element);

        /**
         * Cap caret position.
         */
        start = Math.min(element.innerText.length, start);
        end = end == null ? start : end;
        end = Math.min(element.innerText.length, end);

        console.log(textNodes, start, end);

        /**
         * Avoid error when no textNode (cannot set caret).
         */
        if (textNodes.length > 0) {
            const range = document.createRange();

            /**
             * Convert absolute caret position into relative one (to the deepest descendant textNode).
             *
             * The reason we use the absolute values as arguments is to guaranty stable behavior when childNodes get
             * updated since caret position acquisition (although innerText remained the same, for example when a new
             * label was detected).
             */
            let i = 0;
            let preLength = textNodes[0].data.length;
            while (preLength <= start && i < textNodes.length - 1) {
                i++;
                preLength += textNodes[i].data.length;
            }

            const startNode = textNodes[i];
            const startOffset = start - preLength + startNode.data.length;
            while (preLength < end && i < textNodes.length - 1) {
                i++;
                preLength += textNodes[i].data.length;
            }

            const endNode = textNodes[i];
            const endOffset = end - preLength + endNode.data.length;

            range.setStart(startNode, startOffset);
            range.setEnd(endNode, endOffset);

            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    };

export {getSelectionRange, setRange, textNodesUnder};