import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var itemDatas = require('./data/data.json');
var value=GetRandomNum(0,itemDatas.length-1);
function GetRandomNum(Min,Max)
{
var Range = Max - Min;
var Rand = Math.random();
return(Min + Math.round(Rand * Range));
};
function GetTrueNum(out,p,Min,Max){
  var r=-1;
  var j=-1;
  while(r===-1&&j<3){
    var b=false;
    r = GetRandomNum(Min,Max);
    for(var i=0;i<4;i++){
      if(out[i]===r){
        b=true;
      }
    };
    if(!b){
      j++;
      if(j!==p){
        out[j]=r;

      }
    }
    r=-1
  }
  return out;

};
function GetNum(num,Min,Max){
  var out = [-1,-1,-1,-1];
  var r = GetRandomNum(0,3);
  out[r]=num;
  out = GetTrueNum(out,r,Min,Max);
  return out;
};

function getAnswer(itemDatas,num){
  var answer=[];
  var singleItemData = itemDatas[num];
  var other = GetNum(num,0,itemDatas.length-1);
  answer.name = singleItemData.name;
  answer.num = num;
  answer.image = require(singleItemData.image);
  answer.phrase = singleItemData.phrase;
  answer.one = itemDatas[other[0]].name;
  answer.onenum = other[0];
  answer.two = itemDatas[other[1]].name;
  answer.twonum = other[1];
  answer.three = itemDatas[other[2]].name;
  answer.threenum = other[2];
  answer.four = itemDatas[other[3]].name;
  answer.fournum = other[3];
  return answer;
};
var answer = getAnswer(itemDatas,value);
var FlexContainerLeft = React.createClass({
propTypes: {
  title: React.PropTypes.string.isRequired,
  imageURL:React.PropTypes.string.isRequired,
  phrase:React.PropTypes.string.isRequired,
},
render: function() {
   return (<div className="flex-container-left">
            <img src={this.props.imageURL} className="pic" alt="pic"/>
            <h2>{this.props.title}&nbsp;{this.props.phrase}</h2>
            </div>);
          }
});
var FlexItem = React.createClass({
  getInitialState: function() {
      return {liked: 0};
  },
  handleClick: function(num,event) {
      if(num===answer.num){
        this.setState({liked: 1});
      }else{
        this.setState({liked: -1});
      }

  },
  propTypes: {
    title: React.PropTypes.string.isRequired,
    num:React.PropTypes.number.isRequired,
  },
  render: function() {
    var text = '';
    if(this.state.liked===1){
      text='√';
      // if(value<itemDatas.length){
      //   value=value+1;
      // }else{
      //   value=0;
      // }

      window.parent.location.href='';
    }else if (this.state.liked===-1) {
      text='×';

    }else{
      text='';
    }
    return (<li className="flex-item button13" onClick={this.handleClick.bind(this,this.props.num)}>{this.props.title}{text}</li>);
  }
});

class App extends Component {

  render() {
    return (

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="flex-demo">
          <FlexContainerLeft title={answer.name} imageURL={answer.image} phrase={answer.phrase}/>
          <ul className="flex-container second">
          <FlexItem title={answer.one} num={answer.onenum}/>
          <FlexItem title={answer.two} num={answer.twonum}/>
          <FlexItem title={answer.three} num={answer.threenum}/>
          <FlexItem title={answer.four} num={answer.fournum}/>
          </ul>
        </div>

        <div className="App-intro">
         <div className="heart " id="like1" rel="like"></div>
          To get started, edit <code>src/App.js</code> and save to reload.
        </div>
      </div>
    );
  }
}

export default App;
