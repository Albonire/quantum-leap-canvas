
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/contact-form-schema";
import { toast } from "sonner";

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log("📧 Enviando formulario de contacto:", data);
      
      // Aquí es donde implementarías el envío real
      // Por ejemplo, llamada a una API o servicio de email
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Para la demo, simulo el envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulo una respuesta exitosa
      toast.success("¡Mensaje enviado exitosamente!", {
        description: `Gracias ${data.name}, responderé pronto a tu mensaje.`,
      });
      
      form.reset();
      return { success: true, data };
      
    } catch (error) {
      console.error("Error enviando formulario:", error);
      
      toast.error("Error al enviar el mensaje", {
        description: "Por favor intenta nuevamente o contáctame directamente por email.",
      });
      
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
  };
};
