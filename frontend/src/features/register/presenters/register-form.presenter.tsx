import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useRegister, type RegisterSchema } from "../hooks/use-register.hook";

interface LoginFormProps {
  onSubmit: (data: RegisterSchema) => void;
  isLoading: boolean;
}

export const RegisterForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const methods = useRegister();

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-[300px] w-full"
      >
        <fieldset className="flex flex-col gap-4 w-full" disabled={isLoading}>
          <FormField
            name="name"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Insira seu nome"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Insira seu email"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="characterName"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Personagem</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Insira o nome do seu personagem"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Insira sua senha"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirmPassword"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Insira sua senha"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isLoading ? "Registrando..." : "Registrar"}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};
