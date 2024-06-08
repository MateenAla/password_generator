import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [passlength, setpasslength] = useState(8);
  const [isnumber, setisnumber] = useState(false);
  const [ischar, setischar] = useState(false);
  const [password, setpassword] = useState(false);

  const password_generator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isnumber) str += "0123456789";
    if (ischar) str += "!@#$%^&*-_+=[]{}~`";
    console.log(passlength);
    for (let i = 0; i < passlength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(char);
      pass += str.charAt(char);
    }
    setpassword(pass);
    console.log(pass);
  }, [ischar, isnumber, passlength, setpassword]);

  useEffect(() => {
    password_generator();
  }, [passlength, ischar, isnumber, password_generator]);

  const passwordreference = useRef(null)
  const copypasswordtoclipboard = useCallback(()=>{
 
    passwordreference.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  , [passwordreference]
)


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
           ref={passwordreference}
        />
        <button
           onClick={copypasswordtoclipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500 active:bg-blue-800"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={passlength}
            className="cursor-pointer"
            onChange={(e) => {
              setpasslength(e.target.value);
            }}
          />
          <label>Length: {passlength}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isnumber}
            id="numberInput"
            onChange={() => {
              setisnumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={ischar}
            id="characterInput"
            onChange={() => {
              setischar((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
