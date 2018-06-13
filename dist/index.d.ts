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
    state: {
        currentSlide: number;
    };
    goTo: (slideIndex: number) => void;
    nextSlide: MouseEventHandler;
    prevSlide: MouseEventHandler;
    render(): JSX.Element;
}
export {};
