
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
    componentDidMount:function(){
      var $elmt=$(React.findDOMNode(this.refs.numCell))
      $elmt.animate({
          top:this.numCellTop(this.props.keyCol,this.props.keyRow),
          left:this.numCellLeft(this.props.keyCol,this.props.keyRow)
      }, 1000);
    },
    numCellTop:function(row,column){
      var top=getPosTop(row,column)
      return top;
    },
    numCellLeft:function(row,column){
      var left=getPosLeft(row,column)
      return left;
    },
    numCellClass:function(){
      var classArray=['num-cell'];
      if(this.props.gameData.isNew){
        classArray.push('cell-new')
      }
      return  classArray.join(" ");
    },
    render:function(){
      var oldRow=this.props.keyCol;
      var oldColumn=this.props.keyRow;
      console.log(this.props.gameData.oldRow,this.props.gameData.oldColumn)
      var numStyle={top: this.numCellTop(oldRow,oldColumn),left:this.numCellLeft(oldRow,oldColumn)};
      // console.log(this.props.gameData.oldRow,this.props.gameData.oldColumn)
      return(
        <div>
          <div className={this.numCellClass()} ref='numCell' style={numStyle}>{this.props.gameData.value}</div>
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
          setPosition(this.state.gameData.numSet);
          var gd = slideTo(direction, this.state.gameData);
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
