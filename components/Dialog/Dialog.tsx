import { ComponentPropsWithoutRef, useEffect } from "react";

interface DialogProps extends ComponentPropsWithoutRef<"div"> {
  open: boolean;
  onClose?: () => void;
}

export const Dialog = ({ open, children, onClose, ...props }: DialogProps) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", listener);
    }

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [open, onClose]);

  return open ? (
    <div
      role="presentation"
      className="fixed left-0 right-0 top-0 bottom-0 bg-black/50 flex justify-center items-center z-20"
      onClick={onClose}
    >
      <div
        role="dialog"
        className="bg-white dark:bg-slate-800 rounded-2xl m-8 max-w-screen-sm shadow-2xl"
        onClick={(event) => {
          event.stopPropagation();
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  ) : null;
};

interface DialogTitleProps extends ComponentPropsWithoutRef<"h2"> {}

export const DialogTitle = ({ children, ...props }: DialogTitleProps) => (
  <h2
    className="p-4 font-sans font-medium text-xl text-slate-900 dark:text-white"
    {...props}
  >
    {children}
  </h2>
);

interface DialogContentProps extends ComponentPropsWithoutRef<"div"> {}

export const DialogContent = (props: DialogContentProps) => (
  <div className="px-4 pb-4" {...props} />
);

interface DialogContentTextProps extends ComponentPropsWithoutRef<"p"> {}

export const DialogContentText = (props: DialogContentTextProps) => (
  <p
    className="font-sans text-slate-500 dark:text-slate-300 text-base font-normal"
    {...props}
  />
);

interface DialogActionsProps extends ComponentPropsWithoutRef<"div"> {}

export const DialogActions = (props: DialogActionsProps) => (
  <div className="p-2 flex justify-end items-center space-x-2" {...props} />
);
