import { PureComponent } from 'react';
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
    readonly state: {
        currentSlide: number;
        offsetX: number;
    };
    private root;
    private wrapper;
    /**
     * Current amount of visible slides.
     * Calculate automatically upon the current
     * width of container and wrapper element
     */
    private slidesPerView;
    private isTouched;
    private lastEventCoordinate;
    private onWindowResize;
    private goTo;
    private nextSlide;
    private prevSlide;
    private calculateSlidesPerView;
    private onRef;
    private onPointerDown;
    /**
     * Calculate offset in percentage
     * @param currentEventCoorinate X-coordinate of current event
     * @returns Offset value in percents
     */
    private calcOffset;
    private onPointerMove;
    private onPointerUp;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
