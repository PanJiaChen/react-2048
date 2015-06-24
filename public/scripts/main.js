var GridContainer=React.createClass({
    render:function(){
      var grid=this.props.gameData.map(function(row){
          return <div className="grid-row">{row.map(function(){ return <div className="grid-cell"></div>})}</div>
      })
      return(
            <div className="grid-container">
              {grid}
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
    numCellTop:function(column,row){
      var top=getPosTop(column,row)
      return top;
    },
    numCellLeft:function(column,row){
      var left=getPosLeft(column,row)
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
      var numStyle={top: this.numCellTop(oldRow,oldColumn),left:this.numCellLeft(oldRow,oldColumn)};
      return(
          <div className={this.numCellClass()} ref='numCell' style={numStyle}>{this.props.gameData.value}</div>
      )
    }
})

var NumContainer=React.createClass({
    render:function(){
        var nums=[];
        this.props.gd.map(function(row,keyRow){
            row.map(function(el,keyCol){
                var keymark = keyCol+'-'+keyRow+'-'+this.props.gd[keyCol][keyRow].value;
                if(this.props.gd[keyCol][keyRow].value > 0){
                    nums.push(<NumCell gameData={this.props.gd[keyCol][keyRow]} keyRow={keyRow} keyCol={keyCol}  />);
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


var React2048=React.createClass({
    getInitialState:function(){
        return {gameData:new Game};
    },
    handleKeyDown:function(event){
       event.preventDefault;
       if (event.keyCode >= 37 && event.keyCode <= 40) {
  
            var direction = event.keyCode - 37;
            var gd = this.state.gameData.move(direction)
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
            <div className='container'>
                <GridContainer gameData={this.state.gameData.gd} />
                <NumContainer gd={this.state.gameData.gd} />
            </div>
        )
    }
})

React.render(<React2048 />, document.getElementById('container'));
