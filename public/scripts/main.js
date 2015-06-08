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
var NumContainer=React.createClass({
    render:function(){
        var nums=null;
        this.props.gameData.map(function(row,keyRow){
            row.map(function(el,keyCol){
                console.log(el.value)
            })
        }.bind(this));

        return(
            null
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
       if(direction){

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
