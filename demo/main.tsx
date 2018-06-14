import React from 'react';
import ReactDOM from 'react-dom';

import Slider from '../src/index';

class App extends React.Component<null, null> {
  render() {
    return (
      <div className="app">
        <Slider>
          <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />
          <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" />
          <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" />
          <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4" />
          <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5" />
          <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6" />
        </Slider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));