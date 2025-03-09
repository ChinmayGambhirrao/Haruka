import { Button } from "@/components/ui/button";


export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Japanese pattern background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="seigaiha"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          {/* Japanese mon (crest) style icon */}
          <div className="w-24 h-24 border-2 border-gray-900 dark:border-gray-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">春</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl font-extralight tracking-widest">
              HARUKA
            </h1>
            <div className="w-24 h-[1px] bg-gray-900 dark:bg-gray-100 mx-auto"></div>
            <p className="text-xl font-light tracking-wide max-w-xl">
              Find your focus in a space of serenity
            </p>
          </div>
          
          <div className="flex gap-8 mt-12">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-6 rounded-none text-lg tracking-wider transition-all duration-300">
              Begin Journey
            </Button>
            <Button variant="outline" className="px-12 py-6 rounded-none text-lg tracking-wider border-gray-900 dark:border-gray-100">
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 