import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { Fab } from "../Fab";

interface ResponsiveFabProps extends ComponentPropsWithoutRef<"a"> {
  icon: ElementType;
  label?: ReactNode;
}

export const ResponsiveFab = forwardRef<HTMLAnchorElement, ResponsiveFabProps>(
  ({ icon, label, ...props }, ref) => (
    <>
      <div className="block md:hidden fixed right-4 bottom-4">
        <Fab ref={ref} icon={icon} {...props} />
      </div>

      <div className="hidden md:block fixed right-8 bottom-8">
        <Fab ref={ref} icon={icon} label={label} {...props} />
      </div>
    </>
  )
);

ResponsiveFab.displayName = "ResponsiveFab";
