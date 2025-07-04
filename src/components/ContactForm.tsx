
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/contact-form-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xgvyqgbr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: '¡Mensaje enviado!',
          description: 'Tu mensaje ha sido enviado correctamente. Te responderé pronto.',
        });
        reset();
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-900 dark:text-quantum-silver font-medium">
              Nombre
            </Label>
            <Input
              id="name"
              {...register('name')}
              className="bg-white/20 dark:bg-neural-gray/20 border-sage-accent/30 dark:border-cyber-lime/30 focus:border-sage-accent dark:focus:border-cyber-lime text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
              placeholder="Tu nombre completo"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 dark:text-quantum-silver font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="bg-white/20 dark:bg-neural-gray/20 border-sage-accent/30 dark:border-cyber-lime/30 focus:border-sage-accent dark:focus:border-cyber-lime text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-900 dark:text-quantum-silver font-medium">
            Mensaje
          </Label>
          <Textarea
            id="message"
            {...register('message')}
            className="bg-white/20 dark:bg-neural-gray/20 border-sage-accent/30 dark:border-cyber-lime/30 focus:border-sage-accent dark:focus:border-cyber-lime min-h-[120px] text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
            placeholder="Escribe tu mensaje aquí..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <Button
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-sage-accent hover:bg-sage-accent/90 dark:bg-cyber-lime dark:hover:bg-cyber-lime/90 text-white dark:text-void-black font-space-grotesk font-semibold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-sage-accent/25 dark:hover:shadow-cyber-lime/25"
        >
          {isSubmitting ? (
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
      </form>
    </div>
  );
}
