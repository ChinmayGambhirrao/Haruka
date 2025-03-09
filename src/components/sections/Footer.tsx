import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="py-24 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-16">
          <div className="space-y-6">
            <div className="w-12 h-12 border border-gray-900 dark:border-gray-100 flex items-center justify-center">
              <span className="text-xl">春</span>
            </div>
            <p className="font-light text-gray-600 dark:text-gray-400">
              Your space for focused creation
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm tracking-widest">EXPLORE</h4>
            <ul className="space-y-4 font-light">
              <li>Features</li>
              <li>Process</li>
              <li>Pricing</li>
              <li>About</li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm tracking-widest">SUPPORT</h4>
            <ul className="space-y-4 font-light">
              <li>Guide</li>
              <li>FAQ</li>
              <li>Contact</li>
              <li>Privacy</li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm tracking-widest">CONNECT</h4>
            <ul className="space-y-4 font-light">
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>GitHub</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-800 text-center font-light text-sm">
          <p>© 2024 Haruka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 