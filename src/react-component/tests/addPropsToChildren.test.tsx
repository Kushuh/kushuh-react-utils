import * as React from 'react';
import {addPropsToChildren} from '../addPropsToChildren';
import {describe, expect, it} from '@jest/globals';

const prop0 = {foo: 'bar'};
const prop1: Array<string> = ['foo', 'bar'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prop2: (props: Record<string, unknown>) => Record<string, unknown> = ({foo, bar, ...props}) => ({
	foo: 'bar',
	bar: foo,
	...props
});
const prop3: Function = () => ({foo: 'bar'});
const prop4: () => Array<number> = () => [1, 2, 4];

const obj0: void = null;
const obj1: React.ReactNode = <div className={'blue'}/>;
const obj2 = 'A text node.'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Obj3 extends React.Component<{[key: string]: any}, unknown> {
	render(): React.ReactNode {
		return <span/>;
	}
}
const obj3 = <Obj3/>;
const obj4 = {foo: 'bar'};

describe(
	'test objects',
	() => {
		it('should render obj0 as null', () => {
			expect(obj0).toBe(null);
		});

		it('should render obj1 as React Node', () => {
			expect(React.isValidElement(obj1)).toBe(true);
		});

		it('should render obj2 as Text Node', () => {
			expect(obj2).toBe('A text node.');
			expect(React.isValidElement(obj2)).toBe(false);
		});

		it('should render obj3 as React Node', () => {
			expect(React.isValidElement(obj3)).toBe(true);
		});

		it('should render obj4 as Object', () => {
			expect(obj4.constructor).toBe(Object);
			expect(React.isValidElement(obj4)).toBe(false);
		});
	}
);

describe(
	'add object prop prop0 to react components',
	() => {
		it('should add prop0 to obj0', () => {
			const res = addPropsToChildren(obj0, prop0);
			expect(res).toBe(null);
		});

		it('should add prop0 to obj1', () => {
			const res = addPropsToChildren(obj1, prop0);
			expect(res['props']['foo']).toBe('bar');
			expect(res['props']['className']).toBe('blue');
		});

		it('should add prop0 to obj2', () => {
			const res = addPropsToChildren(obj2, prop0);
			expect(res).toBe('A text node.');
		});

		it('should add prop0 to obj3', () => {
			const res = addPropsToChildren(obj3, prop0);
			expect(res['props']['foo']).toBe('bar');
		});

		it('should fail to add prop0 to obj4', () => {
			let status = 0;
			try {
				addPropsToChildren(obj4, prop0);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});
	}
);

describe(
	'add array prop prop1 to react components',
	() => {
		it('should fail to add prop1 to obj0', () => {
			let status = 0;
			try {
				addPropsToChildren(obj0, prop1);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});

		it('should fail to add prop1 to obj1', () => {
			let status = 0;
			try {
				addPropsToChildren(obj1, prop1);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});

		it('should fail to add prop1 to obj2', () => {
			let status = 0;
			try {
				addPropsToChildren(obj2, prop1);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});

		it('should fail to add prop1 to obj3', () => {
			let status = 0;
			try {
				addPropsToChildren(obj3, prop1);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});

		it('should fail to add prop1 to obj4', () => {
			let status = 0;
			try {
				addPropsToChildren(obj4, prop1);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});
	}
);

describe(
	'add function prop prop2 with object return to react components',
	() => {
		it('should add prop2 to obj0', () => {
			const res = addPropsToChildren(obj0, prop2);
			expect(res).toBeNull();
		});

		it('should add prop2 to obj1', () => {
			const res = addPropsToChildren(obj1, prop2);
			expect(res['props']['foo']).toBe('bar');
			expect(res['props']['bar']).toBeUndefined();
			expect(res['props']['className']).toBe('blue');

			const res2 = addPropsToChildren(res, prop2);
			expect(res2['props']['foo']).toBe('bar');
			expect(res2['props']['bar']).toBe('bar');
			expect(res2['props']['className']).toBe('blue');
		});

		it('should add prop2 to obj2', () => {
			const res = addPropsToChildren(obj2, prop2);
			expect(res).toBe('A text node.');
		});

		it('should add prop2 to obj3', () => {
			const res = addPropsToChildren(obj3, prop2);
			expect(res['props']['foo']).toBe('bar');
			expect(res['props']['bar']).toBeUndefined();

			const res2 = addPropsToChildren(res, prop2);
			expect(res2['props']['foo']).toBe('bar');
			expect(res2['props']['bar']).toBe('bar');
		});

		it('should fail to add prop2 to obj4', () => {
			let status = 0;
			try {
				addPropsToChildren(obj4, prop2);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});
	}
);

describe(
	'add function prop prop3 with object return to react components',
	() => {
		it('should add prop3 to obj0', () => {
			const res = addPropsToChildren(obj0, prop3);
			expect(res).toBe(null);
		});

		it('should add prop3 to obj1', () => {
			const res = addPropsToChildren(obj1, prop3);
			expect(res['props']['foo']).toBe('bar');
			expect(res['props']['className']).toBeUndefined();
		});

		it('should add prop3 to obj2', () => {
			const res = addPropsToChildren(obj2, prop3);
			expect(res).toBe('A text node.');
		});

		it('should add prop3 to obj3', () => {
			const res = addPropsToChildren(obj3, prop3);
			expect(res['props']['foo']).toBe('bar');
		});

		it('should fail to add prop3 to obj4', () => {
			let status = 0;
			try {
				addPropsToChildren(obj4, prop3);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});
	}
);


describe(
	'add array prop prop4 to react components',
	() => {
		it('should add prop4 to obj0', () => {
			let status = 0;
			try {
				addPropsToChildren(obj0, prop4);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(0);
		});

		it('should fail to add prop4 to obj1', () => {
			let status = 0;
			try {
				addPropsToChildren(obj1, prop4);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});

		it('should add prop4 to obj2', () => {
			let status = 0;
			try {
				addPropsToChildren(obj2, prop4);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(0);
		});

		it('should fail to add prop4 to obj3', () => {
			let status = 0;
			try {
				addPropsToChildren(obj3, prop4);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});

		it('should fail to add pro40 to obj4', () => {
			let status = 0;
			try {
				addPropsToChildren(obj4, prop4);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});
	}
);

describe(
	'add prop0 to array of elements',
	() => {
		it(
			'should add foo prop to all valid elements',
			() => {
				const res = addPropsToChildren([obj0, obj1, obj2, obj3], prop0);

				expect(res[0]['props']['foo']).toBe('bar');
				expect(res[0]['props']['className']).toBe('blue');
				expect(res[1]).toBe('A text node.');
				expect(res[2]['props']['foo']).toBe('bar');
			}
		);

		it(
			'should add foo prop to empty array',
			() => {
				const res = addPropsToChildren([], prop0);
				expect(res).toStrictEqual([]);
			}
		);
	}
);

describe(
	'add prop2 to array of elements',
	() => {
		it(
			'should add foo prop to all valid elements',
			() => {
				const res = addPropsToChildren([obj0, obj1, obj2, obj3], prop2);

				expect(res[0]['props']['foo']).toBe('bar');
				expect(res[0]['props']['bar']).toBeUndefined();
				expect(res[0]['props']['className']).toBe('blue');
				expect(res[1]).toBe('A text node.');
				expect(res[2]['props']['foo']).toBe('bar');
				expect(res[2]['props']['bar']).toBeUndefined();


				const res2 = addPropsToChildren(res, prop2);

				expect(res2[0]['props']['foo']).toBe('bar');
				expect(res2[0]['props']['bar']).toBe('bar');
				expect(res2[0]['props']['className']).toBe('blue');
				expect(res2[1]).toBe('A text node.');
				expect(res2[2]['props']['foo']).toBe('bar');
				expect(res2[2]['props']['bar']).toBe('bar');
			}
		);
	}
);