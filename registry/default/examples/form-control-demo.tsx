"use client";

import { FormControl } from "@/registry/default/ui/form-control";
import { Input } from "@/registry/default/ui/input";

export default function FormControlDemo() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      <FormControl
        name="email"
        label="Email"
        caption="We'll never share your email with anyone else."
      >
        <Input id="email" placeholder="Enter your email" type="email" />
      </FormControl>

      <FormControl
        name="username"
        label="Username"
        error="Username is already taken"
      >
        <Input id="username" placeholder="Enter a username" />
      </FormControl>

      <FormControl
        name="success"
        label="Password"
        success="Password strength: Strong"
      >
        <Input id="success" placeholder="Enter a password" type="password" />
      </FormControl>

      <FormControl name="warning" label="Password" warning="Password is weak">
        <Input id="warning" placeholder="Enter a password" type="password" />
      </FormControl>

      <FormControl
        name="loading"
        label="Username"
        loading="Checking availability..."
      >
        <Input id="loading" placeholder="Enter a username" />
      </FormControl>
    </div>
  );
}
