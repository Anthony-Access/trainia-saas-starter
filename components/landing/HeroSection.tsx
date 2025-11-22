"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div >

  <div className="container relative z-10 mx-auto px-4 md:px-6">
    <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
      <div className="w-3 h-3 rounded-full bg-green-500/50" />
    </div>
    <div className="ml-4 h-2 w-32 rounded-full bg-white/10" />
  </div>

{/* Mockup Content */ }
<div className="p-6 grid grid-cols-12 gap-6 h-[400px] md:h-[600px] bg-gradient-to-b from-background/50 to-background">
  {/* Sidebar */}
  <div className="hidden md:block col-span-2 space-y-4">
    <div className="h-8 w-full rounded-lg bg-white/5" />
    <div className="h-4 w-3/4 rounded bg-white/5" />
    <div className="h-4 w-1/2 rounded bg-white/5" />
    <div className="h-4 w-2/3 rounded bg-white/5" />
  </div>

  {/* Main Content */}
  <div className="col-span-12 md:col-span-10 space-y-6">
    <div className="flex justify-between items-center">
      <div className="h-8 w-1/3 rounded-lg bg-white/10" />
      <div className="h-8 w-24 rounded-lg bg-primary/20" />
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-4">
        <div className="h-8 w-8 rounded-full bg-primary/20 mb-4" />
        <div className="h-4 w-1/2 rounded bg-white/10" />
      </div>
      <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-4">
        <div className="h-8 w-8 rounded-full bg-blue-500/20 mb-4" />
        <div className="h-4 w-1/2 rounded bg-white/10" />
      </div>
      <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-4">
        <div className="h-8 w-8 rounded-full bg-green-500/20 mb-4" />
        <div className="h-4 w-1/2 rounded bg-white/10" />
      </div>
    </div>

    <div className="h-64 rounded-xl bg-white/5 border border-white/5 p-4 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-500/5" />
      <div className="text-muted-foreground/50">Analyse en cours...</div>
    </div>
  </div>
</div>
    </div >

  {/* Glow Effect behind mockup */ }
  < div className = "absolute -inset-4 bg-gradient-to-r from-primary to-blue-600 rounded-xl blur-3xl opacity-20 -z-10" />
        </motion.div >
      </div >
    </section >
  );
}