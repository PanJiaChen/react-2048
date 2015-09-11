//基础大小参数
var cellSpace = 5;
var cellSideLength = 100;

function getPos(i) {
    return cellSpace + i * (cellSpace * 2 + cellSideLength);
}
class NumContainer extends React.Component {
    render() {
        var nums = [];
        this.props.gd.map((row, keyRow) => {
            row.map((el, keyCol)=> {
                var keymark = keyCol + '-' + keyRow + '-' + this.props.gd[keyRow][keyCol].value;
                if (el.value > 0) {
                    nums.push(<NumCell gameData={el}  keymark={keymark} key={keymark} />);
                }
            })
        });
        return (
            <div className='num-container'>
            {nums}
          </div>
        )
    }
}

class NumCell extends React.Component {
    animationFn(el, target, dir) {
        var timer = null;
        timer = setInterval(function() {
            var speed = (target - parseInt(el.style[dir])) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            el.style[dir] = parseInt(el.style[dir]) + speed + 'px';
            if (parseInt(el.style[dir]) == target) {
                clearInterval(timer);
            }
        }, 15)
    }
    componentDidMount() {
        var gameData = this.props.gameData;
        var elmt = React.findDOMNode(this);;
        var left = this.numCellPos(gameData.column);
        var top = this.numCellPos(gameData.row);
        this.animationFn(elmt, left, 'left');
        this.animationFn(elmt, top, 'top');
    }
    numCellPos(pos) {
        var targetPos = getPos(pos)
        return targetPos;
    }
    numCellClass() {
        var gameData = this.props.gameData;
        var classArray = ['num-cell'];
        var cellValue = gameData.value;
        classArray.push('cell-color-' + cellValue)
        if (gameData.isNew) {
            classArray.push('cell-new')
        }
        if (gameData.isMerged) {
            classArray.push('cell-merged')
        }
        return classArray.join(" ");
    }
    render() {
        var gameData = this.props.gameData;
        var isNew = this.props.gameData.isNew;
        var row = gameData.oldRow != -1 ? gameData.oldRow : gameData.row;
        var column = gameData.oldColumn != -1 ? gameData.oldColumn : gameData.column;
        var numStyle = {
            top: this.numCellPos(row),
            left: this.numCellPos(column)
        };
        return (
            <div className={this.numCellClass()} ref='numCell' style={numStyle} keymark={this.props.keymark}>{this.props.gameData.value}</div>
        )
    }
}

module.exports = NumContainer;