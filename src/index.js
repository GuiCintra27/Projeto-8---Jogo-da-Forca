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

function KeyWordsDisable(props) {
    return (
        <div className="key disable">
            <p>{props.letter}</p>
        </div>
    )
}



function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const [image, setImage] = useState(forca0);
    const [wordDrawn, setWordDrawn] = useState([]);
    const [start, setStart] = useState(false);
    const [visibleIndex, setVisibleIndex] = useState([]);
    const [successes, setSuccesses] = useState(0);
    const [keysSelected, setKeysSelected] = useState([]);
    const [life, setLife] = useState(6);


    function startGame() {
        setStart(!start)

        if (!start) {
            const word = wordDictionary[Math.floor(Math.random() * wordDictionary.length)];
            const arrWord = [];
            alert(word)
            for (let i = 0; i < word.length; i++) {
                arrWord.push(word[i]);
            }
            setWordDrawn([...arrWord]);
        } else {
            setLife(6);
            setSuccesses(0);
            setVisibleIndex([]);
            setKeysSelected([]);
        }
    }

    function compare(a, x) {

        const indexes = [];
        let success = successes;

        const test = x.filter((item, index) => {
            const specialCaracter = ['a', 'e', 'i', 'o', 'u', 'c'];
            let letter = item;
            for (let variants of specialCaracter) {
                switch (variants) {
                    case 'a':
                        if (item === 'á' || item === 'ã' || item === 'â') {
                            letter = variants;
                        }
                        break;

                    case 'e':
                        if (item === 'é' || item === 'ẽ' || item === 'ê') {
                            letter = variants;
                        }
                        break;

                    case 'i':
                        if (item === 'í' || item === 'ĩ' || item === 'î') {
                            letter = variants;
                        }
                        break;

                    case 'o':
                        if (item === 'ó' || item === 'ô' || item === 'ô') {
                            letter = variants;
                        }
                        break;

                    case 'u':
                        if (item === 'ú' || item === 'ũ' || item === 'û') {
                            letter = variants;
                        }
                        break;

                    case 'c':
                        if (item === 'ç') {
                            letter = variants;
                        }
                        break;

                    default:
                        break;
                }
            }

            if (a !== letter) {
            } else {
                indexes.push(index);
                setSuccesses(success + 1);
                success++
                return true
            }
        })

        if (success === x.length) {
            alert('ganhou');
            startGame();
        } else if (test.length === 0 || test === null) {

            switch (life) {
                case 6:
                    alert(`vida: ${life - 1}`)
                    setLife(life - 1);
                    break;

                case 5:
                    alert(`vida: ${life - 1}`)
                    setLife(life - 1);
                    break;

                case 4:
                    alert(`vida: ${life - 1}`)
                    setLife(life - 1);
                    break;

                case 3:
                    alert(`vida: ${life - 1}`)
                    setLife(life - 1);
                    break;

                case 2:
                    alert(`vida: ${life - 1}`)
                    setLife(life - 1);
                    break;

                case 1:
                    setLife(life - 1);
                    x.map((item, index) => indexes.push(index));
                    alert('você perdeu');
                    break;

                default:
                    break;
            }
        }
        setVisibleIndex([...visibleIndex, ...indexes]);
    }

    function KeyWordsAble(props) {

        function selected(letter) {
            if (keysSelected.includes(letter)) {
                alert('Esta letra já foi inserida!');
            } else {
                setKeysSelected([...keysSelected, letter]);
                compare(props.letter, props.secretWord);
            }
        }

        return (
            <div className={keysSelected.includes(props.letter) ? 'key disable' : 'key able'}
                onClick={() => selected(props.letter)}>
                <p>{props.letter}</p>
            </div>
        )
    }

    function RenderWord() {
        return (
            <div id="secretWord">
                {wordDrawn.map((item, index) => (
                    <p key={index} className={visibleIndex.includes(index) ? '' : 'secret'}>
                        {visibleIndex.includes(index) ? item : ''}
                    </p>
                ))}
            </div>
        )
    }

    return (
        <>
            <main>
                <div id="force">
                    <img src={image} alt="Forca imagem" />
                </div>
                <aside>
                    <div id="startGame">
                        <button onClick={startGame} className={start ? 'NewGame' : ''}>
                            {start ? 'Novo Jogo' : 'Escolher Palavra'}
                        </button>
                    </div>
                    {start ? (
                        <RenderWord />
                    ) : (
                        <p></p>
                    )}
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
                <input type="text" />
                <button>Chutar</button>
            </div>
        </>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));