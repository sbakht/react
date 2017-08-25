import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Generator from './generator';
import toJSON from 'enzyme-to-json';

test('makes conjugations correctly', () => {
    var strs = "لعف وسن نيب";
    strs.split(' ').map((str) => {
        const [root1, root2, root3] = str.split('');
        var roots = { root1, root2, root3 };
        for(var i = 2; i <= 10; i++) {
            roots.form = i;
            expect(Generator(roots)).toMatchSnapshot();
        }
    });
});
