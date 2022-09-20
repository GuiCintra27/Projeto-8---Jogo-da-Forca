import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import words from './words';

function KeyWords(props) {
    return (
        <div class="key disable">
            <p>{props.letter}</p>
        </div>
    )
}

function KeyWordsAble(props) {
    const [keySelected, setKeySelected] = useState(false);

    function selected() {
        setKeySelected(!keySelected);
    }

    return (
        <div class={keySelected ? 'key disable' : 'key able'}
            onClick={selected}>
            <p>{props.letter}</p>
        </div>
    )
}

function SecretWord(){
    const word = words[Math.floor(Math.random() * words.length)];
    let x = [];
    for (let i = 0; i < word.length; i++){
        x.push(word[i])
    }

    return(
        <div id="secretWord">
            {x.map((item) => (
                <p class='secret'></p>
            ))}
    </div>
    )
}

function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const [keyWords, setKeyWords] = React.useState(0);

    function startGame() {
        setKeyWords(1);
    }

    return (
        <div>
            <main>
                <div id="force">
                    <img src="assets/forca0.png" alt="Forca imagem" />
                </div>
                <aside>
                    <div id="startGame">
                        <button onClick={startGame}>Escolher Palavra</button>
                    </div>
                    {(keyWords === 0) ? (
                        <p></p>
                    ) : (
                        <SecretWord/>
                    )}
                </aside>
            </main>

            <div id="keys">
                {alphabet.map((item) => (
                    (keyWords === 0) ? (
                        <KeyWords letter={item} />
                    ) : (
                        <KeyWordsAble letter={item} />
                    )
                ))}
            </div>



            <div id="guessWord">
                <p>Já sei a palavra!</p>
                <input type="text" />
                <button>Chutar</button>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector("body"));