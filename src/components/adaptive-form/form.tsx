import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";

/**
 * AForm
 * A reusable dialog component using shadcn/ui Dialog and framer-motion for animation
 * - Perfectly centered
 * - Gradient overlay
 * - Slide from bottom to center animation
 * - Reusable and clean
 */
interface AFormProps {
  trigger?: ReactNode;
  children?: ReactNode | ((args: { onCancel: () => void }) => ReactNode);
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  [key: string]: any;
}

export default function AForm({
  trigger,
  children,
  open,
  onOpenChange,
  className = "",
  ...props
}: AFormProps) {
  // Internal open state if not controlled
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === "boolean";
  const dialogOpen = isControlled ? open : internalOpen;
  const handleOpenChange = (value: boolean) => {
    if (isControlled && onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  return (
    <>
      {/* Dialog Trigger */}
      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {trigger || <Button variant="outline">Open Dialog</Button>}
        </DialogTrigger>
        {/* Gradient Overlay with AnimatePresence for smooth fade */}
        <AnimatePresence>
          {dialogOpen && (
            <motion.div
              key="dialog-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-40 bg-gradient-to-t from-black/50 to-white/10"
              onClick={() => handleOpenChange(false)}
            />
          )}
        </AnimatePresence>
        {/* Centered Dialog Content with slide-in animation */}
        <AnimatePresence>
          {dialogOpen && (
            <DialogContent asChild>
              <motion.div
                key="dialog-content"
                initial={{ opacity: 0, y: 96 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 96 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 ${className}`}
                {...props}
              >
                <div>
                  {/* Pass onCancel to children if it's a function */}
                  {typeof children === "function"
                    ? children({ onCancel: () => handleOpenChange(false) })
                    : children}
                </div>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
}