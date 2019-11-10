"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
class Slider extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.root = null;
        this.wrapper = null;
        /**
         * Current amount of visible slides.
         * Calculate automatically upon the current
         * width of container and wrapper element
         */
        this.slidesPerView = 0;
        this.isTouched = false;
        this.lastEventCoordinate = 0;
        this.state = {
            currentSlide: 0,
            offsetX: 0
        };
        this.goTo = (slideIndex) => this.setState({
            currentSlide: slideIndex,
            offsetX: -100 * Math.max(Math.min(slideIndex, this.props.children.length), 0)
        });
        this.nextSlide = () => this.goTo(this.state.currentSlide + (this.props.slidesAtOnce || 1));
        this.prevSlide = () => this.goTo(this.state.currentSlide - (this.props.slidesAtOnce || 1));
        this.calculateSlidesPerView = () => {
            requestAnimationFrame(() => {
                if (this.root && this.wrapper) {
                    const slidesPerView = Math.round(this.root.offsetWidth / this.wrapper.offsetWidth);
                    if (slidesPerView !== this.slidesPerView) {
                        this.slidesPerView = slidesPerView;
                    }
                }
            });
        };
        this.onWindowResize = (() => {
            let timer = 0;
            return () => {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(this.calculateSlidesPerView, 300);
            };
        })();
        this.onRef = (container) => {
            this.root = container;
            this.wrapper = container
                ? container.querySelector('.slider__wrapper')
                : null;
        };
        this.onPointerDown = (event) => {
            this.isTouched = true;
            this.lastEventCoordinate = event.pageX;
        };
        this.onPointerMove = (event) => {
            if (this.isTouched) {
                const { offsetX } = this.state;
                const offsetDelta = this.calcOffset(event.pageX);
                this.setState({
                    offsetX: offsetX + offsetDelta
                });
            }
        };
        this.onPointerUp = () => {
            this.isTouched = false;
            this.lastEventCoordinate = 0;
        };
    }
    /**
     * Calculate offset in percentage
     * @param currentEventCoorinate X-coordinate of current event
     * @returns Offset value in percents
     */
    calcOffset(currentEventCoorinate) {
        if (this.wrapper === null) {
            return 0;
        }
        const offset = currentEventCoorinate - this.lastEventCoordinate;
        this.lastEventCoordinate = currentEventCoorinate;
        return (offset / this.wrapper.offsetWidth) * 100;
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
        const { offsetX } = this.state;
        return (react_1.default.createElement("div", { className: `slider ${className || ''}`, onPointerDown: this.onPointerDown, onPointerMove: this.onPointerMove, onPointerUp: this.onPointerUp, onPointerCancel: this.onPointerUp, ref: this.onRef },
            react_1.default.createElement("div", { className: `slider__wrapper${this.isTouched ? ' slider__wrapper--draggable' : ''}`, style: { transform: `translate3d(${offsetX}%,0,0)` } },
                react_1.default.createElement("ul", { className: "slider__list" }, react_1.Children.map(children, (child) => (react_1.default.createElement("li", { className: "slider__item", draggable: false }, child))))),
            controls && (react_1.default.createElement("div", { className: "slider__controls" },
                react_1.default.createElement("button", { type: "button", className: "slider__control slider__control--prev", onClick: this.prevSlide }, "\u2190"),
                "\u00A0",
                react_1.default.createElement("button", { type: "button", className: "slider__control slider__control--next", onClick: this.nextSlide }, "\u2192")))));
    }
}
exports.default = Slider;
//# sourceMappingURL=index.js.map