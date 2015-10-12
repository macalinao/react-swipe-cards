import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({

  getDefaultProps() {
    return {
      height: 500,
      width: 300,
      cards: []
    }
  },

  getInitialState() {
    return {
      cards: this.props.cards.slice()
    };
  },

  onCardSwipe(card, like) {
    this.state.cards.splice(card, 1);
    this.setState({
      cards: this.state.cards
    });
    console.log(`Like? ${like}`);
  },

  renderEmptyCard() {
    return <div style={{
      backgroundColor: '#ccc',
      height: `${this.props.height}px`,
      width: `${this.props.width}px`,
      border: '2px #aaa solid',
      borderRadius: '10px',
      position: 'absolute',
      zIndex: -1
    }}>
      <p style={{
        textAlign: 'center',
        width: '100%',
        marginTop: '50%',
        fontSize: '30px',
        color: '#555'
      }}>No cards left!</p>
    </div>;
  },

  renderCardStack() {
    let cardsToShow = this.state.cards.slice(0, 4);
    return cardsToShow.map((card, index) => {
      return <Card
        height={this.props.height} width={this.props.width}
        {...card} index={index} onSwipe={this.onCardSwipe} />;
    });
  },

  render() {
    return <div style={{ fontFamily: 'Lato, sans-serif' }}>
      {this.renderEmptyCard()}
      {this.renderCardStack()}
    </div>;
  }

});

export const Card = React.createClass({

  getDefaultProps() {
    return {
      height: 500,
      width: 300,
      infoHeight: 60,
      index: 0
    };
  },

  getInitialState() {
    return {
      dragging: false,
      offset: {
        x: 0,
        y: 0
      },
      relative: null
    }
  },

  cardStyle() {
    return {
      height: `${this.props.height}px`,
      width: `${this.props.width}px`,
      borderRadius: '10px',
      border: '1px #ccc solid',
      backgroundClip: 'content-box',
      position: 'absolute',
      marginTop: `${this.props.index * 5}px`,
      backgroundColor: '#fff',
      zIndex: 100 - this.props.index,
      transform: `translate(${this.state.offset.x}px, ${this.state.offset.y}px) rotate(${-(this.swipeMagnitude()) * 8}deg)`
    };
  },

  cardImage() {
    return <div style={this.cardImageStyle()}></div>;
  },

  cardImageStyle() {
    return {
      height: `calc(100% - ${this.props.infoHeight}px)`,
      background: `url(${this.props.picture})`,
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      borderTopLeftRadius: '9px', // Needed for border
      borderTopRightRadius: '9px', // Needed for border
      backgroundColor: '#ccc' // Blank background
    }
  },

  cardInfo() {
    return <div style={this.cardInfoStyle()}>
      <div style={{ display: 'inline-block' }}>
        <span><strong>{this.props.name},</strong> {this.props.age}</span>
      </div>
      <div style={{ display: 'inline-block', float: 'right' }}>
        <span style={{ color: '#f78266', marginRight: '20px' }}>
          <i className="fa fa-users"></i> {this.props.friends}
        </span>
        <span style={{ color: '#d5d5d5' }}>
          <i className="fa fa-book"></i> {this.props.moments}
        </span>
      </div>
    </div>;
  },

  cardInfoStyle() {
    return {
      height: `${this.props.infoHeight}px`,
      padding: '20px 15px'
    };
  },

  likeNope() {
    return <div>
      <div style={this.nopeStyle()}>Nope</div>
      <div style={this.likeStyle()}>Like</div>
    </div>;
  },

  likeNopeStyle() {
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

  likeStyle() {
    return Object.assign(this.likeNopeStyle(), {
      left: 0,
      marginLeft: '20px',
      color: '#4bcc82',
      border: '6px solid #4bcc82',
      opacity: this.swipeMagnitude(),
      transform: 'rotate(-10deg)'
    });
  },

  nopeStyle() {
    return Object.assign(this.likeNopeStyle(), {
      right: 0,
      marginRight: '20px',
      color: '#f78267',
      border: '6px solid #f78267',
      opacity: -this.swipeMagnitude(),
      transform: 'rotate(20deg)'
    });
  },

  startDragging(x, y) {
    this.setState({
      dragging: true,
      start: { x, y }
    });
  },

  stopDragging() {
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

  onDrag(x, y) {
    this.setState({
      offset: {
        x: x - this.state.start.x,
        y: y - this.state.start.y
      }
    });
  },

  onTouchStart(e) {
    e.preventDefault();
    e.stopPropagation()
    e = e.touches[0];
    this.startDragging(e.pageX, e.pageY);
  },

  onTouchEnd(e) {
    e.preventDefault();
    e.stopPropagation()
    this.stopDragging();
  },

  onTouchMove(e) {
    if (!this.state.dragging) return;
    e.preventDefault();
    e.stopPropagation()
    e = e.touches[0];
    this.onDrag(e.pageX, e.pageY);
  },

  onMouseDown(e) {
    if (e.button !== 0) return;
    this.startDragging();
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseUp(e) {
    if (e.button !== 0) return;
    this.stopDragging(e.pageX, e.pageY);
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseMove(e) {
    if (!this.state.dragging) return;
    this.onDrag(e.pageX, e.pageY);
    e.stopPropagation();
    e.preventDefault();
  },

  swipeMagnitude() {
    return this.state.offset.x / this.props.width;
  },

  addMovementListeners() {
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },

  removeMovementListeners() {
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  },

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      this.addMovementListeners();
    } else if (!this.state.dragging && state.dragging) {
      this.removeMovementListeners();
    }
  },

  componentWillUnmount() {
    this.removeMovementListeners();
  },

  render() {
    return <div style={this.cardStyle()} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
      {this.likeNope()}
      {this.cardImage()}
      {this.cardInfo()}
    </div>;
  }

});
