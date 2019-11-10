import React, {
  Children,
  MouseEventHandler,
  PointerEventHandler,
  PureComponent
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
   * Is user scrolling slides via touch/drag
   */
  isTouched: boolean;
  /**
   * Slider wrapper offset in percent
   */
  offsetX: number;
}

export default class Slider extends PureComponent<SliderProps, SliderState> {
  readonly state = {
    currentSlide: 0,
    isTouched: false,
    offsetX: 0
  };

  private root: HTMLDivElement | null = null;
  private wrapper: HTMLElement | null = null;

  /**
   * Current amount of visible slides.
   * Calculate automatically upon the current
   * width of container and wrapper element
   */
  private slidesPerView: number = 0;

  private lastEventCoordinate: number = 0;

  private onWindowResize = (() => {
    let timer = 0;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = window.setTimeout(this.calculateSlidesPerView, 300);
    };
  })();

  private goTo: (slideIndex: number) => void = (slideIndex) =>
    this.setState({
      currentSlide: slideIndex,
      offsetX:
        -100 * Math.max(Math.min(slideIndex, this.props.children.length), 0)
    })

  private nextSlide: MouseEventHandler = () =>
    this.goTo(this.state.currentSlide + (this.props.slidesAtOnce || 1))

  private prevSlide: MouseEventHandler = () =>
    this.goTo(this.state.currentSlide - (this.props.slidesAtOnce || 1))

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
  }

  private onRef: (container: HTMLDivElement) => void = (container) => {
    this.root = container;
    this.wrapper = container
      ? container.querySelector('.sldr__wrapper')
      : null;
  }

  private onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    this.lastEventCoordinate = event.pageX;
    this.setState({
      isTouched: true
    });
  }

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
    if (this.state.isTouched) {
      const { offsetX } = this.state;
      const offsetDelta = this.calcOffset(event.pageX);

      this.setState({
        offsetX: offsetX + offsetDelta
      });
    }
  }

  private onPointerUp: PointerEventHandler<HTMLDivElement> = () => {
    this.lastEventCoordinate = 0;
    this.setState({
      currentSlide: Math.round(Math.abs(this.state.offsetX) / 100),
      isTouched: false
    });
  }

  componentDidMount() {
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    const { className, controls = true, children } = this.props;
    const { offsetX, isTouched } = this.state;

    return (
      <div
        className={`sldr ${className || ''}`}
        onPointerDown={this.onPointerDown}
        onPointerMove={this.onPointerMove}
        onPointerUp={this.onPointerUp}
        onPointerCancel={this.onPointerUp}
        ref={this.onRef}
      >
        <div
          className={`sldr__wrapper${
            isTouched ? ' sldr__wrapper--draggable' : ''
            }`}
          style={{ transform: `translate3d(${offsetX}%,0,0)` }}
        >
          <ul className="sldr__list">
            {Children.map(children, (child) => (
              <li className="sldr__item" draggable={false}>
                {child}
              </li>
            ))}
          </ul>
        </div>

        {controls && (
          <div className="sldr__controls">
            <button
              type="button"
              className="sldr__control sldr__control--prev"
              onClick={this.prevSlide}
            >
              ←
            </button>
            &nbsp;
            <button
              type="button"
              className="sldr__control sldr__control--next"
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
