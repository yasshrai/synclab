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
};

export default function Login() {
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
  };

  return (
    <Card className="mx-auto max-w-sm ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
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
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className=" text-sm text-red-800">
                password is required
              </span>
            )}
          </div>
          <Link href="/signup">
            <Label className="cursor-pointer  hover:underline">
              don&apos;t have an account?
            </Label>
          </Link>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button type="button" variant="outline" className="w-full">
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
