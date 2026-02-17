import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

export const secondaryNavbarClassName =
  "hover:bg-gray-200 active:bg-gray-300 dark:border-gray-700 dark:hover:bg-gray-750 dark:active:bg-gray-700";

const buttonVariants = cva(
  "relative inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap font-sans text-base font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-orange-600 bg-primary text-primary-foreground hover:bg-orange-600 active:bg-orange-700 dark:hover:bg-orange-400 dark:active:bg-orange-300",
        secondary:
          "border border-gray-250 text-foreground hover:bg-gray-150 active:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-750 dark:active:bg-gray-700",
        muted:
          "border border-gray-150 bg-gray-150 text-foreground hover:border-gray-200 hover:bg-gray-200 active:border-gray-300 active:bg-gray-300 dark:border-gray-750 dark:bg-gray-750 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:active:border-gray-600 dark:active:bg-gray-600",
        ghost:
          "text-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700",
        input:
          "border border-input bg-card text-base font-normal! text-foreground focus:border-ring focus:outline-hidden focus:border-ring focus:ring-2 focus:ring-ring/15 focus:ring-offset-1 focus:ring-offset-background",
        link: "border border-transparent text-primary underline-offset-4 hover:underline",
        destructive:
          "border-red-600 bg-red-500 text-white hover:bg-red-600 active:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 dark:active:bg-red-300",
        destructiveSecondary:
          "border border-red-200 text-red-600 hover:bg-red-100 active:bg-red-200 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900 dark:active:bg-red-800",
        success:
          "border-green-600 bg-green-500 text-white hover:bg-green-600 active:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 dark:active:bg-green-300",
        successSecondary:
          "border border-green-200 text-green-600 hover:bg-green-100 active:bg-green-200 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900 dark:active:bg-green-800",
        warning:
          "border-yellow-600 bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:active:bg-yellow-300",
        warningSecondary:
          "border border-yellow-200 text-yellow-600 hover:bg-yellow-100 active:bg-yellow-200 dark:border-yellow-700 dark:text-yellow-300 dark:hover:bg-yellow-900 dark:active:bg-yellow-800",
        info: "border-blue-600 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 dark:active:bg-blue-300",
        infoSecondary:
          "border border-blue-200 text-blue-600 hover:bg-blue-100 active:bg-blue-200 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900 dark:active:bg-blue-800",
        magic:
          "bg-magic border-0 border-transparent text-primary-foreground shadow-[0px_0px_10px_0px_rgba(91,57,227,0.25)] hover:shadow-[0px_0px_12px_0px_rgba(91,57,227,0.35)] hover:opacity-90 active:opacity-80",
        magicSecondary:
          "border border-gray-300 text-magic bg-transparent hover:border-gray-400 active:border-gray-400 hover:shadow-[0px_0px_10px_0px_rgba(91,57,227,0.25)] dark:border-gray-700 dark:hover:border-gray-600 dark:active:border-gray-600",
        purple:
          "border-[#8B52F8]! bg-[#8B52F8]! text-white hover:bg-[#7A45E5]! active:bg-[#6A38D2]! dark:hover:bg-[#9D6FFA]! dark:active:bg-[#AE8CFB]!",
        blockPrimary:
          "shadow-page-primary-button border-page-primary-button bg-page-primary-button-background font-page-body! font-page-primary-button-weight text-page-primary-button-text backdrop-blur-page-primary-button hover:opacity-80",
        blockSecondary:
          "bg-page-secondary-button-background shadow-page-secondary-button border-page-secondary-button font-page-body! font-page-secondary-button-weight text-page-secondary-button-text backdrop-blur-page-secondary-button hover:opacity-80",
      },
      size: {
        lg: "h-[60px] rounded-[18px] px-4 text-lg",
        default: "h-[52px] rounded-[16px] px-4 py-2",
        sm: "h-[36px] rounded-[12px] px-3 text-sm",
        xs: "h-[30px] rounded-[8px] px-2 text-xs",
        icon: "h-10 w-10 rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, asChild = false, disabled, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    if (loading) {
      const { children, ...restProps } = props;

      return (
        <button
          className={cn(
            buttonVariants({ variant, size, className }),
            "cursor-wait",
          )}
          ref={ref}
          disabled={disabled}
          {...restProps}
        >
          <>
            <span
              data-testid="button-is-loading-children"
              className="invisible opacity-0"
            >
              {children}
            </span>

            <span
              className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2"
              data-testid="button-is-loading"
            >
              <Spinner size={20} strokeWidth={4} />
            </span>
          </>
        </button>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

const ButtonDiv = ({
  className,
  variant,
  size,
  loading,
  children,
  style,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <div
      className={cn("truncate", buttonVariants({ variant, size, className }), {
        "cursor-wait": loading,
        "pointer-events-none opacity-50": disabled,
      })}
      style={style}
      onClick={onClick as any}
    >
      {loading ? (
        <span
          data-testid="button-is-loading-children"
          className="invisible opacity-0"
        >
          {children}
        </span>
      ) : (
        children
      )}

      {loading && (
        <span
          className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2"
          data-testid="button-is-loading"
        >
          <Spinner size={20} strokeWidth={4} />
        </span>
      )}
    </div>
  );
};

export { Button, buttonVariants, ButtonDiv };
