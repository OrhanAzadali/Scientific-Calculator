import React, {
  useState,
  useRef,
  useEffect,
  ReactEventHandler,
  RefObject,
  RefAttributes,
  JSXElementConstructor,
  ReactNode,
  ReactElement,
} from "react";
import * as math from 'mathjs';
import { ErrorBoundary } from "react-error-boundary";
import Button from '../components/Button';
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
    preventDefault: ()=> void;
  }

const Temperature = ():ReactElement => {
  const inputReg = /^[0-9e%^*+-/.()=\\s]+$/;
  const inputRef = useRef<HTMLInputElement | null>(null);

  let [result, setResult] = useState(0);
  let [message, setMessage] = useState({ text: '', type: '' });


  // Handler for focus event
  const handleFocus = (e: FocusEvent): void => {
    setMessage({ text: 'Consider that only arithmetical expressions allowed', type: e.target.name });
  };

 // Handler for blur event (optional)
  const handleBlur = () => {
    setMessage({ text: 'Please enter the arithmetical expression to calculate', type: '' });
  };
  

  useEffect(() => {
    console.log(inputRef.current && inputRef.current.value)
    console.log(inputRef.current && typeof inputRef.current.value)
  }, [inputRef]);

  let val = (v:HTMLInputElement) => {
   if(v.value.trim() !== '') {return math.evaluate(v.value.trim());}
   if(!v || v.value.trim() === '' || !v.value ) { 
    v.value = "0"; 
    return 0;
    };
  }
   
  // (!inputRef.current || inputRef.current.value.trim() === '' || !inputRef.current.value ) ? (inputRef.current ? inputRef.current.value = "0" : null): operation(e) 
  // Convert degrees - (user entered value) - to radians
  let radians: ()=> number = ()=> inputRef.current ! && (val(inputRef.current) * (Math.PI / 180));
  // NEVER use direct storing, use callbacks - OTHERWISE YOU SIMPLY STORE THE PREVIOUS REF VALUE AND THEN USE IT INSTEAD OF THE CURRENT REF VALUE WHICH LEAD TO WRONG RESULTS - ONLY CALLBACKS (THIS WAY) OR USE THE VALUE OF THIS VARIABLE DIRECTLY IN EACH FUNCTION BELOW

    // let tempInCelsius;

    // // Convert input to Celsius first
    // switch (from) {
    //     case "C": tempInCelsius = temp; break;
    //     case "F": tempInCelsius = (temp - 32) * 5/9; break;
    //     case "K": tempInCelsius = temp - 273.15; break;
    //     default: resultElement.textContent = "Invalid unit."; return;
    // }

    // let convertedTemp;

    // // Convert Celsius to target unit
    // switch (to) {
    //     case "C": convertedTemp = tempInCelsius; break;
    //     case "F": convertedTemp = (tempInCelsius * 9/5) + 32; break;
    //     case "K": convertedTemp = tempInCelsius + 273.15; break;
    //     default: resultElement.textContent = "Invalid unit."; return;
    // }


  const calcOperations = [
    function calculate(e: OperationEvent):void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value !== null && !inputReg.test(inputRef.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
      setResult((result) => result = inputRef.current && val(inputRef.current));
    },

    function resetInput(e:OperationEvent):void {
      e.preventDefault();
      inputRef.current ? inputRef.current.value = '' : null
    },

    function resetResult(e:OperationEvent):void {
      e.preventDefault();
      setResult(0)
    },

    function deleting(e:OperationEvent):void {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value.length >= 1) inputRef.current.value = inputRef.current.value.slice(0, - 1)
    },
  ];

  return (
    <div className="grid h-full overflow-y-visible justify-items-center p-10 bg-linear-to-tr/decreasing from-yellow-500 via-orange-900 to-orange-500 bg-repeat bg-cover">
    <ErrorBoundary fallback={
  <ErrorPage/>} >
        <div className="grid justify-items-center align-middle border-4 border-emerald-500 bg-linear-to-br/decreasing from-orange-950 via-orange-400 to-orange-950 rounded-2xl w-140 p-4 m-5 gap-8">
          <div className="m-3 text-4xl border-2 border-emerald-500 p-2 rounded-3xl text-shadow-glow shadow-glow-lg">
            <h1 className="text-cyan-200 text-shadow-glow shadow-glow-lg animate-pulse">Temperature Converter</h1>
          </div>
          <div className="h-45 w-130 p-10 rounded-2xl text-3xl font-extrabold bg-amber-300 outline-3 outline-emerald-300 outline-offset-4 outline-solid border-4 border-cyan-200 text-shadow-blue-700" onClick={(e: OperationEvent) => {inputRef.current ? inputRef.current.value = String(result) : null}}>
            <p className="dark:bg-white/10 w-fit-content m-1 items-center text-glow text-shadow-glow shadow-glow-lg">
              {result}
            </p>
          </div>
 {message && <div className="text-white flex flex-col justify-center items-center text-shadow-glow shadow-glow-lg animate-pulse">
           {message.type.length > 0 && <div>
       <div className="text-yellow-300 text-[0.7rem] text-center">
                  {message?.type} must consist of the integers, floating numbers and arithmetical operators
                </div>
         </div>}<div className="text-1xl text-center text-shadow-glow shadow-glow-lg">
              {message.text}
          </div>
         <input pattern={'[0-9e%^*+-/.()=\\s]+'}
            id='text'
            name="text"
            ref={inputRef}
            type="text"
            placeholder="Type a number or any arithmetical expression"
            className='bg-yellow-500 p-5 dark:bg-white/10 w-120 m-1 rounded-2xl text-1xl text-violet-950 border-2 border-blue-100 focus:border-yellow-500 outline-2 outline-offset-1 focus:border-2 focus:placeholder:text-emerald-400 focus:bg-amber-200 focus:outline-hidden placeholder:text-blue-600 placeholder:text-0.5xl  placeholder:text-center'
            // onChange={(e) => inputRef.current.value = e.target.value}//redundant and insecure!!!
            onFocus={(e) => handleFocus(e)}
            onBlur={() => handleBlur()}
            autoFocus
          />
   
          </div>}
          <div className="grid grid-flow-cols h-fit grid-cols-3 rounded-2xl gap-2 p-2 w-115 align-middle content-center items-center text-white border-4 border-x-orange-400 border-y-amber-500 border-double text-glow text-shadow-glow shadow-glow-lg animate-glow">
            {calcOperations.map((operation, index) => {
              return <Button key={index} operationHandler={operation}/>
              // FYI: /([A-Z])/g, ' $&'.toLocaleLowerCase() - alternative regexp syntax for the same result

            })}
          </div>
        </div></ErrorBoundary>
    </div>
  );
}
// (e: React.MouseEvent<HTMLButtonElement>) => {  }


export default Temperature; 