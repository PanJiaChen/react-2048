var GridContainer=React.createClass({
    render:function(){
        return(
           <div className="grid-container">
            <div className="grid-row">
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
            </div>
            <div className="grid-row">
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
            </div>
            <div className="grid-row">
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
            </div>
            <div className="grid-row">
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
            </div>
          </div>
        )
    }
})
var NumCell=React.createClass({
    numCellTop:function(){
      var top=getPosTop(this.props.keyCol,this.props.keyRow)
      return top;
    },
    numCellLeft:function(){
      var left=getPosLeft(this.props.keyCol,this.props.keyRow)
      return left;
    },
    numCellClass:function(){
      var classArray=['num-cell'];
      return  classArray;
    }
    render:function(){
      var numStyle={top: this.numCellTop(),left:this.numCellLeft()}
      return(
        <div>
          <div className={this.numCellClass()} style={numStyle}>{this.props.gameData.value}</div>
        </div>
      )
    }
})

var NumContainer=React.createClass({
    render:function(){
        var nums=[];
        this.props.gameData.map(function(row,keyRow){
            row.map(function(el,keyCol){
                var keymark = keyCol+'-'+keyRow+'-'+this.props.gameData[keyCol][keyRow].value;
                if(this.props.gameData[keyCol][keyRow].value > 0){
                    nums.push(<NumCell gameData={this.props.gameData[keyCol][keyRow]} key={keymark} keyCol={keyCol} keyRow={keyRow} />);
                }
            }.bind(this))
        }.bind(this));
        return(
          <div className='num-container'>
            {nums}
          </div>
        )
    }
})

var GameContainer=React.createClass({
    render:function(){
        return(
            <div className='container'>
                <GridContainer />
                <NumContainer gameData={this.props.gameData.numSet} />
            </div>
        )
    }
})
var React2048=React.createClass({
    getInitialState:function(){
        return {gameData:startGame()};
    },
    handleKeyDown:function(event){
        event.preventDefault;
       var direction = false;
       switch(event.which){
            case 37:
                direction='left';
            break;
            case 38:
                direction='up';
            break;
            case 39:
                direction='right';
            break;
            case 40:
                direction='down';
            break;
       }
       if(direction && this.state.gameData.status === 'runing'){
          var gd = slideTo(direction, this.state.gameData);
          //console.log(gd);
          this.setState({gameData: gd});
        }
    },
    componentDidMount: function () {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    componentWillUnmount: function () {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    render:function(){
        return(
            <div className='react2048'>
                <GameContainer gameData={this.state.gameData} />
            </div>
        )
    }
})
React.render(<React2048 />, document.getElementById('container'));
