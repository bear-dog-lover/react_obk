function Square(props) {
  let cname = "square";
  if (props.bgColor) {
    cname += " " + props.bgColor;
  }
  return (
    <button className={cname} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, bgColor) {
    return <Square key={i.toString()} value={this.props.squares[i]} bgColor={bgColor} onClick={() => this.props.onClick(i)} />;
  }
  render() {
    const ret = [];
    const straightLine = this.props.straightLine.slice();
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(
          i * 3 + j, 
          straightLine.indexOf(i * 3 + j) >= 0 ? "highlight" : ""
        ));
      }
      ret.push(<div key={i.toString()} className="board-row">{row}</div>);
    }
    return (
      <div>
        {ret}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        posX: -1,
        posY: -1,
      }],
      xIsNext: true,
      stepNumber: 0,
      isAsc: true,
      straightLine: [],
    };
  }
  handleClick(i) {
    var history = this.state.history;
    var current = history[history.length - 1];
    const squares = current.squares.slice();
    if (findStraightLine(squares).length > 0 || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        posX: Math.floor(i / 3) + 1,
        posY: i % 3 + 1
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      straightLine: findStraightLine(squares),
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }
  onChangeIsAsc(val) {
    this.setState({
      isAsc: val
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.straightLine.length == 0 ? null : current.squares[this.state.straightLine[0]];
    let history_disp = history.slice();
    let order = "";
    if (!this.state.isAsc) {
      history_disp = history_disp.reverse();
      order = "reversed";
    }
    const moves = history_disp.map((obj, step) => {
      const desc = obj.posX != -1 ? 'Move (' + obj.posX + ',' + obj.posY + ')' :'Game Start';
      const bold = this.state.stepNumber == step ? {fontWeight: 'bold'} : {fontWeight: 'normal'};
      return (
        <li key={step} style={bold} >
          <a href="#" onClick={() => this.jumpTo(step)}>{desc}</a>
        </li>
      );
    });
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            straightLine={this.state.straightLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <input type="radio" name="order" onChange={() => this.onChangeIsAsc(true)} defaultChecked />Asc
            <input type="radio" name="order" onChange={() => this.onChangeIsAsc(false)} />Desc
          </div>
          <ol reversed={order}>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function findStraightLine(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i]
    }
  }
  return [];
}
