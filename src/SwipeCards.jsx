import React from 'react';

export default React.createClass({

  cards() {
    let ret = [];
    for (let i = 0; i < 10; i++) {
      ret.push(<Card
        name="Test"
        age={18}
        friends={3}
        moments={3}
        picture="https://avatars3.githubusercontent.com/u/401263?v=3&s=460"
      />);
    }
    return ret;
  },

  renderCardStack() {
    return this.cards();
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
      height: '500px',
      width: '300px',
      infoHeight: '60px'
    };
  },

  cardStyle() {
    return {
      height: this.props.height,
      width: this.props.width,
      borderRadius: '10px',
      border: '1px #ccc solid',
      backgroundClip: 'content-box'
    };
  },

  cardImage() {
    return <div style={this.cardImageStyle()}></div>;
  },

  cardImageStyle() {
    return {
      height: `calc(100% - ${this.props.infoHeight})`,
      background: `url(${this.props.picture});`,
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
      height: this.props.infoHeight,
      padding: '20px 15px'
    };
  },

  render() {
    return <div style={this.cardStyle()}>
      {this.cardImage()}
      {this.cardInfo()}
    </div>;
  }

});
