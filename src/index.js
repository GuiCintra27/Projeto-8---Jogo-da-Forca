import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import words from './words';
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

    const [keyWords, setKeyWords] = React.useState(0);
    const [image, setImage] = React.useState(forca0);

    const word = words[Math.floor(Math.random() * words.length)];

    let x = [], counter = 0, acertos = 0;
    for (let i = 0; i < word.length; i++) {
        x.push(word[i]);
    }

    function startGame() {
        setKeyWords(1);
    }

    function compare(a, x) {
        const test = x.filter((item) => {
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
                acertos++
                return true
            }
        })

        if (acertos === x.length) {
            alert('ganhou')
        } else if (test.length === 0 || test === null) {

            switch (counter) {
                case 0:
                    alert(`erros: ${counter + 1}`)
                    counter++
                    break;

                case 1:
                    alert(`erros: ${counter + 1}`)
                    counter++
                    break;

                case 2:
                    alert(`erros: ${counter + 1}`)
                    counter++
                    break;

                case 3:
                    alert(`erros: ${counter + 1}`)
                    counter++
                    break;

                case 4:
                    alert(`erros: ${counter + 1}`)
                    counter++
                    break;

                case 5:
                    alert('você perdeu')
                    counter++
                    break;

                default:
                    break;
            }
        }
    }

    function KeyWordsAble(props) {
        const [keySelected, setKeySelected] = useState(false);

        function selected() {
            setKeySelected(!keySelected);
            compare(props.letter, props.secretWord);
        }

        return (
            <div className={keySelected ? 'key disable' : 'key able'}
                onClick={selected}>
                <p>{props.letter}</p>
            </div>
        )
    }

    function SecretWord() {
        return (
            <div id="secretWord">
                {x.map((item, index) => (
                    <p key={index} className='secret'>{item}</p>
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
                        <button onClick={startGame}>Escolher Palavra</button>
                    </div>
                    {(keyWords === 0) ? (
                        <p></p>
                    ) : (
                        <SecretWord />
                    )}
                </aside>
            </main>

            <div id="keys">
                {alphabet.map((item, index) => (
                    (keyWords === 0) ? (
                        <KeyWordsDisable key={index} letter={item} />
                    ) : (
                        <KeyWordsAble key={index} letter={item} secretWord={x} />
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