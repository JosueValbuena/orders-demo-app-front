import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const handleNavigate = (path: string): void => {
        navigate(path);
    };

    return (
        <nav className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div
                            className="flex-shrink-0"
                            onClick={() => handleNavigate('/')}
                        >
                            <span className="text-xl font-bold cursor-pointer">Home</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Button
                            variant="outline"
                            className="bg-gray-700 text-white cursor-pointer font-semibold hover:bg-gray-800 hover:text-white"
                            onClick={() => handleNavigate('/orders/create')}
                        >
                            Create
                        </Button>
                    </div>
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMenu}
                            className="text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-800">
                        <div className="px-3 py-2">
                            <Button variant="outline" className="w-full bg-gray-700 text-white cursor-pointer font-semibold hover:bg-gray-800 hover:text-white">
                                Create
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;