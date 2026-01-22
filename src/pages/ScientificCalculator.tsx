import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import Button from '../components/Button';
import ErrorPage from "./ErrorPage";
import { evaluate, cot, acot, acoth, factorial } from "mathjs";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
// interface InputEvent extends React.ChangeEvent<HTMLInputElement> {
// preventDefault: () => void;
//// target: {
////   value: string;
////   name: string;
////   type: string;
////   placeholder: string;
////   id: string;
// //};
// }

type ClickOperationEvent = React.MouseEvent<HTMLButtonElement>;
// interface ClickOperationEvent extends React.ChangeEvent<HTMLButtonElement> {
//   preventDefault: () => void;
// }

// interface DeletingEvent {
//   preventDefault: () => void;
//   target: {
//     value: string;
//   }
// }

const ScientificCalculator = () => {
  const inputReg = /^[0-9e%^*+-/\.()=\,]+$/;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typeError = new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!');

  useEffect(() => {
    inputRef.current && inputRef.current.focus
  });

  let [flag, setFlag] = useState(true);
  let [currentValue, setCurrentValue] = useState("");
  let [result, setResult] = useState(0);
  let [disabled, setDisabled] = useState(false);
  let [message, setMessage] = useState({ text: '', type: '' });
  let [prevRes, setPrevResult] = useState<number[]>([]);
  // Handler for focus event
  const handleFocus = (e: InputEvent): void => {
    e.preventDefault();
    setMessage({ text: 'Consider that only arithmetical expressions allowed', type: e.target.name });
  };

  // Handler for blur event (optional)
  const handleBlur = (e: InputEvent): void => {
    e.preventDefault();
    setMessage({ text: 'Please enter the arithmetical expression to calculate', type: '' });
  };

  const handleCurrentValue = (e: InputEvent): void => {
    e.preventDefault();

    let Pi = /[π]|(PI)/gi;

    let newVal = e.target.value.match(Pi)?.map(l => e.target.value.replace(l, String(Math.PI))).join('') ?? e.target.value;

    setCurrentValue(val => val = newVal ? newVal : e.target.value);
  };

  // Save previous result:
  const savePreviousResult = (e: ClickOperationEvent): void => {
    e.preventDefault();

    setPrevResult && setPrevResult((prevRes: number[]) => prevRes.length < 5 ? prevRes = (result === 0 && flag ? [...prevRes] : [...prevRes, result]) : prevRes = [...prevRes.slice(1), result]);
    setTimeout(() => setFlag(false), 100);
  };

  const deleting = (e: ClickOperationEvent): void => {
    e.preventDefault();
    if (currentValue.length > 0) {
      setCurrentValue(prev => prev = prev.slice(0, -1));
    }
    if (currentValue.length <= 1) {
      setDisabled(true);
      setTimeout(() => setDisabled(false), 1100);
    }
  };

  let evaluated = (v: string) => {
    let res;
    if (v.trim() !== '') { res = evaluate(v.trim()); }
    if (!v || v.trim() === '') {
      v = "0";
      res = 0;
    };
    return res
  }

  // Convert degrees - (user entered value) - to radians
  // let radians: () => number = () => (evaluated(currentValue) * (Math.PI / 180));

  const calcOperations = [
    function calculate(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result = evaluated(currentValue));
    },

    function plus(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result += evaluated(currentValue))
    },

    function minus(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result -= evaluated(currentValue))
    },

    function times(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result *= evaluated(currentValue));
    },

    function divide(e: ClickOperationEvent): void {
      e.preventDefault();

      if (!inputReg.test(currentValue.trim())) { throw typeError }
      (!currentValue || currentValue === '0') ?
        alert("ERROR: Cannot divide by ZERO!") :
        setResult((result) => result /= evaluated(currentValue))
    },

    function power(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result = Math.pow(evaluated(currentValue), result));
    },

    function exponent(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result = Math.exp(evaluated(currentValue)));
    },

    function ceil(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result = Math.ceil(evaluated(currentValue)));
    },

    function floor(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result = Math.floor(evaluated(currentValue)));
    },

    function round(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result = Math.round(evaluated(currentValue)));
    },

    function squareRoot(e: ClickOperationEvent): void {
      e.preventDefault();

      if (!inputReg.test(currentValue.trim())) { throw typeError }
      Number(currentValue) < 0 ?
        alert("ERROR: Cannot calculate a square root of a negative number!") :
        setResult((result) => result = Math.sqrt(evaluated(currentValue)));
    },

    function percentage(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }

      Number(currentValue) < 0 ?
        alert("ERROR: Cannot calculate a negative percentage of a number!") :
        setResult((result) => result = (result * (evaluated(currentValue)) / 100))
    },

    function calculateFactorial(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result = factorial(evaluated(currentValue)));
    },


    function calculatePi(e: ClickOperationEvent): void {
      e.preventDefault();
      setResult((result) => result = Math.PI);
    },

    function calculateMin(e: ClickOperationEvent): void {
      e.preventDefault();
      if (evaluated(currentValue) instanceof Array) {
        if (!inputReg.test(currentValue.trim())) { throw typeError }
        let res = evaluated(currentValue).map(Number);

        setResult((result) => result = Math.min(res));
      }
      else { alert('Enter more than 1 value') }

    },
    function calculateMax(e: ClickOperationEvent): void {
      e.preventDefault();

      if (evaluated(currentValue) instanceof Array) {
        if (!inputReg.test(currentValue.trim())) { throw typeError }
        setResult((result) => result = Math.max(evaluated(currentValue)));
      }
      else { alert('Enter more than 1 value') }
    },
    function calculateAbsolute(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result = Math.abs(evaluated(currentValue)));
    },

    function calculateSine(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult(result => result = Math.sin(evaluated(currentValue)));
    },

    function calculateCosine(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult(result => result = Math.cos(evaluated(currentValue)));
    },

    function calculateTangent(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result = Math.tan(evaluated(currentValue)));
    },

    function calculateCotangent(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      if ((parseFloat(currentValue) % Math.PI) === 0) { throw Error("ERROR: Cotangent is undefined for integer multiples of π (pi) - your entered value should not be a multiple of π!") }
      setResult((result) => result = cot(evaluated(currentValue)));
    },

    function calculateArchSin(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim()) || parseFloat(currentValue.trim()) > 1 || parseFloat(currentValue.trim()) < -1) { throw Error(`ArcSine requires a value between -1 & 1 - your entered value was: "${currentValue.trim()}". Please enter a valid value!`) }
      setResult(result => result = Math.asin(evaluated(currentValue)));
    },

    function calculateArchCos(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim()) || parseFloat(currentValue.trim()) > 1 || parseFloat(currentValue.trim()) < -1) {
        throw Error(`ArcCosine requires a value between -1 & 1 - your entered value was: "${currentValue.trim()}". Please enter a valid value!`);
      }
      setResult(result => result = Math.acos(evaluated(currentValue)));
    },

    function calculateArchTan(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult((result) => result = Math.atan(evaluated(currentValue)));
    },

    function calculateArcTan2(e: ClickOperationEvent): void {
      e.preventDefault();
      if (String(result).trim().length === 0 || !inputReg.test(currentValue.trim()) || currentValue.trim().length === 0) {
        throw Error(`ArcTangent requires two arguments - only value entered is: "${currentValue.trim().length > 0 ? currentValue.trim() : result}". Please enter values for both arguments!`)
      }
      setResult((result) => result = Math.atan2(evaluated(currentValue), result));
    },

    function calculateArchCot(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult(result => result = acot(evaluated(currentValue)));
    },

    function calculateHyperbolicArchSin(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult(result => result = Math.asinh(evaluated(currentValue)));
    },

    function calculateHyperbolicArchCos(e: ClickOperationEvent): void {
      e.preventDefault();

      if (!inputReg.test(currentValue.trim()) || parseFloat(currentValue.trim()) < 1) {
        throw Error(`Hyperbolic ArcCosine requires a value greater than or equal to 1 - your entered value was less than 1: "${currentValue.trim()} < 1". Please enter a valid value!`)
      }
      setResult(result => result = Math.acosh(evaluated(currentValue)));
    },

    function calculateHyperbolicArchTan(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim()) || parseFloat(currentValue.trim()) > 1 || parseFloat(currentValue.trim()) < -1) { throw Error(`Hyperbolic ArcTangent requires a value between -1 & 1 - your entered value was: "${currentValue.trim()}". Please enter a valid value!`) }
      setResult(result => result = Math.atanh(evaluated(currentValue)));
    },

    function calculateHyperbolicArchCot(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult(result => result = acoth(evaluated(currentValue)));
    },

    function calculateLog(e: ClickOperationEvent): void {
      e.preventDefault();
      if (!inputReg.test(currentValue.trim())) { throw typeError }
      setResult(result => result = Math.log(evaluated(currentValue)));
    },

    function resetInput(e: ClickOperationEvent): void {
      e.preventDefault();
      setCurrentValue((currentVal) => currentVal = '');
    },

    function resetResult(e: ClickOperationEvent): void {
      e.preventDefault();
      setResult(0)
    },
  ];

  return (
    <div className="md:w-full sm:w-fit grid h-full overflow-y-visible justify-items-center p-10 bg-linear-to-tr/decreasing from-yellow-500 via-orange-900 to-orange-500 bg-repeat bg-cover">
      <ErrorBoundary fallback={<ErrorPage />} >
        <div className="md:w-full flex flex-col justify-center items-center border-4 border-emerald-500 bg-linear-to-br/decreasing from-orange-950 via-orange-400 to-orange-950 rounded-2xl p-4 m-5 gap-8">
          <div className="m-3 flex justify-center items-center text-4xl border-2 border-emerald-500 p-2 rounded-3xl text-shadow-glow shadow-glow-lg sm:w-130 ">
            <h1 className="md:w-fit sm:w-100 text-cyan-200 text-shadow-glow shadow-glow-lg animate-pulse">Scientific Working Calculator</h1>
          </div>
          <ul className="flex md:w-fit sm:w-fit dark:bg-white/10 m-1 text-glow text-shadow-glow shadow-glow-lg gap-3" >
            {prevRes.map((e, i) => <li key={i} onClick={(e: React.MouseEvent<HTMLLIElement>): void => { if ((e.target as HTMLElement).textContent) { setCurrentValue(prev => prev = (e.target as HTMLElement).textContent) } }} className='text-white bg-yellow-400 font-medium active:bg-red-600 active:animate-pulse border p-1 rounded-2xl border-amber-300'
              // onDrag={(e: ClickOperationEvent) => {inputRef.current ? inputRef.current.value : null}} 
              draggable>{e}</li>)}
          </ul>
          <div className="flex justify-center lg:w-full sm:text-2xl h-50 p-10 m-5 rounded-2xl md:text-7xl font-bold bg-amber-300 outline-12 outline-emerald-300 outline-offset-10 outline-solid border-4 border-cyan-200 text-shadow-blue-700" onClick={(e: React.MouseEvent<HTMLDivElement>) => { if ((e.target as HTMLElement).textContent) { setCurrentValue(prev => prev = (e.target as HTMLElement).textContent) } }}>

            <p className="dark:bg-white/10 m-1 text-glow text-shadow-glow shadow-glow-lg w-full text-center">
              {result}
            </p>
          </div>
          <div className="md: w-full sm:w-fit text-white grid grid-cols-2 justify-center items-center align-middle mx-35 text-shadow-glow shadow-glow-lg gap-10">
            <div className="flex flex-col justify-center items-center">
              {message &&
                <div className="text-1xl text-center text-shadow-glow shadow-glow-lg animate-pulse">
                  {message.text}

                  {message.type.length > 0 &&
                    <div className="text-yellow-300 text-[0.7rem] text-center">

                      {message?.type} must consist of the integers, floating numbers and arithmetical operators
                    </div>}

                </div>}

              <input
                pattern={`${inputReg}`}
                id='text'
                name="text"
                ref={inputRef}
                type="text"
                placeholder="Type a number or any arithmetical expression"
                className='w-full bg-yellow-500 p-5 dark:bg-white/10 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl  
            placeholder:text-center focus:animate-pulse'
                onChange={(e) => handleCurrentValue(e)}//redundant and insecure!!!
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
                value={currentValue}
              /></div>
            <Button operationHandler={deleting} savePreviousResult={() => null} disabled={disabled} />
          </div>

          <div className="grid grid-flow-cols h-fit grid-cols-8 rounded-2xl gap-2 w-fit align-middle content-center items-center text-white border-4 border-x-orange-400 border-y-amber-500 border-double text-glow text-shadow-glow shadow-glow-lg animate-glow p-5">
            {calcOperations.map((operation, index) => {
              return <Button key={index} operationHandler={operation} savePreviousResult={(e) => savePreviousResult(e)} />
              // FYI: /([A-Z])/g, ' $&'.toLocaleLowerCase() - alternative regexp syntax for the same result

            })}
          </div>
        </div></ErrorBoundary>
    </div>
  );
  // (e: React.MouseEvent<HTMLButtonElement>) => {  }
}

export default ScientificCalculator;