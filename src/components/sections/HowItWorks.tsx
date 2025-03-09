export function HowItWorks() {
  const steps = [
    {
      kanji: "選",
      title: "Select",
      description: "Choose your ideal workspace environment"
    },
    {
      kanji: "設",
      title: "Set",
      description: "Configure your focus session duration"
    },
    {
      kanji: "始",
      title: "Start",
      description: "Begin your focused work period"
    },
    {
      kanji: "続",
      title: "Sustain",
      description: "Maintain productivity through regular intervals"
    }
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-24 tracking-widest">PROCESS</h2>
        <div className="grid md:grid-cols-4 gap-16">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center space-y-8">
              <div className="relative">
                <div className="w-24 h-24 border border-gray-900 dark:border-gray-100 flex items-center justify-center">
                  <span className="text-4xl font-light">{step.kanji}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 w-16 h-[1px] bg-gray-300 dark:bg-gray-700"></div>
                )}
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-xl tracking-wide">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 