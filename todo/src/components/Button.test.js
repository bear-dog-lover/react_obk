import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

test('Buttonコンポーネント', () => {
  const text = '追加';
  // shallow関数でレンダリング後の結果を取得
  const wrapper = shallow(<Button>{text}</Button>);
  
  expect(wrapper.contains(text)).toEqual(true);
});