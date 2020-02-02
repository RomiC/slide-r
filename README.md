# React-Sldr [![Build Status](https://travis-ci.org/RomiC/react-sldr.svg?branch=master)](https://travis-ci.org/RomiC/react-sldr) ![CI Action Status](https://github.com/RomiC/react-sldr/workflows/CI/badge.svg)

A small React component to create a responsive slider in your app. The problem it should solve is minimize of using JS when slider layout depends on the device's screen size.

For example you want to show in portrait mode 1 slide, and 3 slides in desktop. Usually you control your application layout via _media-queries_. But most of the existing slider/carousel-components doesn't support them. And you have to wrap your sliders in HOC which provide you information about the current screen resolution. But not in `react-sldr`.

While using `react-sldr` you're able to control the layout via _media-queries_. The issue above could be solved using pure css. For example:

```css
@media (max-width: 540px) {
  .sldr__wrapper {
    width: 33.3333%; /* 3 slides per view */
  }
}

@media (max-width: 320px) {
  .sldr__wrapper {
    width: 100%; /* 1 slide per view */
  }
}
```

Pls. take a look at the [Customize layout](#customize-layout)-section to find more ways of you can control slider layout.

## Installation

```bash
npm install --save react-sldr
```

## Example

```jsx
import Slider from 'react-sldr';
import 'react-sldr/dist/styles.css';

export default function App() {
  return (
    <Slider>
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide1' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide2' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide3' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide4' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide5' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide6' />
    </Slider>
  );
}
```

## Parameters

There are a few optional parameters available:

- `className: string` (default: `''`) - Additional className will be append to the root element. Could be used for customizing slider layout
- `classNames: object` - ClassNames for the slider elements. Could be usefull if you wish to use css-modules for customizing
  - `classNames.root: string` (default: `'sldr'`) - ClassName for root-element,
  - `classNames.wrapper: string` (default: `'sldr__wrapper'`) - ClassName for wrapper-element. This one used to control the slider layout
  - `classNames.list: string` (default: `'sldr__list'`) - ClassName for list-root-element,
  - `classNames.item: string` (default: `'sldr__item'`) - ClassName for list-item-element. This element will wrap slider children elements
  - `classNames.controls: string` (default: `'sldr__controls'`) - ClassName for controls-root-element,
    - `classNames.controlPrev: string` (default: `'sldr__control sldr__control--prev'`) - ClassName for prev-button-element,
    - `classNames.controlNext: string` (default: `'sldr__control sldr__control--next'`) - ClassName for next-button-element
- `controls: boolean` (default: `true`) - If `true` control elements (prev/next slide) will be shown
- `slidesAtOnce: number` (default: `1`) - Amount of slides to scroll at once

## Customize layout

There are 3 approaches to customize the layout of a slider.

### Overwriting css

You may just overwrite default css rules for `.sldr__wrapper`-selector:

```css
@media (max-width: 540px) {
  .sldr__wrapper {
    width: 33.3333%; /* 3 slides per view */
  }
}

@media (max-width: 320px) {
  .sldr__wrapper {
    width: 100%; /* 1 slide per view */
  }
}
```

### Custom classname

This is most common and simple way. Just pass custom class name thorough the `className` property and it will be appended to root-element. Later you may overwrite styles for it:

```jsx
import Slider from 'react-sldr';

export default function MySlider() {
  return (
    <Slider className='my-slider'>
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide1' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide2' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide3' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide4' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide5' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide6' />
    </Slider>
  );
}
```

```css
@media (max-width: 540px) {
  .my-slider .sldr__wrapper {
    width: 25%; /* 4 slides per view */
  }
}

@media (max-width: 320px) {
  .my-slider .sldr__wrapper {
    width: 50%; /* 2 slides per view */
  }
}
```

### CSS-modules

And finally you may use css-modules to define you own class-names. You need to define (at least) classes for `root`, `wrapper`, `list` and `item` elements. After that you should pass them to component using `classNames`-object-property.

```css
.root {
  composes: sldr from '~react-sldr/dist/styles.css';
}

.wrapper {
  composes: sldr__wrapper from '~react-sldr/dist/styles.css';
  width: 25%; /* 4 slides by default */
}

.list {
  composes: sldr__list from '~react-sldr/dist/styles.css';
}

.item {
  composes: sldr__item from '~react-sldr/dist/styles.css';
}

@media (max-width: 540px) {
  .wrapper {
    width: 50%; /* 2 slides */
  }
}

@media (max-width: 320px) {
  .wrapper {
    width: 100%; /* 1 slide */
  }
}
```

```jsx
import Slider from 'react-sldr';
import { root, wrapper, list, item } from './MySlider.module.css';

export default function MySlider() {
  return (
    <Slider classNames={{ root, wrapper, list, item }}>
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide1' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide2' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide3' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide4' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide5' />
      <img src='http://placehold.it/1000x400/ffffff/c0392b/&text=slide6' />
    </Slider>
  );
}
```
