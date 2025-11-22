"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    content:
      "Memo-IA a transformé notre façon de répondre aux appels d'offres. Nous avons gagné 3 marchés le premier mois.",
    author: "Sophie Martin",
    role: "Directrice Commerciale",
    company: "TechSolutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
  },
  {
    content:
      "L'analyse automatique du DCE est bluffante. On ne rate plus aucun détail technique.",
    author: "Thomas Dubois",
    role: "Chef de Projet",
    company: "BuildCorp",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    content:
      "Un gain de temps phénoménal. Ce qui prenait 2 jours nous prend maintenant 2 heures.",
    author: "Marie Leroy",
    role: "CEO",
    company: "InnovAgency",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
  },
  {
    content:
      "La qualité rédactionnelle est impressionnante. C'est comme avoir un expert senior disponible 24/7.",
    author: "Lucas Bernard",
    role: "Responsable Offres",
    company: "EnerGroup",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    content:
      "L'interface est intuitive et le support est très réactif. Un outil indispensable pour notre croissance.",
    author: "Camille Petit",
    role: "Directrice Marketing",
    company: "ComDigitale",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
        >
          Ils nous font <span className="text-primary">confiance</span>
        </motion.h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez comment Memo-IA aide les entreprises à remporter plus de marchés.
        </p>
      </div>

      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Marquee Container */}
      <div className="flex overflow-hidden select-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-8 min-w-full pr-8"
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[350px] md:w-[450px] p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground/90 italic">
                &quot;{testimonial.content}&quot;
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
