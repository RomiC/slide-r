# react-sldr [![Build Status](https://travis-ci.org/RomiC/react-sldr.svg?branch=master)](https://travis-ci.org/RomiC/react-sldr)

A small React component to create a responsive slider in your app. 
It was created to have minimum calculation in JS. Layout is totally
controlled over css.

:exclamation: Pls, be aware it's an early alpha-version.
Almost proof-of-concept. I will work further on improovements
and stability. But PR's and issues are welcome.

## Installation

```bash
npm install --save react-sldr
```

## Example

```jsx
<Slider>
  <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />
  <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" />
  <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" />
  <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4" />
  <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5" />
  <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6" />
</Slider>
```