"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-background"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className=" text-sm text-red-800">email is required</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              className="bg-background"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className=" text-sm text-red-800">
                password is required
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              className="bg-background"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <span className=" text-sm text-red-800">
                confirm password is required
              </span>
            )}
          </div>
          <Link href="/login">
            <Label className="cursor-pointer  hover:underline">
              already have an account?
            </Label>
          </Link>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>
          <Button type="button" variant="outline" className="w-full">
            <Chrome className="mr-2 h-4 w-4" />
            Sign up with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
