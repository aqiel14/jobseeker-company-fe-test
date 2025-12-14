"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User, UserFormValues } from "@/types/user";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { userSchema } from "@/schemas/userSchema";
import { useRouter } from "next/navigation";

interface UserFormProps {
  user?: User;
  onSubmit: SubmitHandler<UserFormValues>;
}

export function UserForm({ user, onSubmit }: UserFormProps) {
  const router = useRouter();
  const isEdit = Boolean(user);

  const form = useForm<UserFormValues>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: user?.name ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
      companyName: user?.company?.name ?? "",
      phone: user?.phone ?? "",
    },
  });

  const handleSubmit: SubmitHandler<UserFormValues> = async (values) => {
    await onSubmit(values);
    form.reset();
    router.push("/users");
  };

  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup className="space-y-4">
          {/* Name */}
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input placeholder="John Doe" {...form.register("name")} />
            {form.formState.errors.name && (
              <FieldDescription className="text-red-500">
                {form.formState.errors.name.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel>Username</FieldLabel>
            <Input placeholder="johndoe" {...form.register("username")} />
            {form.formState.errors.username && (
              <FieldDescription className="text-red-500">
                {form.formState.errors.username.message}
              </FieldDescription>
            )}
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              placeholder="john@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <FieldDescription className="text-red-500">
                {form.formState.errors.email.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel>Phone</FieldLabel>
            <Input
              type="tel"
              placeholder="+6281234567890"
              {...form.register("phone")}
            />
            {form.formState.errors.phone && (
              <FieldDescription className="text-red-500">
                {form.formState.errors.phone.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel>Company Name</FieldLabel>
            <Input placeholder="johndoe" {...form.register("companyName")} />
            {form.formState.errors.companyName && (
              <FieldDescription className="text-red-500">
                {form.formState.errors.companyName.message}
              </FieldDescription>
            )}
          </Field>

          {/* Submit */}
          <Field orientation={"horizontal"}>
            <Button type="submit">
              {isEdit ? "Update User" : "Create User"}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
