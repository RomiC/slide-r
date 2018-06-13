import React from 'react';
import renderer from 'react-test-renderer';

import Slider from '../src';

let props = null;
let slides = null;

beforeEach(() => {
  props = {
    slidesAtOnce: 1
  };
  slides = [
    <img key="1" src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />,
    <img key="2" src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" />,
    <img key="3" src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" />,
    <img key="4" src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4" />,
    <img key="5" src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5" />,
    <img key="6" src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6" />
  ];
});

test('shoud render component', () => {
  const component = renderer.create(<Slider {...props}>{slides}</Slider>).toJSON();
  expect(component).toMatchSnapshot();
});