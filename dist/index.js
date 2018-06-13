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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
        return _this;
    }
    Slider.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children;
        var currentSlide = this.state.currentSlide;
        return (react_1.default.createElement("div", { className: "slider " + (className || '') },
            react_1.default.createElement("div", { className: "slider__wrapper", style: {
                    transform: "translate3d(" + -100 * currentSlide + "%,0,0)"
                } },
                react_1.default.createElement("ul", { className: "slider__list" }, children)),
            react_1.default.createElement("div", { className: "slider__controls" },
                react_1.default.createElement("button", { type: "button", className: "slider__control slider__control--prev", onClick: this.prevSlide }, "\u2190"),
                "\u00A0",
                react_1.default.createElement("button", { type: "button", className: "slider__control slider__control--nex", onClick: this.nextSlide }, "\u2192"))));
    };
    return Slider;
}(react_1.default.Component));
exports.default = Slider;
//# sourceMappingURL=index.js.map