import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalFormProps {
  textHeader?: string;
  textDescription?: string;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function ModalForm({
  textHeader,
  textDescription,
  open,
  onClose,
  onSuccess,
  children,
  footer,
  className,
}: ModalFormProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] ${className}`}>
        <DialogHeader>
          {textHeader && <DialogTitle>{textHeader}</DialogTitle>}
          {textDescription && (
            <DialogDescription>{textDescription}</DialogDescription>
          )}
        </DialogHeader>

        <div className="grid gap-4">{children}</div>

        {footer && <div className="pt-4">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
