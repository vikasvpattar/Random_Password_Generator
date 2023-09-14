import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  //length variable is used to hold the length of the password
  const [length, setLength] = useState(8);

  // numberAllowed is used to check whether password should be allowed or not
  const [numberAllowed, setNumberAllowed] = useState(false);

  // charAllowed is used to check whether charector should be allowed or not
  const [charAllowed, setCharAllowed] = useState(false);

  // password is used to store the value of password
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  // passwordGenerator is used to generate password
  const passwordGenerator = useCallback(() => {
    // pass will store the password
    let pass = "";

    // str has all the charactors
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const num = "0123456789";
    const char = "!@#$%^&*~`?/";

    // if number is allowed then number will be added to str
    if (numberAllowed) str += num;

    // if special charactor is allowed then special charactor will be added to the str
    if (charAllowed) str += char;

    // This loop is used to randomly select the indexes of the str
    for (let i = 1; i < length; i++) {
      let index = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // when components render this hook will be invoked automatically
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // copyToClipboard is used to copy the password to the clipboard
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-4 px-4 my-8 text-orange-500 bg-gray-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow-sm rounded-lg overflow-hidden mb-4 ">
          {/* The generated password will be stored in this input */}
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            name=""
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          {/* This button is used to copy the password to clipboard */}
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyToClipboard}
          >
            copy
          </button>
        </div>
        <div className="text-sm flex gap-x-2">
          {/* It is used  to set the length of the password */}
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
          {/* check box is used to select wheter number should be added or not */}
          <div className="flex it gap-x-1">
            <input
              type="checkbox"
              id="num"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="num">Number</label>
          </div>
          {/* It is used to select whether special charector should be added or not */}
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
