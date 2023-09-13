import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const num = "0123456789";
    const char = "!@#$%^&*~`?/";
    if (numberAllowed) str += num;
    if (charAllowed) str += char;
    for (let i = 1; i < length; i++) {
      let index = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-4 px-4 my-8 text-orange-500 bg-gray-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow-sm rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            name=""
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyToClipboard}
          >
            copy
          </button>
        </div>
        <div className="text-sm flex gap-x-2">
          <div className="flex it gap-x-1">
            <input
              id="range"
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="range">Length:{length}</label>
          </div>
          <div className="flex it gap-x-1">
            <input
              type="checkbox"
              id="num"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="num">Number</label>
          </div>
          <div className="flex it gap-x-1">
            <input
              type="checkbox"
              id="char"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="char">Number</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
