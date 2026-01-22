type ButtonType = React.MouseEventHandler<HTMLButtonElement>;
interface ButtonProps {
    styleSet?: string;
    size?: string;
    disabled?: boolean;
    savePreviousResult?: ButtonType;
    operationHandler: ButtonType;
}

const Button = ({ styleSet = '', size = 'default', disabled, savePreviousResult, operationHandler }: ButtonProps) => {
    const sizeStyles: { [key: string]: string } = {
        'sm': 'px-4 py-2 text-sm',
        'default': 'px-6 py-3 text-base',
        'lg': 'px-8 py-4 text-lg',
    };

    size = sizeStyles[size];

    const class1 = 'md:w-full sm:w-fit h-20 border-2 border-double border-b-yellow-950 bg-amber-700 dark:bg-white/10 rounded-2xl font-red-500 hover:border-red-600 hover:bg-amber-100 hover:text-red-600 hover:animate-pulse text-glow text-shadow-glow shadow-glow-lg animate-glow m-1';

    const class2 = 'md:w-full sm:w-fit h-20 border-2 border-double border-b-green-950 bg-blue-700 dark:bg-white/10 rounded-2xl font-red-500 hover:border-red-600 hover:bg-amber-100 hover:text-red-600 text-glow text-shadow-glow shadow-glow-lg m-1 active:bg-red-700 active:text-white active:animate-pulse active:font-bold';

    const styles = `${operationHandler.name === 'deleting' && !disabled ? class2 : class1} ${size} ${styleSet}`;

    const buttonEventHandler = (e: React.MouseEvent<HTMLButtonElement>, { savePreviousResult, operationHandler }: ButtonProps) => {
        try { if (!(['resetInput', 'deleting', 'resetResult'].includes(operationHandler.name))) { operationHandler(e); savePreviousResult && savePreviousResult(e) } else { operationHandler(e); } } catch (error: any) { alert(error.message) }
    };

    return (<button type='button'
        onClick={(e) => buttonEventHandler(e, { savePreviousResult, operationHandler })}
        className={styles} disabled={disabled}>
        {!disabled ?
            `${operationHandler.name[0].toLocaleUpperCase()}${operationHandler.name.slice(1).replace(/(?=[A-Z])/g, ' ')} ` :
            "Nothing to Delete!"}
    </button >)
}
export default Button;