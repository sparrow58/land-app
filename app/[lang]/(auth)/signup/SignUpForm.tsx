"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateUser from "@/app/hooks/user/useCreateUser";

export interface SignUpProps {
  t: {
    name: string;
    enter_name: string;
    email: string;
    enter_email: string;
    password: string;
    enter_password: string;
    sign_up: string;
    errors: Errors;
    invalid_credentials: string;
  };
}

interface Errors {
  passwordComplex: string;
  password: string;
  name: string;
  email: string;
  nameShort: string;
  nameLong: string;
  validEmail: string;
}

const SignUpForm = ({ t }: SignUpProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(3, t.errors.nameShort).max(100, t.errors.nameLong),
    email: z.string().email(t.errors.validEmail),
    password: z
      .string()
      .min(4, t.errors.password)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&;'*])(?=.{5,})/,
        t.errors.passwordComplex
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { create, error: _signUpErrors } = useCreateUser({
    onSuccess: (result) => {
      console.log("userCreated", result);
      setIsLoading(false);
    },
    onFailure: (errors) => {
      console.log("error creating user", errors);
      setIsLoading(false);
      if (errors?.error?.field === "email") {
        form.setError("email", { message: errors.error.message });
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    create(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.name}</FormLabel>
              <FormControl>
                <Input placeholder={t.enter_name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.email}</FormLabel>
              <FormControl>
                <Input placeholder={t.enter_email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.password}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t.enter_password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : t.sign_up}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
