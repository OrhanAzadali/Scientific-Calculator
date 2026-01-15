import { ReactElement, JSXElementConstructor, ReactEventHandler, ReactHTMLElement } from 'react';
 
interface ButtonProps{
    savePreviousResult: ReactEventHandler;
    operationHandler: ReactEventHandler;
}

type ButtonType = ReactElement<ButtonProps, JSXElementConstructor<'button'>>;

const Button = ({ savePreviousResult, operationHandler}:ButtonProps):ButtonType => {

const class1 = 'md:w-full sm:w-fit h-20 border-2 border-double border-b-yellow-950 bg-amber-700 dark:bg-white/10 rounded-2xl font-red-500 hover:border-red-600 hover:bg-amber-100 hover:text-red-600 hover:animate-pulse text-glow text-shadow-glow shadow-glow-lg animate-glow m-1';

const class2 = 'md:w-full sm:w-fit h-20 border-2 border-double border-b-green-950 bg-blue-700 dark:bg-white/10 rounded-2xl font-red-500 hover:border-red-600 hover:bg-amber-100 hover:text-red-600 text-glow text-shadow-glow shadow-glow-lg m-1 active:bg-red-700 active:text-white active:animate-pulse active:font-bold';

    return(<button type='button'
            onClick={(e) => { try { if(!(['resetInput', 'deleting', 'resetResult'].includes(operationHandler.name))) {operationHandler(e); savePreviousResult && savePreviousResult(e)} else{ operationHandler(e); }} catch (error: any) { alert(error.message) } }}
            className={operationHandler.name === 'deleting' ? class2 : class1}>
                 {`${operationHandler.name[0].toLocaleUpperCase()}${operationHandler.name.slice(1).replace(/(?=[A-Z])/g, ' ')}`}
              </button>)

    }
export default Button;