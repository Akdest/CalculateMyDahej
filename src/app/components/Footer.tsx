// components/Footer.tsx

export default function Footer() {
    return (
      <footer className="bg-gray-200 border-gray-200 shadow-inner">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          
          {/* Branding */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">CalculateMyDahej</h2>
            <p className="text-sm text-gray-500">A fun tool with a message.</p>
          </div>
  
          {/* Disclaimer Note */}
          <div className="text-sm text-gray-600 max-w-md leading-relaxed">
            <strong>Disclaimer:</strong> This tool is made for fun and satire only. It does not promote or support any societal or cultural norms related to dowry.
          </div>
  
          {/* Footer Navigation */}
          <div className="space-x-4 text-sm text-gray-600">
            <a href="#form" className="hover:text-yellow-700 font-medium">Calculator</a>
            
          </div>
        </div>
  
        {/* Copyright */}
        <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">
          &copy; {new Date().getFullYear()} CalculateMyDahej. All rights reserved.
        </div>
      </footer>
    );
  }
  