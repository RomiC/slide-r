import React, { MouseEventHandler } from 'react';

interface SliderProps {
  /**
   * Additional class name for root
   */
  className?: string;
  /**
   * How many slides scroll per one scroll
   * @default 1
   */
  slidesAtOnce?: number;
  /**
   * Slides
   */
  children: JSX.Element[];
}

interface SliderState {
  /**
   * Index of current slide
   */
  currentSlide: number;
}

export default class Slider extends React.Component<SliderProps, SliderState> {
  root: HTMLDivElement | null = null;
  wrapper: HTMLElement | null = null;

  /**
   * Current amount of visible slides.
   * Calculate automatically upon the current
   * width of container and wrapper element
   */
  slidesPerView: number = 0;

  state = {
    currentSlide: 0
  };

  goTo: (slideIndex: number) => void = (slideIndex) =>
    this.setState({
      currentSlide: Math.max(
        Math.min(slideIndex, this.props.children.length),
        0
      )
    });

  nextSlide: MouseEventHandler = () => this.goTo(this.state.currentSlide + 1);

  prevSlide: MouseEventHandler = () => this.goTo(this.state.currentSlide - 1);

  onWindowResize = (() => {
    let timer = 0;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        if (this.root && this.wrapper) {
          const slidesPerView = Math.round(this.root.offsetWidth / this.wrapper.offsetWidth);

          if (slidesPerView !== this.slidesPerView) {
            this.slidesPerView = slidesPerView;
          }
        }
      }, 300);
    };
  })()

  componentDidMount() {
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    const {className, children} = this.props;
    const {currentSlide} = this.state;

    return (
      <div
        className={`slider ${className || ''}`}
        ref={(container) => {
          this.root = container;
          this.wrapper = container ? container.querySelector('.slider__wrapper') : null;
        }}>
        <div
          className="slider__wrapper"
          style={{
            transform: `translate3d(${-100 * currentSlide}%,0,0)`
          }}>
          <ul className="slider__list">{children}</ul>
        </div>
        <div className="slider__controls">
          <button
            type="button"
            className="slider__control slider__control--prev"
            onClick={this.prevSlide}>
            ←
          </button>
          &nbsp;
          <button
            type="button"
            className="slider__control slider__control--nex"
            onClick={this.nextSlide}>
            →
          </button>
        </div>
      </div>
    );
  }
}