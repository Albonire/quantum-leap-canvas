
import { useContactForm } from "@/hooks/use-contact-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CyberButton from "./CyberButton";

const ContactForm = () => {
  const { form, onSubmit, isSubmitting } = useContactForm();

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <div className="bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-6 flex flex-col h-[650px] shadow-lg">
      <h3 className="text-2xl font-space-grotesk font-bold text-gray-900 dark:text-quantum-silver mb-6 text-center">
        Envíame un mensaje
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1 flex flex-col">
          <div className="flex-1 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-quantum-silver font-space-grotesk font-semibold">
                    Nombre
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tu nombre completo"
                      className="w-full bg-white/80 dark:bg-neural-gray/50 border-2 border-sage-accent dark:border-cyber-lime/30 rounded-lg px-4 py-3 text-gray-900 dark:text-quantum-silver focus:border-sage-accent dark:focus:border-cyber-lime focus:outline-none focus:ring-2 focus:ring-sage-accent/20 dark:focus:ring-cyber-lime/20 transition-all duration-300 font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-quantum-silver font-space-grotesk font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full bg-white/80 dark:bg-neural-gray/50 border-2 border-sage-accent dark:border-cyber-lime/30 rounded-lg px-4 py-3 text-gray-900 dark:text-quantum-silver focus:border-sage-accent dark:focus:border-cyber-lime focus:outline-none focus:ring-2 focus:ring-sage-accent/20 dark:focus:ring-cyber-lime/20 transition-all duration-300 font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col">
                  <FormLabel className="text-gray-900 dark:text-quantum-silver font-space-grotesk font-semibold">
                    Mensaje
                  </FormLabel>
                  <FormControl className="flex-1">
                    <Textarea
                      placeholder="Describe tu proyecto o idea..."
                      className="flex-1 min-h-[120px] w-full bg-white/80 dark:bg-neural-gray/50 border-2 border-sage-accent dark:border-cyber-lime/30 rounded-lg px-4 py-3 text-gray-900 dark:text-quantum-silver focus:border-sage-accent dark:focus:border-cyber-lime focus:outline-none focus:ring-2 focus:ring-sage-accent/20 dark:focus:ring-cyber-lime/20 transition-all duration-300 resize-none font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 space-y-4">
            <CyberButton
              size="lg"
              disabled={isSubmitting}
              className="w-full"
              onClick={() => form.handleSubmit(handleSubmit)()}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-pulse">Enviando...</span>
                  <div className="w-4 h-4 border-2 border-void-black border-t-transparent rounded-full animate-spin ml-2" />
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </CyberButton>

            {/* Contact info below the button */}
            <div className="bg-sage-accent/15 dark:bg-neural-gray/30 border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-4 text-center mb-4 backdrop-blur-sm">
              <p className="text-gray-800 dark:text-quantum-silver text-sm mb-2 font-medium">O contáctame directamente:</p>
              <p className="text-sage-accent dark:text-cyber-lime text-sm font-mono mb-1 font-semibold">anderson.gonzalez.dev@gmail.com</p>
              <p className="text-gray-700 dark:text-quantum-silver text-xs">Respondo usualmente en 24 horas</p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
