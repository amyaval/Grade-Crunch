

function Footer(){
    return(
          <footer className="bg-white flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
            <p>&copy; {new Date().getFullYear()} Grade Crunch. All rights reserved.</p>
          </footer>  
    );
};

export default Footer;