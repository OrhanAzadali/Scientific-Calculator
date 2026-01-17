import React, { useState, useRef, useEffect } from "react";
import { evaluate } from "mathjs";
import { ErrorBoundary } from "react-error-boundary";
import Button from "../components/Button";
import ErrorPage from "./ErrorPage";
//
interface Error {
  name: string;
  message: string;
  stack?: string;
}

interface FocusEvent {
  target: {
    value: string;
    name: string;
    type: string;
    placeholder: string;
    id: string;
  };
}

interface OperationEvent {
  preventDefault: () => void;
}

const Temperature = () => {
  let selectRef = useRef<HTMLSelectElement | null>(null);
  let selectRef2 = useRef<HTMLSelectElement | null>(null);
  let inputRef = useRef<HTMLInputElement | null>(null);
  let inputRef2 = useRef<HTMLInputElement | null>(null);
  const typeError = new Error(
    "PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!",
  );

  let [from, setFrom] = useState(0);
  let [to, setTo] = useState(0);
  let [fromMeasure, setFromMeasure] = useState("C");
  let [toMeasure, setToMeasure] = useState("K");
  // let [disabled, setDisabled] = useState(false);

  let [message, setMessage] = useState({ text: "", type: "" });

  // Handler for focus event
  const handleSelectFrom: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setFromMeasure(
      (val: string) =>
        (val = selectRef.current ? selectRef.current.value : e.target.value),
    );
  };
  const handleSelectTo: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setToMeasure(
      (val: string) =>
        (val = selectRef2.current ? selectRef2.current.value : e.target.value),
    );
  };

  const handleFrom: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    let tempCelcius: number;
    // Convert input to Celsius first
    switch (fromMeasure) {
      case "C":
        tempCelcius = Number(inputRef2.current && inputRef2.current.value);
        break;
      case "F":
        tempCelcius =
          ((Number(inputRef2.current && inputRef2.current.value) - 32) * 5) / 9;
        break;
      case "K":
        tempCelcius =
          Number(inputRef2.current && inputRef2.current.value) - 273.15;
        break;
      default:
        Number(inputRef2.current && inputRef2.current.value);
        return;
    }
    // inputRef.current && (inputRef.current.value = tempInCelsius);
    setFrom((val: number) => (val = Number(tempCelcius)));
  };

  const handleTo: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    let convertedTemp: number;
    // Convert Celsius to target unit
    switch (toMeasure) {
      case "C":
        convertedTemp = Number(inputRef.current && inputRef.current.value);
        break;
      case "F":
        convertedTemp =
          (Number(inputRef.current && inputRef.current.value) * 9) / 5 + 32;
        break;
      case "K":
        convertedTemp =
          Number(inputRef.current && inputRef.current.value) + 273.15;
        break;
      default:
        Number(inputRef.current && inputRef.current.value);
        return;
    }

    // inputRef.current && (inputRef.current.value = convertedTemp);
    setTo((val: number) => (val = Number(convertedTemp)));
  };

  function resetResult(e: OperationEvent): void {
    e.preventDefault();
    setFrom(0);
    setTo(0);
    setFromMeasure("C");
    setToMeasure("C");
  }

  useEffect(() => {
    console.log(inputRef.current && inputRef.current.value);
    console.log(inputRef.current && typeof inputRef.current.value);
  }, [inputRef]);

  return (
    <div className="h-screen md:w-full sm:w-fit grid overflow-y-visible justify-items-center p-10 bg-linear-to-tr/decreasing from-yellow-500 via-orange-900 to-orange-500 bg-repeat bg-cover">
      <ErrorBoundary fallback={<ErrorPage />}>
        <div className="md:w-full flex flex-col justify-center items-center border-4 border-emerald-500 bg-linear-to-br/decreasing from-orange-950 via-orange-400 to-orange-950 rounded-2xl p-4 m-5 gap-8">
          <div className="m-3 flex justify-center items-center text-4xl border-2 border-emerald-500 p-2 rounded-3xl text-shadow-glow shadow-glow-lg sm:w-130 ">
            <h1 className="md:w-fit sm:w-100 text-cyan-200 text-shadow-glow shadow-glow-lg animate-pulse">
              Temperature Converter
            </h1>
          </div>

          <div className="md: w-full sm:w-fit text-white grid grid-cols-2 justify-center items-center align-middle mx-35 text-shadow-glow shadow-glow-lg gap-10">
            <div className="flex flex-col justify-center items-center">
              {message && (
                <div className="text-1xl text-center text-shadow-glow shadow-glow-lg animate-pulse">
                  {message.text}

                  {message.type.length > 0 && (
                    <div className="text-yellow-300 text-[0.7rem] text-center">
                      {message?.type} must consist of the integers, floating
                      numbers and arithmetical operators
                    </div>
                  )}
                </div>
              )}

              <select
                title="from"
                ref={selectRef}
                value={fromMeasure}
                className="w-full bg-yellow-500 p-5 dark:bg-white/10 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl  
            placeholder:text-center focus:animate-pulse"
                // onChange={(e) => inputRef.current.value = e.target.value}//redundant and insecure!!!
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSelectFrom(e)
                }
                // onSelectCapture={() => handleBlur()}
                autoFocus
              >
                <option id="celsius" value="C">
                  Celsius
                </option>
                <option id="fahrenheit" value="F">
                  Fahrenheit
                </option>
                <option id="kelvin" value="K">
                  Kelvin
                </option>
              </select>
              <input
                title="from"
                className="w-full bg-yellow-500 p-5 dark:bg-white/10 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl  
            placeholder:text-center focus:animate-pulse"
                onChange={(e) => handleTo(e)}
                ref={inputRef}
                value={String(from)}
              />

              <select
                title="from"
                ref={selectRef2}
                value={toMeasure}
                className="w-full bg-yellow-500 p-5 dark:bg-white/10 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl  
            placeholder:text-center focus:animate-pulse"
                // onChange={(e) => inputRef.current.value = e.target.value}//redundant and insecure!!!
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSelectTo(e)
                }
                // onSelectCapture={() => handleBlur()}
                autoFocus
              >
                <option id="cels" value="C">
                  Celsius
                </option>
                <option id="fahr" value="F">
                  Fahrenheit
                </option>
                <option id="kelv" value="K">
                  Kelvin
                </option>
              </select>
              <input
                title="to"
                className="w-full bg-yellow-500 p-5 dark:bg-white/10 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl  
            placeholder:text-center focus:animate-pulse"
                onChange={(e) => handleFrom(e)}
                ref={inputRef2}
                value={String(to)}
              />
            </div>

            <button type="button" onClick={(e) => resetResult(e)} className="md:w-full sm:w-fit h-20 border-2 border-double border-b-green-950 bg-blue-700 dark:bg-white/10 rounded-2xl font-red-500 hover:border-red-600 hover:bg-amber-100 hover:text-red-600 text-glow text-shadow-glow shadow-glow-lg m-1 active:bg-red-700 active:text-white active:animate-pulse active:font-bold">
              RESET
            </button>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Temperature;
