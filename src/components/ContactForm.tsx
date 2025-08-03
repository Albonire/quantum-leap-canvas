'use client';

import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xgvyqgbr');
  const { toast } = useToast();

  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: '¡Mensaje enviado!',
        description: 'Tu mensaje ha sido enviado correctamente. Te responderé pronto.',
      });
    }
    if (state.errors) {
        const formErrors = state.errors.getFormErrors();
        if (formErrors.length > 0) {
            toast({
                title: 'Error',
                description: 'Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo.',
                variant: 'destructive',
            });
        }
    }
  }, [state.succeeded, state.errors, toast]);


  if (state.succeeded) {
    return (
        <div className="bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-3 sm:p-4 md:p-6 flex flex-col h-[350px] sm:h-[400px] md:h-[500px] lg:h-[650px] shadow-lg items-center justify-center text-center">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-sage-accent dark:text-cyber-lime mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-space-grotesk font-bold text-sage-accent dark:text-cyber-lime mb-2">
                ¡Gracias por tu mensaje!
            </h3>
            <p className="text-gray-800 dark:text-quantum-silver font-medium text-xs sm:text-sm md:text-base px-2">
                Me pondré en contacto contigo pronto.
            </p>
      </div>
    );
  }

  return (
    <div className="bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-3 sm:p-4 md:p-6 flex flex-col h-[350px] sm:h-[400px] md:h-[500px] lg:h-[650px] shadow-lg">
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-space-grotesk font-bold text-sage-accent dark:text-cyber-lime mb-1 sm:mb-2">
          Envíame un mensaje
        </h3>
        <p className="text-gray-800 dark:text-quantum-silver font-medium text-xs sm:text-sm md:text-base leading-relaxed">
          ¿Tienes algún proyecto en mente? Me encantaría escuchar tus ideas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6 flex-1 flex flex-col">
        {/* Responsive grid for name and email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="name" className="text-gray-900 dark:text-quantum-silver font-medium text-xs sm:text-sm md:text-base">
              Nombre
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              className="bg-white/50 dark:bg-neural-gray/40 border-sage-accent/30 dark:border-cyber-lime/30 focus:border-sage-accent dark:focus:border-cyber-lime text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
              placeholder="Tu nombre completo"
            />
            <ValidationError 
              prefix="Name" 
              field="name"
              errors={state.errors}
              className="text-red-500 text-xs"
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="email" className="text-gray-900 dark:text-quantum-silver font-medium text-xs sm:text-sm md:text-base">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              className="bg-white/50 dark:bg-neural-gray/40 border-sage-accent/30 dark:border-cyber-lime/30 focus:border-sage-accent dark:focus:border-cyber-lime text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
              placeholder="tu@email.com"
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
              className="text-red-500 text-xs"
            />
          </div>
        </div>

        {/* Message textarea */}
        <div className="space-y-1 sm:space-y-2 flex-1 flex flex-col">
          <Label htmlFor="message" className="text-gray-900 dark:text-quantum-silver font-medium text-xs sm:text-sm md:text-base">
            Mensaje
          </Label>
          <Textarea
            id="message"
            name="message"
            className="bg-white/50 dark:bg-neural-gray/40 border-sage-accent/30 dark:border-cyber-lime/30 focus:border-sage-accent dark:focus:border-cyber-lime text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 text-xs sm:text-sm md:text-base flex-1 min-h-[60px] sm:min-h-[80px] md:min-h-[120px] resize-none"
            placeholder="Escribe tu mensaje aquí..."
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
            className="text-red-500 text-xs"
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          disabled={state.submitting}
          className="w-full bg-sage-accent hover:bg-sage-accent/90 dark:bg-cyber-lime dark:hover:bg-cyber-lime/90 text-white dark:text-void-black font-space-grotesk font-semibold py-2 sm:py-2.5 md:py-3 transition-all duration-300 hover:shadow-lg hover:shadow-sage-accent/25 dark:hover:shadow-cyber-lime/25 text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
        >
          {state.submitting ? (
            <>
              <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              <span className="hidden sm:inline">Enviando...</span>
              <span className="sm:hidden">Enviando</span>
            </>
          ) : (
            <>
              <Send className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Enviar Mensaje</span>
              <span className="sm:hidden">Enviar</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
