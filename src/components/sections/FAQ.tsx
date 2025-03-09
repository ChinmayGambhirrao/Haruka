export function FAQ() {
  const faqs = [
    {
      question: "What makes Haruka different?",
      answer: "Haruka combines minimalist design with powerful productivity tools, creating a serene digital environment for focused work."
    },
    {
      question: "Can I customize my workspace?",
      answer: "Yes, each workspace can be tailored to your preferences, from ambient sounds to visual elements."
    },
    {
      question: "Is Haruka available offline?",
      answer: "Yes, core features are available offline, ensuring your focus remains uninterrupted."
    },
    {
      question: "Do you offer team plans?",
      answer: "We provide custom solutions for teams seeking to create shared focused workspaces."
    }
  ];

  return (
    <section className="py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-24 tracking-widest">QUESTIONS</h2>
        <div className="max-w-3xl mx-auto space-y-16">
          {faqs.map((faq, i) => (
            <div key={i} className="group">
              <div className="flex items-center space-x-8">
                <div className="w-[1px] h-8 bg-gray-400 dark:bg-gray-600"></div>
                <h3 className="text-xl tracking-wide">{faq.question}</h3>
              </div>
              <p className="mt-4 ml-9 font-light text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 