import Link from "next/link"; 
import Image from "next/image";  

export default function Navbar() {   
  return (     
    <nav className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">       
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">         
        {/* Logo */}
        <Link href="/" className="flex items-center text-2xl font-bold text-gray-800 hover:text-blue-600 transition">             
          <Image src="/images/lemon2.png" alt="Lemon logo" width={100} height={80} className="mr-2" />             
          Lemon           
        </Link>
        
        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">           
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">
            <span className="hidden md:inline">Home</span>           
          </Link>           
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">
            <span className="hidden md:inline">Profile</span>           
          </Link>           
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">
            <span className="hidden md:inline">Settings</span>           
          </Link>         
        </div>       
      </div>     
    </nav>   
  ); 
}