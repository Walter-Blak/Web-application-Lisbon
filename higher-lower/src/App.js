import React, { Component } from 'react';
import './App.css';

import GameEngine from './components/Game';
import NumbersComponent from './components/NumbersComponent';
import Button from './components/Button';
import Win from './components/Win';

class App extends Component {
  state = {
    numbers: [],
    guess: 0,
    winMessage: "",
    score: 0
  };

  gameEngine = new GameEngine();

  componentDidMount() {
    this.setState(this.gameEngine.gameState);
  }

  nextNumber = () => {
    const number = this.gameEngine.revealNextNumber();
    const newNumbers = this.state.numbers.concat([number]);

    if (this.state.guess <= 0) {
      this.setState({ numbers: newNumbers });
      return;
    }

    const wasCorrect = this.gameEngine.isCorrect(
      this.state.guess,
      newNumbers[newNumbers.length - 2],
      newNumbers[newNumbers.length - 1]
    );

    const newScore = wasCorrect ? this.state.score + 1 : this.state.score;
    const message = `You were ${wasCorrect ? "right" : "wrong"}`;

    this.setState({
      numbers: newNumbers,
      winMessage: message,
      score: newScore,
      guess: 0
    });
  }

  guessHigher = () => this.setState({ guess: this.gameEngine.guessHigher() });
  guessLower = () => this.setState({ guess: this.gameEngine.guessLower() });

  render() {
    return (
      <div className="App">
        <h1>Higher or Lower</h1>
        <p>
          Try to guess if the next number will be higher or lower than the previous one.
          Click "Higher" or "Lower" to make your guess, then "Reveal" to see the result.
          You get 1 point for every correct guess!
        </p>

        <NumbersComponent numbers={this.state.numbers} />

        <div className="row">
        <Button isDisabled={this.state.guess === 2} action={this.guessLower} name="Lower" color="red" />
        <Button isDisabled={this.state.guess === 0} action={this.nextNumber} name="Reveal" color="yellow" />
        <Button isDisabled={this.state.guess === 1} action={this.guessHigher} name="Higher" color="blue" />

          <Win message={this.state.winMessage} score={this.state.score} />
        </div>
      </div>
    );
  }
}

export default App;
