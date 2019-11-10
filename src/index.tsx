import React, {
  Children,
  MouseEventHandler,
  PureComponent,
  PointerEventHandler
} from 'react';

interface SliderProps {
  /**
   * Additional class name for root
   */
  className?: string;
  /**
   * Show next/prev slide control buttons
   * @default true
   */
  controls?: boolean;
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
  /**
   * Slider wrapper offset in percent
   */
  offsetX: number;
}

export default class Slider extends PureComponent<SliderProps, SliderState> {
  private root: HTMLDivElement | null = null;
  private wrapper: HTMLElement | null = null;

  /**
   * Current amount of visible slides.
   * Calculate automatically upon the current
   * width of container and wrapper element
   */
  private slidesPerView: number = 0;

  private isTouched: boolean = false;
  private lastEventCoordinate: number = 0;

  readonly state = {
    currentSlide: 0,
    offsetX: 0
  };

  private goTo: (slideIndex: number) => void = (slideIndex) =>
    this.setState({
      currentSlide: slideIndex,
      offsetX:
        -100 * Math.max(Math.min(slideIndex, this.props.children.length), 0)
    });

  private nextSlide: MouseEventHandler = () =>
    this.goTo(this.state.currentSlide + (this.props.slidesAtOnce || 1));

  private prevSlide: MouseEventHandler = () =>
    this.goTo(this.state.currentSlide - (this.props.slidesAtOnce || 1));

  private calculateSlidesPerView = (): void => {
    requestAnimationFrame(() => {
      if (this.root && this.wrapper) {
        const slidesPerView = Math.round(
          this.root.offsetWidth / this.wrapper.offsetWidth
        );

        if (slidesPerView !== this.slidesPerView) {
          this.slidesPerView = slidesPerView;
        }
      }
    });
  };

  private onWindowResize = (() => {
    let timer = 0;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(this.calculateSlidesPerView, 300);
    };
  })();

  private onRef: (container: HTMLDivElement) => void = (container) => {
    this.root = container;
    this.wrapper = container
      ? container.querySelector('.slider__wrapper')
      : null;
  };

  private onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    this.isTouched = true;
    this.lastEventCoordinate = event.pageX;
  };

  /**
   * Calculate offset in percentage
   * @param currentEventCoorinate X-coordinate of current event
   * @returns Offset value in percents
   */
  private calcOffset(currentEventCoorinate: number): number {
    if (this.wrapper === null) {
      return 0;
    }

    const offset = currentEventCoorinate - this.lastEventCoordinate;
    this.lastEventCoordinate = currentEventCoorinate;

    return (offset / this.wrapper.offsetWidth) * 100;
  }

  private onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (this.isTouched) {
      const { offsetX } = this.state;
      const offsetDelta = this.calcOffset(event.pageX);

      this.setState({
        offsetX: offsetX + offsetDelta
      });
    }
  };

  private onPointerUp: PointerEventHandler<HTMLDivElement> = () => {
    this.isTouched = false;
    this.lastEventCoordinate = 0;
  };

  componentDidMount() {
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    const { className, controls = true, children } = this.props;
    const { offsetX } = this.state;

    return (
      <div
        className={`slider ${className || ''}`}
        onPointerDown={this.onPointerDown}
        onPointerMove={this.onPointerMove}
        onPointerUp={this.onPointerUp}
        onPointerCancel={this.onPointerUp}
        ref={this.onRef}
      >
        <div
          className={`slider__wrapper${
            this.isTouched ? ' slider__wrapper--draggable' : ''
          }`}
          style={{ transform: `translate3d(${offsetX}%,0,0)` }}
        >
          <ul className="slider__list">
            {Children.map(children, (child) => (
              <li className="slider__item" draggable={false}>
                {child}
              </li>
            ))}
          </ul>
        </div>

        {controls && (
          <div className="slider__controls">
            <button
              type="button"
              className="slider__control slider__control--prev"
              onClick={this.prevSlide}
            >
              ←
            </button>
            &nbsp;
            <button
              type="button"
              className="slider__control slider__control--next"
              onClick={this.nextSlide}
            >
              →
            </button>
          </div>
        )}
      </div>
    );
  }
}
