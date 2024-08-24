"use client";

import { useSignIn } from "@/api/auth/use-signin";
import { useToast } from "@/hooks";
import useAuth from "@/hooks/use-auth";
import { SignInFormSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const SignInForm = () => {
  const { mutate: signIn } = useSignIn();
  const { isAuthenticated, onLogin } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignInFormSchema>) => {
    signIn(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (res) => {
          if (res.response) {
            onLogin(res.response);
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Something went wrong",
            });
          }
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.response?.data.message || "Something went wrong",
          });
        },
      },
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return !isAuthenticated ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign in
        </Button>
      </form>
      <p className="text-center text-xs text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-indigo-500 hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </Form>
  ) : null;
};

export default SignInForm;
