"use client";

import { useSignUp } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks";
import useAuth from "@/hooks/use-auth";
import { SignUpFormSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

const SignUpForm = () => {
  const { mutate: signUp } = useSignUp();
  const { isLoading, isAuthenticated, onSignup } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpFormSchema>) => {
    signUp(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => onSignup(),
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
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/");
      }
    }
  }, [isLoading, isAuthenticated, router]);

  return !isAuthenticated ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Wick" {...field} />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input placeholder="Re-Enter your password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign up
        </Button>
        <p className="mt-6 text-xs text-gray-600 text-center">
          By signing up, you agree to our
          <Link href="#" className="border-b border-gray-500 border-dotted mx-1">
            Terms of Service
          </Link>
          and its
          <Link href="#" className="border-b border-gray-500 border-dotted mx-1">
            Privacy Policy
          </Link>
        </p>
      </form>
      <p className="text-center text-xs text-gray-600 mt-2">
        If you already have an account, please&nbsp;
        <Link className="text-primary hover:underline" href="/sign-in">
          Sign in
        </Link>
      </p>
    </Form>
  ) : null;
};

export default SignUpForm;
