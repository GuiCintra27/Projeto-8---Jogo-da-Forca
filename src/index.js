import ReactDOM from 'react-dom';
import React from 'react';

function KeyWords() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    return (
        <div id="keys">
            {alphabet.map((item) =>
                <div class="key disable">
                    <p>{item}</p>
                </div>
            )}
        </div>
    )
}

function KeyWordsAble() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const [keySelect, setKeySelect] = React.useState('key able');

    function selected(){
        setKeySelect('key disable');
    }

    return (
        <div id="keys">
            {alphabet.map((item) =>
                <div class={keySelect} onClick={selected}>
                    <p>{item}</p>
                </div>
            )}
        </div>
    )
}

function App() {
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
                    <div id="secretWord">
                        <p class="secret">a</p><p class="secret"></p><p class="secret"></p><p class="secret"></p><p class="secret"></p><p class="secret"></p><p class="secret"></p>
                    </div>
                </aside>
            </main>

            {(keyWords === 0) ? <KeyWords/> : <KeyWordsAble/>}

            <div id="guessWord">
                <p>Já sei a palavra!</p>
                <input type="text" />
                <button>Chutar</button>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector("body"));