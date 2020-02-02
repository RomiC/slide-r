import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import Slider from '../src/index';

import './styles.less';

class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <Slider className="my-slider">
          <div className="my-slider__slide">slide 1</div>
          <div className="my-slider__slide my-slider__slide--light">slide 2</div>
          <div className="my-slider__slide">slide 3</div>
          <div className="my-slider__slide my-slider__slide--light">slide 4</div>
          <div className="my-slider__slide">slide 5</div>
          <div className="my-slider__slide my-slider__slide--light">slide 6</div>
          <div className="my-slider__slide">slide 7</div>
        </Slider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
