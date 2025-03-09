import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      kanji: "入",
      name: "Entry",
      price: "Free",
      popular: false,
      features: [
        { name: "Essential workspaces", available: true },
        { name: "Basic timer", available: true },
        { name: "Core sounds", available: true },
        { name: "Limited tasks", available: true },
        { name: "Custom environments", available: false },
        { name: "Priority support", available: false }
      ]
    },
    {
      kanji: "道",
      name: "Path",
      price: "$12/month",
      popular: true,
      features: [   
        { name: "All workspaces", available: true },
        { name: "Advanced timer", available: true },
        { name: "Full sound library", available: true },
        { name: "Unlimited tasks", available: true },
        { name: "Custom environments", available: true },
        { name: "Priority support", available: false }
      ]
    },
    {
      kanji: "永",
      name: "Eternal",
      price: "$120/year",
      popular: false,
      features: [
        { name: "Everything in Path", available: true },
        { name: "Priority support", available: true },
        { name: "Early features", available: true },
        { name: "Custom sounds", available: true },
        { name: "Personal onboarding", available: true },
        { name: "Custom integrations", available: true }
      ]
    }
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-24 tracking-widest">JOURNEY</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className="relative group perspective">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 
                  text-white dark:text-gray-900 text-xs tracking-wider py-1 px-4 z-10">
                  POPULAR CHOICE
                </div>
              )}
              <div className={`h-full flex flex-col items-center p-8 space-y-8 
                border border-gray-200 dark:border-gray-800 
                ${plan.popular ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'} 
                transition-all duration-500 
                group-hover:border-gray-900 dark:group-hover:border-gray-100
                group-hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]
                dark:group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                transform-gpu group-hover:scale-[1.02]`}
              >
                {/* Kanji Symbol with rotating effect */}
                <div className="relative w-20 h-20 transition-transform duration-500 transform-gpu 
                  group-hover:rotate-[360deg]">
                  <div className="absolute inset-0 border border-gray-900 dark:border-gray-100 
                    flex items-center justify-center">
                    <span className="text-3xl font-light">{plan.kanji}</span>
                  </div>
                  <div className="absolute inset-0 border border-gray-900 dark:border-gray-100 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                    rotate-45"></div>
                </div>

                {/* Plan Name and Price */}
                <div className="text-center space-y-4 relative">
                  <h3 className="text-xl tracking-wide group-hover:text-gray-900 
                    dark:group-hover:text-gray-100 transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <p className="text-2xl font-light relative">
                    <span className="group-hover:opacity-0 transition-opacity duration-300">
                      {plan.price}
                    </span>
                    <span className="absolute left-1/2 -translate-x-1/2 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300">
                      Select Plan →
                    </span>
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-4 text-center font-light flex-grow w-full">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center justify-between py-2 px-4 
                      ${i !== plan.features.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''} 
                      group-hover:border-gray-200 dark:group-hover:border-gray-700 
                      transition-colors duration-300`}>
                      <span className={`${feature.available ? '' : 'text-gray-400 dark:text-gray-600'}`}>
                        {feature.name}
                      </span>
                      <Check className={`w-4 h-4 transition-all duration-300 
                        ${feature.available 
                          ? 'opacity-100 text-gray-900 dark:text-gray-100' 
                          : 'opacity-30'}`} 
                      />
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <Button className="w-full rounded-none group/button relative overflow-hidden
  border border-gray-900 dark:border-gray-100 
  bg-transparent !text-gray-900 dark:!text-gray-100
  hover:!text-white cursor-pointer">
  <span className="relative z-10 flex items-center justify-center gap-2 !text-gray-900 dark:!text-gray-100
    ">
    Get Started
    <ChevronRight className="w-4 h-4 transition-transform duration-300 
      group-hover/button:translate-x-1" />
  </span>
  <div className="absolute inset-0 bg-gray-900 dark:bg-gray-100 
    transform -translate-x-full group-hover/button:translate-x-0 
    transition-transform duration-300"></div>
</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}