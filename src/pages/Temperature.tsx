import React, { useState, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./ErrorPage";
import { re } from "mathjs";
import { data } from "react-router-dom";
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
  let [from, setFrom] = useState(0.00);
  let [to, setTo] = useState(32.00);
  let [fromMeasure, setFromMeasure] = useState("C");
  let [toMeasure, setToMeasure] = useState("F");

  // Universal conversion function - converts from any unit to any unit
  const calcDegree = (value: number, sourceUnit: string, targetUnit: string): number => {
    // const value = parseFloat(val);
    if (isNaN(value)) return 0.00;

    // First convert to Celsius
    let tempCelsius: number;
    switch (sourceUnit) {
      case "C":
        tempCelsius = value;
        break;
      case "F":
        tempCelsius = ((value - 32) * 5) / 9;
        break;
      case "K":
        tempCelsius = value - 273.15;
        break;
      default:
        tempCelsius = value;
    }

    // Then convert from Celsius to target unit
    switch (targetUnit) {
      case "C":
        tempCelsius = tempCelsius;
        break;
      case "F":
        tempCelsius = (tempCelsius * 9) / 5 + 32;
        break;
      case "K":
        tempCelsius = tempCelsius + 273.15;
        break;
      default:
        tempCelsius = tempCelsius;
    }
    return tempCelsius === 0 ? 0.00 : parseFloat(tempCelsius.toFixed(2));
  };

  // Handler for focus event
  const handleSelectFrom: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromMeasure((val: string) => (val = e.target.value ? e.target.value : val));
    // Recalculate if there's a value in the first input
    if (String(from).length > 0) {
      const converted = calcDegree(from, fromMeasure, toMeasure);
      setTo(parseFloat(converted.toFixed(2)));
    }
    else {
      setTo(parseFloat("0"));
    }
  };

  const handleSelectTo: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToMeasure((val: string) => (val = e.target.value ? e.target.value : val));
    // Recalculate if there's a value in the first input
    if (String(from).length > 0) {
      const converted = calcDegree(from, fromMeasure, toMeasure);
      setTo(parseFloat(converted.toFixed(2)));
    }
    else {
      setTo(parseFloat("0"));
    }
  };

  const handleFrom: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : 0;
    setFrom(value);
    if (isNaN(value) && String(value).length === 0) {
      setTo(parseFloat("0"));
    } else {
      const converted = calcDegree(value, fromMeasure, toMeasure);
      setTo(parseFloat(converted.toFixed(2)));
    }
  };


  const handleTo: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : 0;
    setTo(value);
    if (isNaN(value) && String(value).length === 0) {
      setFrom(parseFloat("0"));
    } else {
      const converted = calcDegree(value, toMeasure, fromMeasure);
      setFrom(parseFloat(converted.toFixed(2)));
    }
  };

  function resetResult(e: OperationEvent): void {
    e.preventDefault();
    setFromMeasure("C");
    setToMeasure("F");
    setFrom(parseFloat("0"));
    setTo(parseFloat("32"));
  }

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

              <select
                title="from"
                value={fromMeasure}
                className="w-full bg-yellow-500 p-5 dark:bg-white/10 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl  
            placeholder:text-center focus:animate-pulse"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSelectFrom(e)
                }
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
                type="number"
                className="w-full bg-yellow-500 p-5 dark:bg-white/10 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl  
            placeholder:text-center focus:animate-pulse"
                pattern="/(\d+(\.\d{1,2}))?/"
                onChange={(e) => handleFrom(e)}
                value={from.toFixed(2) || 0.00}
              />
              <select
                title="to"
                value={toMeasure}
                className="w-full bg-yellow-500 p-5 dark:bg-white/10 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl  
            placeholder:text-center focus:animate-pulse"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSelectTo(e)
                }
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
                type="number"
                pattern="/\d+(\.\d{1,2})?/"
                className="w-full bg-yellow-500 p-5 dark:bg-white/10 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl placeholder:text-center focus:animate-pulse"
                onChange={(e) => handleTo(e)}
                value={to.toFixed(2) || 0.00}
              />
            </div>

            <button
              type="button"
              onClick={(e) => resetResult(e)}
              className="md:w-full sm:w-fit h-20 border-2 border-double border-b-green-950 bg-blue-700 dark:bg-white/10 rounded-2xl font-red-500 hover:border-red-600 hover:bg-amber-100 hover:text-red-600 text-glow text-shadow-glow shadow-glow-lg m-1 active:bg-red-700 active:text-white active:animate-pulse active:font-bold"
            >

              RESET
            </button>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Temperature;