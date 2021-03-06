import React from 'react';
import { shallow } from 'enzyme';
import List from './index';

describe('<List />', () => {
  const children = [
    <List.Item key="0" />,
    <List.Item key="1" />,
    <List.Item key="2" />,
  ];

  it('renders with children', () => {
    const numChildren = children.length;
    const wrapper = shallow(<List>{children}</List>);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(List.Item).length).toBe(numChildren);
  });

  it('renders without children', () => {
    const wrapper = shallow(<List />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(List.Item).length).toBe(0);
  });
});
