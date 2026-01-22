import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='fixed flex flex-col justify-center text-cyan-200 hover:border-red-600 text-glow text-shadow-glow shadow-glow-lg'>
      <NavLink to={'/'} className='w-fit border-2 hover:border-3 border-t-yellow-300 bg-amber-700 dark:bg-white/10 p-4 rounded-2xl hover:border-t-cyan-500 hover:border-b-yellow-500 hover:bg-amber-100 hover:text-red-600 hover:animate-pulse text-glow text-shadow-glow shadow-glow-lg'>Scientific Working Calculator</NavLink>
      <NavLink to={'temperature'} className='w-fit border-2 hover:border-3 border-t-yellow-300 bg-amber-700 dark:bg-white/10 p-4 rounded-2xl hover:border-t-cyan-500 hover:border-b-yellow-500 hover:bg-amber-100 hover:text-red-600 hover:animate-pulse text-glow text-shadow-glow shadow-glow-lg'>Temperature Converter</NavLink>
      <NavLink to={'currency-converter'} className='w-fit border-2 hover:border-3 border-t-yellow-300 bg-amber-700 dark:bg-white/10 p-4 rounded-2xl hover:border-t-cyan-500 hover:border-b-yellow-500 hover:bg-amber-100 hover:text-red-600 hover:animate-pulse text-glow text-shadow-glow shadow-glow-lg'>Currency Converter</NavLink>


      {/* <NavLink to={'/dashboard'}>Dashboard</NavLink> */}
    </nav>
  );
}