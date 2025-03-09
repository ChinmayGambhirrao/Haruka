import { StarIcon } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "Haruka has transformed my daily work routine into a mindful practice.",
      author: "Sarah Chen",
      role: "UX Designer"
    },
    {
      quote: "The perfect balance of functionality and tranquility.",
      author: "David Miller",
      role: "Software Engineer"
    },
    {
      quote: "Finally found my ideal digital zen garden for focused work.",
      author: "Emma Wilson",
      role: "Content Creator"
    }
  ];

  return (
    <section className="py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-24 tracking-widest">REFLECTIONS</h2>
        <div className="grid md:grid-cols-3 gap-16">
          {testimonials.map((item, i) => (
            <div key={i} className="flex flex-col items-center space-y-8">
              <div className="w-16 h-[1px] bg-gray-400 dark:bg-gray-600"></div>
              <blockquote className="text-center">
                <p className="text-lg font-light italic leading-relaxed">
                  "{item.quote}"
                </p>
              </blockquote>
              <div className="text-center">
                <p className="font-medium">{item.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 tracking-wide">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 