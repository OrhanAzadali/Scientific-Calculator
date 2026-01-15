// import {useRef} from 'react';
// import {React.RefObject} from 'typescript'

// interface OperationEvent {
//     preventDefault: ()=> void;
//   }
//     let ref = useRef<HTMLInputElement>(null);

//   let inputReg = /^[0-9e%^*+-/.()=\s]+$/;
  
// const Services = (ref, result, setResult) = [
//     function calculate(e: OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       setResult((result) => result = ref.current && val(ref.current));
//     },

//     function plus(e:OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       setResult((result) => result += ref.current && val(ref.current))
//     },

//     function minus(e:OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       setResult((result) => result -= ref.current && val(ref.current))
//     },

//     function times(e:OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       setResult((result) => result *= ref.current && val(ref.current));
//     },

//     function divide(e:OperationEvent):void {
//       e.preventDefault();

//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       (!ref.current || ref.current.value === '0') ?
//         alert("ERROR: Cannot divide by ZERO!") :
//         setResult((result) => result /= ref.current && val(ref.current))
//     },

//     function exponent(e:OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       setResult((result) => result **= ref.current && val(ref.current));
//     },

//     function squareRoot(e:OperationEvent):void {
//       e.preventDefault();

//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       Number(ref.current && ref.current.value) < 0 ?
//         alert("ERROR: Cannot calculate a square root of a negative number!") :
//         setResult((result) => result = Math.sqrt(ref.current && val(ref.current)));
//     },

//     function percentage(e:OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
   
//       Number(ref.current && ref.current.value) < 0 ?
//         alert("ERROR: Cannot calculate a negative percentage of a number!") :
//         setResult((result) => result = (result * (ref.current && val(ref.current)) / 100))
//     },

//     function factorial(e:OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       setResult((result) => result = math.factorial(ref.current && val(ref.current)));
//     },

//     function calculateSine(e:OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       setResult(result => result = Math.sin(radians()));
//     },

//     function calculateCos(e:OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       setResult(result => result = Math.cos(radians()));
//     },

//     function calculateLog(e:OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value !== null && !inputReg.test(ref.current.value.trim())) { throw new Error('PLEASE ENTER A VALID VALUE - ONLY ARITHMETICAL EXPRESSIONS ARE ALLOWED!!!') }
//       setResult(result => result = Math.log(radians()));
//     },

//     function resetInput(e:OperationEvent):void {
//       e.preventDefault();
//       ref.current ? ref.current.value = '' : null
//     },

//     function resetResult(e:OperationEvent):void {
//       e.preventDefault();
//       setResult(0)
//     },

//     function deleting(e:OperationEvent):void {
//       e.preventDefault();
//       if (ref.current && ref.current.value.length >= 1) ref.current.value = ref.current.value.slice(0, - 1)
//     },
//   ];