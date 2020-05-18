const spliceString: (s: string, start: number, end: number, i?: string) => string =
    (s: string, start: number, end: number, i?: string) => {
        const arr = s.split('');
        arr.splice(start, end - start, i || '');
        return arr.join('');
    };

export {spliceString};