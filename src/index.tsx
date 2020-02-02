import React, {
  Children,
  MouseEventHandler,
  PointerEventHandler,
  PureComponent,
  ReactNode
} from 'react';

interface GoToFunction {
  (slideIndex: number): void;
}

interface SliderProps {
  /**
   * Additional class name for root
   */
  className?: string;
  /**
   * Custom list of elements classNames
   */
  classNames?: SliderClassNames;
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
  /**
   * Render controls function
   * @param currentSlide Index of the current slide (starting from 0)
   * @param goTo Scroll to slide by index
   */
  renderControls: (currentSlide: number, goTo: GoToFunction) => ReactNode;
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

interface SliderClassNames {
  root: string;
  wrapper: string;
  list?: string;
  item?: string;
  controls?: string;
  controlPrev?: string;
  controlNext?: string;
}

const defaultClassNames: SliderClassNames = {
  root: 'sldr',
  wrapper: 'sldr__wrapper',
  list: 'sldr__list',
  item: 'sldr__item',
  controls: 'sldr__controls',
  controlPrev: 'sldr__control sldr__control--prev',
  controlNext: 'sldr__control sldr__control--next'
};

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

  private goTo: GoToFunction = (slideIndex) => {
    const nextSlide = Math.max(
      Math.min(slideIndex, this.props.children.length),
      0
    );
    this.setState({
      currentSlide: nextSlide,
      offsetX: -100 * nextSlide
    });
  };

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

  private onRef: (container: HTMLDivElement) => void = (container) => {
    const { wrapper } = this.props.classNames || defaultClassNames;
    this.root = container;
    this.wrapper = container ? container.querySelector(`.${wrapper}`) : null;
  };

  private onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    this.lastEventCoordinate = event.pageX;
    this.setState({
      isTouched: true
    });
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
    if (this.state.isTouched) {
      const { pageX } = event;

      requestAnimationFrame(() => {
        const { offsetX } = this.state;
        const offsetDelta = this.calcOffset(pageX);

        this.setState({
          offsetX: offsetX + offsetDelta
        });
      });
    }
  };

  private onPointerUp: PointerEventHandler<HTMLDivElement> = () => {
    this.lastEventCoordinate = 0;
    this.setState({
      currentSlide: Math.round(Math.abs(this.state.offsetX) / 100),
      isTouched: false
    });
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
    const { offsetX, isTouched } = this.state;
    const classNames: SliderClassNames = {
      ...defaultClassNames,
      ...this.props.classNames
    };

    return (
      <div
        className={`${classNames.root} ${className || ''}`}
        onPointerDown={this.onPointerDown}
        onPointerMove={this.onPointerMove}
        onPointerUp={this.onPointerUp}
        onPointerCancel={this.onPointerUp}
        ref={this.onRef}
      >
        <div
          className={`${classNames.wrapper}${
            isTouched ? ` ${classNames.wrapper}--draggable` : ''
          }`}
          style={{ transform: `translate3d(${offsetX}%,0,0)` }}
        >
          <ul className={classNames.list}>
            {Children.map(children, (child) => (
              <li className={classNames.item} draggable={false}>
                {child}
              </li>
            ))}
          </ul>
        </div>

        {controls && (
          <div className={classNames.controls}>
            <button
              type='button'
              className={classNames.controlPrev}
              onClick={this.prevSlide}
            >
              ←
            </button>
            &nbsp;
            <button
              type='button'
              className={classNames.controlNext}
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
