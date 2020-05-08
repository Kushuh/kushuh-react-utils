import React from 'react';
import {addPropsToChildren} from '../addPropsToChildren';
import {describe, expect, it} from '@jest/globals';

const prop0 = {foo: 'bar'};
const prop1 = ['foo', 'bar'];
const prop2 = ({foo, ...props}) => ({
	foo: 'bar',
	bar: foo,
	...props
});
const prop3 = () => ({foo: 'bar'});
const prop4 = () => [1, 2, 4];

const obj0 = null;
const obj1 = <div className={'blue'}/>;
const obj2 = 'A text node.'
class Obj3 extends React.Component {
	render() {
		return <span/>;
	}
}
const obj4 = () => 'not valid component!';

describe(
	'test objects',
	() => {
		it('should render obj0 as null', () => {
			expect(obj0).toBe(null);
			expect(React.isValidElement(obj1)).toBe(false);
		});

		it('should render obj1 as React Node', () => {
			expect(React.isValidElement(obj1)).toBe(true);
		});

		it('should render obj2 as Text Node', () => {
			expect(obj2).toEqual('A text node.');
			expect(React.isValidElement(obj2)).toBe(false);
		});

		it('should render obj3 as React Node', () => {
			expect(React.isValidElement(Obj3)).toBe(true);
		});

		it('should render obj4 as function', () => {
			expect(obj4.constructor).toBe(Function);
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
			expect(res.prop('foo')).toBe('bar');
			expect(res.prop('className')).toBe('blue');
		});

		it('should add prop0 to obj2', () => {
			const res = addPropsToChildren(obj2, prop0);
			expect(res).toBe('A text node.');
		});

		it('should add prop0 to obj3', () => {
			const res = addPropsToChildren(Obj3, prop0);
			expect(res.prop('foo')).toBe('bar');
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
				addPropsToChildren(Obj3, prop1);
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
			expect(res).toBe(null);
		});

		it('should add prop2 to obj1', () => {
			const res = addPropsToChildren(obj1, prop2);
			expect(res.prop('foo')).toBe('bar');
			expect(res.prop('bar')).toBe(null);
			expect(res.prop('className')).toBe('blue');

			const res2 = addPropsToChildren(res, prop2);
			expect(res2.prop('foo')).toBe('bar');
			expect(res2.prop('bar')).toBe('bar');
			expect(res2.prop('className')).toBe('blue');
		});

		it('should add prop2 to obj2', () => {
			const res = addPropsToChildren(obj2, prop2);
			expect(res).toBe('A text node.');
		});

		it('should add prop2 to obj3', () => {
			const res = addPropsToChildren(Obj3, prop2);
			expect(res.prop('foo')).toBe('bar');
			expect(res.prop('bar')).toBe(null);

			const res2 = addPropsToChildren(res, prop2);
			expect(res2.prop('foo')).toBe('bar');
			expect(res2.prop('bar')).toBe('bar');
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
			expect(res.prop('foo')).toBe('bar');
			expect(res.prop('className')).toBe(null);
		});

		it('should add prop3 to obj2', () => {
			const res = addPropsToChildren(obj2, prop3);
			expect(res).toBe('A text node.');
		});

		it('should add prop3 to obj3', () => {
			const res = addPropsToChildren(Obj3, prop3);
			expect(res.prop('foo')).toBe('bar');
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
		it('should fail to add prop4 to obj0', () => {
			let status = 0;
			try {
				addPropsToChildren(obj0, prop4);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
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

		it('should fail to add prop4 to obj2', () => {
			let status = 0;
			try {
				addPropsToChildren(obj2, prop4);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});

		it('should fail to add prop4 to obj3', () => {
			let status = 0;
			try {
				addPropsToChildren(Obj3, prop4);
			} catch (e) {
				status = 1;
			}

			expect(status).toBe(1);
		});

		it('should fail to add prop4 to obj4', () => {
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
				const res = addPropsToChildren([obj0, obj1, obj2, Obj3], prop0);

				expect(res[0]).toBe(null);
				expect(res[1].prop('foo')).toBe('bar');
				expect(res[1].prop('className')).toBe('blue');
				expect(res[2]).toBe('A text node.');
				expect(res[3].prop('foo')).toBe('bar');
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
				const res = addPropsToChildren([obj0, obj1, obj2, Obj3], prop2);

				expect(res[0]).toBe(null);
				expect(res[1].prop('foo')).toBe('bar');
				expect(res[1].prop('bar')).toBe(null);
				expect(res[1].prop('className')).toBe('blue');
				expect(res[2]).toBe('A text node.');
				expect(res[3].prop('foo')).toBe('bar');
				expect(res[3].prop('bar')).toBe(null);


				const res2 = addPropsToChildren(res, prop2);

				expect(res2[0]).toBe(null);
				expect(res2[1].prop('foo')).toBe('bar');
				expect(res2[1].prop('bar')).toBe('bar');
				expect(res2[1].prop('className')).toBe('blue');
				expect(res2[2]).toBe('A text node.');
				expect(res2[3].prop('foo')).toBe('bar');
				expect(res2[3].prop('bar')).toBe('bar');
			}
		);
	}
);