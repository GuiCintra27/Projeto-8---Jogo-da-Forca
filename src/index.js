import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import wordDictionary from './words';
import "./styles/index.css"
import forca0 from './assets/forca0.png';
import forca1 from './assets/forca1.png';
import forca2 from './assets/forca2.png';
import forca3 from './assets/forca3.png';
import forca4 from './assets/forca4.png';
import forca5 from './assets/forca5.png';
import forca6 from './assets/forca6.png';

function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const images = [forca6, forca5, forca4, forca3, forca2, forca1, forca0];
    const [image, setImage] = useState(forca0);
    const [wordDrawn, setWordDrawn] = useState([]);
    const [start, setStart] = useState(false);
    const [visibleIndex, setVisibleIndex] = useState([]);
    const [successes, setSuccesses] = useState(0);
    const [keysSelected, setKeysSelected] = useState([]);
    const [life, setLife] = useState(6);
    const [color, setColor] = useState({ color: 'black' });
    const [disabled, setDisabled] = useState(true);
    const [guessWord, setGuessWord] = useState();


    function startGame() {
        setStart(!start)
        setLife(6);
        setSuccesses(0);
        setVisibleIndex([]);
        setKeysSelected([]);
        setImage(forca0);
        setColor({ color: 'black' });

        if (!start) {
            const word = wordDictionary[Math.floor(Math.random() * wordDictionary.length)];
            const arrWord = [];

            for (let i = 0; i < word.length; i++) {
                arrWord.push(word[i]);
            }

            alert(word)

            setWordDrawn([...arrWord]);
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    function compare(selectedLetter, secretWord) {

        const indexes = [];
        let x = '';

        wordDrawn.map((item) => x+= item);
        x = x.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let success = successes, lifes = life, test = [];
        
        for (let i = 0; i < x.length; i++){
            if (selectedLetter === x[i]) {
                indexes.push(i);
                test.push(i);
                setSuccesses(success + 1);
                success++
            }
        }

        if (success === secretWord.length) {
            finishGame('win');
        } else if (test.length === 0 || test === null) {
            setLife(life - 1);
            setImage(images[life - 1]);
        }

        if (lifes - 1 === 0) {
            finishGame('lose');
        } else {
            setVisibleIndex([...visibleIndex, ...indexes]);
        }
    }

    function KeyWordsAble(props) {

        function selected(letter) {
            if (!keysSelected.includes(letter)) {
                setKeysSelected([...keysSelected, letter]);
                compare(props.letter, props.secretWord);
            }
        }

        return (
            <div data-identifier="letter" className={keysSelected.includes(props.letter) ? 'key disable' : 'key able'}
                onClick={() => selected(props.letter)}>
                <p>{props.letter}</p>
            </div>
        )
    }

    function KeyWordsDisable(props) {
        return (
            <div className="key disable">
                <p>{props.letter}</p>
            </div>
        )
    }

    function RenderWord() {
        return (
            <div data-identifier="word" id="secretWord">
                {wordDrawn.map((item, index) => (
                    <p key={index} className={visibleIndex.includes(index) ? '' : 'secret'} style={color} >
                        {visibleIndex.includes(index) ? item : ''}
                    </p>
                ))}
            </div>
        )
    }

    function tryWord() {
        let word = '';
        wordDrawn.map((item, index) => word += item)

        if (guessWord === word) {
            finishGame('win');
        } else {

            finishGame('lose');
        }
    }

    function finishGame(result) {
        const indexes = [];

        wordDrawn.map((item, index) => {
            indexes.push(index);
        });

        setKeysSelected([...alphabet]);
        setDisabled(true);
        setVisibleIndex([...visibleIndex, ...indexes]);
        setLife(0);

        if (result === 'win') {
            setColor({ color: 'var(--button-start-game)' });
        } else {
            setImage(forca6);
            setColor({ color: 'var(--lose-game-word)' });
        }
    }

    return (
        <>
            <main>
                <div id="force">
                    <img data-identifier="game-image" src={image} alt="Forca imagem" />
                </div>
                <aside>
                    <div id="startGame">
                        <button data-identifier="choose-word" onClick={startGame} className={start ? 'NewGame' : ''}>
                            {start ? 'Novo Jogo' : 'Escolher Palavra'}
                        </button>
                    </div>
                    {start ? <RenderWord /> : <p></p>}
                </aside>
            </main>

            <div id="keys">
                {alphabet.map((item, index) =>
                (start ? (
                    <KeyWordsAble key={index} letter={item} secretWord={wordDrawn} />
                ) : (
                    <KeyWordsDisable key={index} letter={item} />
                )
                ))}
            </div>

            <div id="guessWord">
                <p>Já sei a palavra!</p>
                <input data-identifier="type-guess" disabled={disabled ? 'disabled' : ''} className={disabled ? 'inputDisabled' : ''} type="text" onChange={(e) => setGuessWord(e.target.value)} />
                <button data-identifier="guess-button" onClick={tryWord}>Chutar</button>
            </div>
        </>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));