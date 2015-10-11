import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({

  getDefaultProps() {
    return {
      height: '500px',
      width: '300px',
      cards: []
    }
  },

  renderCardStack() {
    let cardsToShow = this.props.cards.slice(0, 4);
    return cardsToShow.map((card, index) => {
      return <Card {...card} index={index} />;
    });
  },

  render() {
    return <div style={{ fontFamily: 'Lato, sans-serif' }}>
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
      transform: `translate(${this.state.offset.x}px, ${this.state.offset.y}px) rotate(${-(this.state.offset.x / this.props.width) * 8}deg)`
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
      borderTopRightRadius: '9px' // Needed for border
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

  // calculate relative position to the mouse and set dragging=true
  onMouseDown: function (e) {
    // only left mouse button
    if (e.button !== 0) return;
    this.setState({
      dragging: true,
      start: {
        x: e.pageX,
        y: e.pageY
      }
    });
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseUp: function (e) {
    this.setState({
      dragging: false,
      offset: {
        x: 0,
        y: 0
      }
    });
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseMove: function (e) {
    if (!this.state.dragging) return;
    this.setState({
      offset: {
        x: e.pageX - this.state.start.x,
        y: e.pageY - this.state.start.y
      }
    });
    e.stopPropagation();
    e.preventDefault();
  },

  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  },

  render() {
    return <div style={this.cardStyle()} onMouseDown={this.onMouseDown}>
      {this.cardImage()}
      {this.cardInfo()}
    </div>;
  }

});
