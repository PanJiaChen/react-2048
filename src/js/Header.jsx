class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <h1 className="title">2048</h1>
                <ToolsBar gameData={this.props.gameData}/>
                <div className='playAgain' onClick={this.props.handleNewGame}>new game</div>
                <CellSelect gameData={this.props.gameData} handleNewGame={this.props.handleNewGame} />
             </div>
        )
    }
}

class ToolsBar extends React.Component {
    render() {
        return (
            <div className='score'>
                <div className='nowScore'>{this.props.gameData.score}</div>
                <div className='bestScore'>{this.props.gameData.bestScore}</div>
            </div>
        )
    }
}

class CellSelect extends React.Component {
    valueSelect=(event)=>{
        this.props.gameData.setSize(event.target.value);
        this.props.gameData.focusGame();
        this.props.handleNewGame();
    }
    

    render() {
        return (
            <label className="lbl-select">
                <select className="select-cell-num" title="Select Cell Number" onChange={this.valueSelect} >
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </label>
        )
    }
}

module.exports = Header;