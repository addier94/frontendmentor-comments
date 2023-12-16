import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return ( 
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
        flex 
        justify-center 
        rounded-md 
        px-[1.36rem] 
        py-3 
        text-base 
        font-semibold 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        `,
        disabled && 'opacity-50 cursor-not-allowed hover:opacity-50',
        fullWidth && 'w-full',
        secondary && 'bg-neutral-grayish-blue hover:opacity-90 text-neutral-white',
        danger && 'bg-primary-soft-red text-neutral-white hover:opacity-90 focus-visible:outline-rose-600',
        !secondary && !danger && 'bg-primary-moderate-blue text-neutral-white hover:opacity-90 focus-visible:outline-sky-600'
      )}
    >
      {children}
    </button>
   );
}
 
export default Button;