"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.root = null;
        _this.wrapper = null;
        /**
         * Current amount of visible slides.
         * Calculate automatically upon the current
         * width of container and wrapper element
         */
        _this.slidesPerView = 0;
        _this.state = {
            currentSlide: 0
        };
        _this.goTo = function (slideIndex) {
            return _this.setState({
                currentSlide: Math.max(Math.min(slideIndex, _this.props.children.length), 0)
            });
        };
        _this.nextSlide = function () { return _this.goTo(_this.state.currentSlide + 1); };
        _this.prevSlide = function () { return _this.goTo(_this.state.currentSlide - 1); };
        _this.onWindowResize = (function () {
            var timer = 0;
            return function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function () {
                    if (_this.root && _this.wrapper) {
                        var slidesPerView = Math.round(_this.root.offsetWidth / _this.wrapper.offsetWidth);
                        if (slidesPerView !== _this.slidesPerView) {
                            _this.slidesPerView = slidesPerView;
                        }
                    }
                }, 300);
            };
        })();
        return _this;
    }
    Slider.prototype.componentDidMount = function () {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    };
    Slider.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.onWindowResize);
    };
    Slider.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, controls = _a.controls, children = _a.children;
        var currentSlide = this.state.currentSlide;
        return (react_1.default.createElement("div", { className: "slider " + (className || ''), ref: function (container) {
                _this.root = container;
                _this.wrapper = container ? container.querySelector('.slider__wrapper') : null;
            } },
            react_1.default.createElement("div", { className: "slider__wrapper", style: { transform: "translate3d(" + -100 * currentSlide + "%,0,0)" } },
                react_1.default.createElement("ul", { className: "slider__list" }, children)),
            controls && (react_1.default.createElement("div", { className: "slider__controls" },
                react_1.default.createElement("button", { type: "button", className: "slider__control slider__control--prev", onClick: this.prevSlide }, "\u2190"),
                "\u00A0",
                react_1.default.createElement("button", { type: "button", className: "slider__control slider__control--next", onClick: this.nextSlide }, "\u2192")))));
    };
    return Slider;
}(react_1.PureComponent));
exports.default = Slider;
//# sourceMappingURL=index.js.map