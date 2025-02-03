import React, { useContext } from 'react';
import { LoginContext } from '../helpers/LoginContext';
import { Link } from 'react-router-dom';

const Admin = () => {
   const isLoggedIn = useContext(LoginContext);

   return (
      <div className="fixed bg-transparent top-[198px] bottom-0 left-[4px] w-[90px] z-[10] border border-gray-500 min-h-[842px] rounded-bl-md flex flex-col items-center p-2">
         {isLoggedIn ? (
            <>
               <h1 className="text-white text-lg font-bold mb-4">Admin</h1>
               <nav className="flex flex-col space-y-2">
                  <Link 
                     to="/upload" 
                     className="text-white text-sm border border-blue-400 px-2 py-1 rounded-md bg-transparent hover:bg-blue-500 hover:text-white transition"
                  >
                     Upload
                  </Link>
                  <Link 
                     to="/data" 
                     className="text-white text-sm border border-blue-400 px-2 py-1 rounded-md bg-transparent hover:bg-blue-500 hover:text-white transition"
                  >
                     Data
                  </Link>
               </nav>
            </>
         ) : null}
      </div>
   );
};

export default Admin;
