import { MouseEventHandler, PureComponent } from 'react';
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
}
export default class Slider extends PureComponent<SliderProps, SliderState> {
    root: HTMLDivElement | null;
    wrapper: HTMLElement | null;
    /**
     * Current amount of visible slides.
     * Calculate automatically upon the current
     * width of container and wrapper element
     */
    slidesPerView: number;
    state: {
        currentSlide: number;
    };
    goTo: (slideIndex: number) => void;
    nextSlide: MouseEventHandler;
    prevSlide: MouseEventHandler;
    onWindowResize: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
