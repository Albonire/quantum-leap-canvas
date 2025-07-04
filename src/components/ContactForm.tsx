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
        <div className="bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-6 flex flex-col h-[650px] shadow-lg items-center justify-center text-center">
            <CheckCircle className="w-16 h-16 text-sage-accent dark:text-cyber-lime mb-4" />
            <h3 className="text-2xl font-space-grotesk font-bold text-sage-accent dark:text-cyber-lime mb-2">
                ¡Gracias por tu mensaje!
            </h3>
            <p className="text-gray-800 dark:text-quantum-silver font-medium">
                Me pondré en contacto contigo pronto.
            </p>
      </div>
    );
  }

  return (
    <div className="bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-6 flex flex-col h-[650px] shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-space-grotesk font-bold text-sage-accent dark:text-cyber-lime mb-2">
          Envíame un mensaje
        </h3>
        <p className="text-gray-800 dark:text-quantum-silver font-medium">
          ¿Tienes algún proyecto en mente? Me encantaría escuchar tus ideas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-900 dark:text-quantum-silver font-medium">
              Nombre
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              className="bg-white/50 dark:bg-neural-gray/40 border-sage-accent/30 dark:border-cyber-lime/30 focus:border-sage-accent dark:focus:border-cyber-lime text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
              placeholder="Tu nombre completo"
            />
            <ValidationError 
              prefix="Name" 
              field="name"
              errors={state.errors}
              className="text-red-500 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 dark:text-quantum-silver font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              className="bg-white/50 dark:bg-neural-gray/40 border-sage-accent/30 dark:border-cyber-lime/30 focus:border-sage-accent dark:focus:border-cyber-lime text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
              placeholder="tu@email.com"
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
              className="text-red-500 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-900 dark:text-quantum-silver font-medium">
            Mensaje
          </Label>
          <Textarea
            id="message"
            name="message"
            className="bg-white/50 dark:bg-neural-gray/40 border-sage-accent/30 dark:border-cyber-lime/30 focus:border-sage-accent dark:focus:border-cyber-lime min-h-[120px] text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
            placeholder="Escribe tu mensaje aquí..."
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
            className="text-red-500 text-sm"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={state.submitting}
          className="w-full bg-sage-accent hover:bg-sage-accent/90 dark:bg-cyber-lime dark:hover:bg-cyber-lime/90 text-white dark:text-void-black font-space-grotesk font-semibold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-sage-accent/25 dark:hover:shadow-cyber-lime/25"
        >
          {state.submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Enviar mensaje
            </>
          )}
        </Button>
        <p className="text-center text-sm text-gray-700 dark:text-quantum-silver/80 font-medium pt-4">
          O si prefieres, contáctame directamente a mi email:{" "}
          <a
            href="mailto:fabianagcris@gmail.com"
            className="text-sage-accent dark:text-cyber-lime hover:underline font-semibold"
          >
            fabianagcris@gmail.com
          </a>
        </p>
      </form>
    </div>
  );
}
