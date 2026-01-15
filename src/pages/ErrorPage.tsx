import { useRouteError, useNavigate } from 'react-router-dom';
import Button from '../components/Button'

export default function ErrorPage() {
  const error = useRouteError() as Error;
  let navigate = useNavigate();
  const clickHereToStepBack = () => navigate('/'); //defined function name this way to use it later below when passing as the Button component's operationHandler prop's value and making read as the button's text node being splitted into separate words at each capital letter
  return ( 
      <div 
     className="flex flex-3 flex-col justify-center items-center text-white text-center animate-pulse text-7xl align-middle border-10 border-emerald-500 bg-linear-to-br/longer from-orange-950 via-orange-400 to-orange-950 h-screen p-4 gap-20">
          
      <p>Error is that we {error.message.toLowerCase()}</p>
      
      <p>Please Step Back and Enter a Valid Data</p>
        <Button savePreviousResult={()=>null} operationHandler={clickHereToStepBack}/>
    </div>
  );
}