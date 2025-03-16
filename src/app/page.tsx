"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const handleDashboardNavigation = async () => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      try {
        await signIn("google", {
          callbackUrl: "/dashboard",
          redirect: true
        });
      } catch (error) {
        console.error("Sign in error:", error);
      }
    }
  };

  const handleExplore = () => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // If loading, show nothing
  if (status === "loading") {
    return null;
  }

  return (
    <main className="min-h-screen bg-background text-foreground" ref={ref}>
      <Navbar />
      {/* Hero Section with Parallax */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.div 
          className="absolute inset-0 japanese-pattern opacity-10"
          style={{ y }}
        />
        <div className="container mx-auto px-4 z-10">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-8 text-center"
            variants={staggerContainer}
          >
            <motion.div 
              className="text-6xl font-light"
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              春
            </motion.div>
            
            <motion.h1 
              className="text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
              variants={fadeInUp}
            >
              HARUKA
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl"
              variants={fadeInUp}
            >
              Find your focus in a space of serenity
            </motion.p>
            
            <motion.div 
              className="flex gap-6"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="rounded-none relative overflow-hidden group"
                  onClick={handleDashboardNavigation}
                >
                  <span className="relative z-10">
                    {status === "authenticated" ? "Go to Dashboard" : "Begin Journey"}
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gray-700 dark:bg-gray-300"
                    initial={{ y: "100%" }}
                    whileHover={{ y: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-none group"
                  onClick={handleExplore}
                >
                  <motion.span 
                    className="inline-flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    {status === "authenticated" ? "View Dashboard" : "Explore"}
                    <span className="ml-2">→</span>
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section with Hover Effects */}
      <motion.section 
        id="features"
        className="py-24 bg-muted/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-semibold text-center mb-16"
          >
            FEATURES
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
            variants={staggerContainer}
          >
            {[
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
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-8 bg-background/50 backdrop-blur-sm border border-border hover:border-gray-900 dark:hover:border-gray-100 transition-all duration-300"
              >
                <div className="flex flex-col items-center space-y-4">
                  <motion.div 
                    className="text-3xl font-light"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.kanji}
                  </motion.div>
                  <h3 className="text-xl font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-semibold text-center mb-16">PROCESS</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "選", title: "Select", description: "Choose your workspace" },
            { step: "設", title: "Set", description: "Configure your timer" },
            { step: "始", title: "Start", description: "Begin your focused work" },
            { step: "続", title: "Continue", description: "Track your progress" }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto border border-foreground/20 flex items-center justify-center">
                <span className="text-2xl font-light">{item.step}</span>
              </div>
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-24 bg-muted/50">
        <h2 className="text-3xl font-semibold text-center mb-16">PRICING</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              kanji: "入",
              plan: "Basic",
              price: "Free",
              features: ["Essential workspaces", "Basic timer", "Core sounds"]
            },
            {
              kanji: "進",
              plan: "Pro",
              price: "$12/month",
              features: ["All workspaces", "Advanced timer", "Full sound library", "Priority support"]
            },
            {
              kanji: "極",
              plan: "Ultimate",
              price: "$99/year",
              features: ["Everything in Pro", "Early access", "Custom sounds", "Personal onboarding"]
            }
          ].map((price, i) => (
            <div key={i} className="p-8 bg-background border border-border group hover:border-foreground/50 transition-colors">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto border border-foreground/20 flex items-center justify-center">
                  <span className="text-2xl font-light">{price.kanji}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium">{price.plan}</h3>
                  <p className="text-2xl font-light mt-2">{price.price}</p>
                </div>
                <ul className="space-y-4 text-muted-foreground">
                  {price.features.map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>
                <Button className="w-full rounded-none">Select Plan</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-semibold text-center mb-16">FAQ</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {[
            {
              q: "What makes Haruka different?",
              a: "Haruka combines minimalist design with powerful productivity tools, creating a serene digital environment for focused work."
            },
            {
              q: "Can I customize my workspace?",
              a: "Yes, each workspace can be tailored to your preferences, from ambient sounds to visual elements."
            },
            {
              q: "Is Haruka available offline?",
              a: "Yes, core features are available offline, ensuring your focus remains uninterrupted."
            }
          ].map((faq, i) => (
            <div key={i} className="p-6 bg-muted/50">
              <h3 className="text-lg font-medium mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-light mb-4">春</div>
              <p className="text-muted-foreground">Your space for focused creation</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Ambient Sounds</li>
                <li>Pomodoro Timer</li>
                <li>Task Management</li>
                <li>Virtual Spaces</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            <p>© 2024 Haruka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}