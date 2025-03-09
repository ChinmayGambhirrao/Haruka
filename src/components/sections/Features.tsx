export function Features() {
  const features = [
    {
      kanji: "静",
      title: "Serenity",
      description: "Immerse yourself in carefully crafted ambient soundscapes"
    },
    {
      kanji: "時",
      title: "Time",
      description: "Master your focus with our refined Pomodoro technique"
    },
    {
      kanji: "務",
      title: "Tasks",
      description: "Organize your work with elegant simplicity"
    },
    {
      kanji: "場",
      title: "Space",
      description: "Choose from mindfully designed virtual environments"
    }
  ];

  return (
    <section className="py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-24 tracking-widest">FEATURES</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center space-y-6 group">
              <div className="w-20 h-20 border border-gray-300 dark:border-gray-700 flex items-center justify-center group-hover:border-gray-900 dark:group-hover:border-gray-100 transition-all duration-300">
                <span className="text-3xl font-light">{feature.kanji}</span>
              </div>
              <h3 className="text-xl tracking-wide">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 