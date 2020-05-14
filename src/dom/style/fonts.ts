const isDevENV = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

/**
 * Get basic rendered font information about the current element. Note the element SHOULD exist and be rendered in the
 * DOM.
 *
 * @param element
 */
const getFontInformation: (element: HTMLElement) => {
    fontSize: string;
    fontFamily: string;
    color: string;
} = element => {
    const {fontSize, fontFamily, color} = window.getComputedStyle(element);
    return {fontSize, fontFamily, color};
};

/**
 * Wait for all the renderable fonts of an element to be loaded.
 *
 * @param element
 */
const loadFonts: (element: HTMLElement) => Promise<void | Record<string, boolean>> = element => new Promise(
    async (resolve, reject) => {
        if (!(document as any).fonts || !(document as any).fonts.load) {
            if (isDevENV) {
                console.warn('Current browser doesn\'t support fontFaceSet interface.');
            }

            resolve({unsupported: true});
        }

        const fontData = getFontInformation(element);
        const families = fontData.fontFamily.replace(/,\s/g, ',').split(',');

        try {
            const loadChain = [];
            /**
             * An element may have multiple renderable fonts.
             */
            for (const fontFamily of families) {
                loadChain.push(
                    (document as any).fonts.load(`${fontData.fontSize} ${fontFamily}`).catch()
                );
            }
            await Promise.all(loadChain);
            resolve();
        } catch(e) {
            reject(e);
        }
    }
);

export {getFontInformation, loadFonts};