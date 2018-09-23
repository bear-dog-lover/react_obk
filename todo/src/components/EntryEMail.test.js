import React from 'react';
import { mount, shallow } from 'enzyme';
import EntryEMail from './EntryEMail';

test('EntryEMailコンポーネント', () => {
  const mockFunc = jest.fn();
  // shallow()でレンダリングするとsimulateができない
  const wrapper = mount(<EntryEMail onClick={mockFunc} />);
  
  wrapper.find('button').simulate('click');
  expect(mockFunc).toHaveBeenCalled();
});