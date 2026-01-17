import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import Button from '../components/Button';
import ErrorPage from "./ErrorPage";
import { evaluate, cot, acot, acoth, factorial } from "mathjs";
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

const ScientificCalculator = () => {
  const inputReg = /^[0-9e%^*+-/\.()=\\s\,]+$/;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typeError = new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!');

  let [result, setResult] = useState(0);
  let [disabled, setDisabled] = useState(false);
  let [message, setMessage] = useState({ text: '', type: '' });
  let [prevRes, setPrevResult] = useState<number[]>([]);

  // Handler for focus event
  const handleFocus = (e: FocusEvent): void => {
    setMessage({ text: 'Consider that only arithmetical expressions allowed', type: e.target.name });
  };

  // Handler for blur event (optional)
  const handleBlur = (): void => {
    setMessage({ text: 'Please enter the arithmetical expression to calculate', type: '' });
  };
  // Save previous result:
  const savePreviousResult = (e: OperationEvent): void => {
    e.preventDefault();
    result !== 0 && setPrevResult && setPrevResult((prevRes: number[]) => prevRes.length < 5 ? prevRes = [...prevRes, result] : prevRes = [...prevRes.slice(1), result])
  };

  const deleting = (e: OperationEvent): void => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.length > 0) {

      inputRef.current.value = inputRef.current.value.slice(0, -1);
    }
    if (inputRef.current && inputRef.current.value.length === 0) {
      setDisabled(true);

      setTimeout(() => setDisabled(false), 1100);
    }

  }
  useEffect(() => {
    console.log(inputRef.current && inputRef.current.value)
    console.log(inputRef.current && typeof inputRef.current.value)
  }, [inputRef]);

  let val = (v: HTMLInputElement) => {
    let res;
    if (v.value.trim() !== '') { res = evaluate(v.value.trim()); }
    if (!v || v.value.trim() === '' || !v.value) {
      v.value = "0";
      res = 0;
    };
    return res
  }

  // (!inputRef.current || inputRef.current.value.trim() === '' || !inputRef.current.value ) ? (inputRef.current ? inputRef.current.value = "0" : null): operation(e) 
  // Convert degrees - (user entered value) - to radians
  let radians: () => number = () => inputRef.current! && (val(inputRef.current) * (Math.PI / 180));
  // NEVER use direct storing, use callbacks - OTHERWISE YOU SIMPLY STORE THE PREVIOUS REF VALUE AND THEN USE IT INSTEAD OF THE CURRENT REF VALUE WHICH LEAD TO WRONG RESULTS - ONLY CALLBACKS (THIS WAY) OR USE THE VALUE OF THIS VARIABLE DIRECTLY IN EACH FUNCTION BELOW
  const calcOperations = [
    function calculate(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = inputRef.current && val(inputRef.current));
    },

    function plus(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result += inputRef.current && val(inputRef.current))
    },

    function minus(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result -= inputRef.current && val(inputRef.current))
    },

    function times(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result *= inputRef.current && val(inputRef.current));
    },

    function divide(e: OperationEvent): void {
      e.preventDefault();

      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      (!inputRef.current || inputRef.current.value === '0') ?
        alert("ERROR: Cannot divide by ZERO!") :
        setResult((result) => result /= inputRef.current && val(inputRef.current))
    },

    function power(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = Math.pow(inputRef.current && val(inputRef.current), result));
    },

    function exponent(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = Math.exp(inputRef.current && val(inputRef.current)));
    },

    function ceil(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = Math.ceil(inputRef.current && val(inputRef.current)));
    },

    function floor(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = Math.floor(inputRef.current && val(inputRef.current)));
    },

    function round(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = Math.round(inputRef.current && val(inputRef.current)));
    },

    function squareRoot(e: OperationEvent): void {
      e.preventDefault();

      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      Number(inputRef.current && inputRef.current.value) < 0 ?
        alert("ERROR: Cannot calculate a square root of a negative number!") :
        setResult((result) => result = Math.sqrt(inputRef.current && val(inputRef.current)));
    },

    function percentage(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }

      Number(inputRef.current && inputRef.current.value) < 0 ?
        alert("ERROR: Cannot calculate a negative percentage of a number!") :
        setResult((result) => result = (result * (inputRef.current && val(inputRef.current)) / 100))
    },

    function calculateFactorial(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = factorial(inputRef.current && val(inputRef.current)));
    },

    function calculateMin(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && val(inputRef.current) instanceof Array) {
        if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
        let res = inputRef.current && val(inputRef.current).map(Number);

        setResult((result) => result = Math.min(res));
      }
      else { alert('Enter more than 1 value') }

    },
    function calculateMax(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = Math.max(inputRef.current && val(inputRef.current)));
    },
    function calculateAbsolute(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = Math.abs(inputRef.current && val(inputRef.current)));
    },

    function calculateSine(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult(result => result = Math.sin(radians()));
    },

    function calculateCosine(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult(result => result = Math.cos(radians()));
    },

    function calculateTangens(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = Math.tan(radians()));
    },

    function calculateCotangens(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = cot(radians()));
    },

    function calculateArchSin(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult(result => result = Math.asin(radians()));
    },

    function calculateArchCos(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult(result => result = Math.acos(radians()));
    },

    function calculateArchTan(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = Math.atan(radians()));
    },

    function calculateArcTan2(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult((result) => result = Math.atan2(radians(), result));
    },

    function calculateArchCot(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult(result => result = acot(radians()));
    },

    function calculateHyperbolicArchSin(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult(result => result = Math.asinh(radians()));
    },

    function calculateHyperbolicArchCos(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult(result => result = Math.acosh(radians()));
    },

    function calculateHyperbolicArchTan(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult(result => result = Math.atanh(radians()));
    },

    function calculateHyperbolicArchCot(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult(result => result = acoth(radians()));
    },

    function calculateLog(e: OperationEvent): void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw typeError }
      setResult(result => result = Math.log(radians()));
    },

    function resetInput(e: OperationEvent): void {
      e.preventDefault();
      inputRef.current ? inputRef.current.value = '' : null
    },

    function resetResult(e: OperationEvent): void {
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
            {prevRes.map((e, i) => <li key={i} onClick={(e: React.MouseEvent<HTMLLIElement>): void => { if (inputRef.current) { inputRef.current.value = (e.target as HTMLElement).textContent } }} className='text-white bg-yellow-400 font-medium active:bg-red-600 active:animate-pulse border p-1 rounded-2xl border-amber-300'
              // onDrag={(e: OperationEvent) => {inputRef.current ? inputRef.current.value : null}} 
              draggable>{e}</li>)}
          </ul>
          <div className="flex justify-center lg:w-full sm:text-2xl h-50 p-10 m-5 rounded-2xl md:text-7xl font-bold bg-amber-300 outline-12 outline-emerald-300 outline-offset-10 outline-solid border-4 border-cyan-200 text-shadow-blue-700" onClick={(e: OperationEvent) => { inputRef.current ? inputRef.current.value = String(result) : null }}>

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
                pattern={'[0-9e%^*+-/\.()=\\s\,]+'}
                id='text'
                name="text"
                ref={inputRef}
                type="text"
                placeholder="Type a number or any arithmetical expression"
                className='w-full bg-yellow-500 p-5 dark:bg-white/10 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl  
            placeholder:text-center focus:animate-pulse'
                // onChange={(e) => inputRef.current.value = e.target.value}//redundant and insecure!!!
                onFocus={(e) => handleFocus(e)}
                onBlur={() => handleBlur()}
                autoFocus
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