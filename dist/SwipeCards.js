'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

exports['default'] = _react2['default'].createClass({
  displayName: 'SwipeCards',

  getDefaultProps: function getDefaultProps() {
    return {
      height: 500,
      width: 300,
      cards: []
    };
  },

  getInitialState: function getInitialState() {
    return {
      cards: this.props.cards.slice()
    };
  },

  onCardSwipe: function onCardSwipe(card, like) {
    this.state.cards.splice(card, 1);
    this.setState({
      cards: this.state.cards
    });
    console.log('Like? ' + like);
  },

  renderEmptyCard: function renderEmptyCard() {
    return _react2['default'].createElement(
      'div',
      { style: {
          backgroundColor: '#ccc',
          height: this.props.height + 'px',
          width: this.props.width + 'px',
          border: '2px #aaa solid',
          borderRadius: '10px',
          position: 'absolute',
          zIndex: -1
        } },
      _react2['default'].createElement(
        'p',
        { style: {
            textAlign: 'center',
            width: '100%',
            marginTop: '50%',
            fontSize: '30px',
            color: '#555'
          } },
        'No cards left!'
      )
    );
  },

  renderCardStack: function renderCardStack() {
    var _this = this;

    var cardsToShow = this.state.cards.slice(0, 4);
    return cardsToShow.map(function (card, index) {
      return _react2['default'].createElement(Card, _extends({
        height: _this.props.height, width: _this.props.width
      }, card, { key: index, index: index, onSwipe: _this.onCardSwipe }));
    });
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { style: { fontFamily: 'Lato, sans-serif' } },
      this.renderEmptyCard(),
      this.renderCardStack()
    );
  }

});
var Card = _react2['default'].createClass({
  displayName: 'Card',

  getDefaultProps: function getDefaultProps() {
    return {
      height: 500,
      width: 300,
      infoHeight: 60,
      index: 0
    };
  },

  getInitialState: function getInitialState() {
    return {
      dragging: false,
      offset: {
        x: 0,
        y: 0
      },
      relative: null
    };
  },

  cardStyle: function cardStyle() {
    return {
      height: this.props.height + 'px',
      width: this.props.width + 'px',
      borderRadius: '10px',
      border: '1px #ccc solid',
      backgroundClip: 'content-box',
      position: 'absolute',
      marginTop: this.props.index * 5 + 'px',
      backgroundColor: '#fff',
      zIndex: 100 - this.props.index,
      transform: 'translate(' + this.state.offset.x + 'px, ' + this.state.offset.y + 'px) rotate(' + -this.swipeMagnitude() * 8 + 'deg)'
    };
  },

  cardImage: function cardImage() {
    return _react2['default'].createElement('div', { style: this.cardImageStyle() });
  },

  cardImageStyle: function cardImageStyle() {
    return {
      height: 'calc(100% - ' + this.props.infoHeight + 'px)',
      backgroundImage: 'url(' + this.props.picture + ')',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      borderTopLeftRadius: '9px', // Needed for border
      borderTopRightRadius: '9px', // Needed for border
      backgroundColor: '#ccc' // Blank background
    };
  },

  cardInfo: function cardInfo() {
    return _react2['default'].createElement(
      'div',
      { style: this.cardInfoStyle() },
      _react2['default'].createElement(
        'div',
        { style: { display: 'inline-block' } },
        _react2['default'].createElement(
          'span',
          null,
          _react2['default'].createElement(
            'strong',
            null,
            this.props.name,
            ','
          ),
          ' ',
          this.props.age
        )
      ),
      _react2['default'].createElement(
        'div',
        { style: { display: 'inline-block', float: 'right' } },
        _react2['default'].createElement(
          'span',
          { style: { color: '#f78266', marginRight: '20px' } },
          _react2['default'].createElement('i', { className: 'fa fa-users' }),
          ' ',
          this.props.friends
        ),
        _react2['default'].createElement(
          'span',
          { style: { color: '#d5d5d5' } },
          _react2['default'].createElement('i', { className: 'fa fa-book' }),
          ' ',
          this.props.moments
        )
      )
    );
  },

  cardInfoStyle: function cardInfoStyle() {
    return {
      height: this.props.infoHeight + 'px',
      padding: '20px 15px'
    };
  },

  likeNope: function likeNope() {
    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'div',
        { style: this.nopeStyle() },
        'Nope'
      ),
      _react2['default'].createElement(
        'div',
        { style: this.likeStyle() },
        'Like'
      )
    );
  },

  likeNopeStyle: function likeNopeStyle() {
    return {
      marginTop: '25px',
      position: 'absolute',
      borderRadius: '10px',
      textTransform: 'uppercase',
      fontSize: '30px',
      padding: '5px 10px',
      fontWeight: 'bold'
    };
  },

  likeStyle: function likeStyle() {
    return Object.assign(this.likeNopeStyle(), {
      left: 0,
      marginLeft: '20px',
      color: '#4bcc82',
      border: '6px solid #4bcc82',
      opacity: this.swipeMagnitude(),
      transform: 'rotate(-10deg)'
    });
  },

  nopeStyle: function nopeStyle() {
    return Object.assign(this.likeNopeStyle(), {
      right: 0,
      marginRight: '20px',
      color: '#f78267',
      border: '6px solid #f78267',
      opacity: -this.swipeMagnitude(),
      transform: 'rotate(20deg)'
    });
  },

  startDragging: function startDragging(x, y) {
    this.setState({
      dragging: true,
      start: { x: x, y: y }
    });
  },

  stopDragging: function stopDragging() {
    if (Math.abs(this.swipeMagnitude()) > 0.5) {
      this.props.onSwipe(this.props.index, this.swipeMagnitude() > 0);
    }

    this.setState({
      dragging: false,
      offset: {
        x: 0,
        y: 0
      }
    });
  },

  onDrag: function onDrag(x, y) {
    this.setState({
      offset: {
        x: x - this.state.start.x,
        y: y - this.state.start.y
      }
    });
  },

  onTouchStart: function onTouchStart(e) {
    e.preventDefault();
    e.stopPropagation();
    e = e.touches[0];
    this.startDragging(e.pageX, e.pageY);
  },

  onTouchEnd: function onTouchEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    this.stopDragging();
  },

  onTouchMove: function onTouchMove(e) {
    if (!this.state.dragging) return;
    e.preventDefault();
    e.stopPropagation();
    e = e.touches[0];
    this.onDrag(e.pageX, e.pageY);
  },

  onMouseDown: function onMouseDown(e) {
    if (e.button !== 0) return;
    this.startDragging();
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseUp: function onMouseUp(e) {
    if (e.button !== 0) return;
    this.stopDragging(e.pageX, e.pageY);
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseMove: function onMouseMove(e) {
    if (!this.state.dragging) return;
    this.onDrag(e.pageX, e.pageY);
    e.stopPropagation();
    e.preventDefault();
  },

  swipeMagnitude: function swipeMagnitude() {
    return this.state.offset.x / this.props.width;
  },

  addMovementListeners: function addMovementListeners() {
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },

  removeMovementListeners: function removeMovementListeners() {
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  },

  componentDidUpdate: function componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      this.addMovementListeners();
    } else if (!this.state.dragging && state.dragging) {
      this.removeMovementListeners();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.removeMovementListeners();
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { style: this.cardStyle(), onMouseDown: this.onMouseDown, onTouchStart: this.onTouchStart },
      this.likeNope(),
      this.cardImage(),
      this.cardInfo()
    );
  }

});
exports.Card = Card;