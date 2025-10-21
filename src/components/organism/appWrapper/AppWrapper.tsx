import { Outlet, ScrollRestoration } from 'react-router';
import Navbar from '../navbar/NavBar'

const AppWrapper = () => {
    return (
        <div className='min-h-[100dvh]'>
            <Navbar />
            <Outlet />
            <ScrollRestoration />
        </div>
    );
};

export default AppWrapper;