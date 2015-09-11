class GridContainer extends React.Component {
    render() {
        var grid = this.props.gameData.map(function(row) {
            return <div className="grid-row">{row.map(function(){ return <div className="grid-cell"></div>})}</div>
        })
        return (
            <div className="grid-container">
              {grid}
            </div>
        )
    }
}

module.exports = GridContainer;