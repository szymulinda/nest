import type { ToasterProps } from "sonner";

export const toastOptions: ToasterProps["toastOptions"] = {
  style: {
    padding: "24px 28px",
    borderRadius: "24px",
    fontSize: "16px",
    fontWeight: "800",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    border: "1px solid #f1f5f9",
    fontFamily: "inherit",
  },
  classNames: {
    toast: "bg-white text-slate-900",
    success: "bg-green-50 text-green-700 border-green-100",
    error: "bg-red-50 text-red-700 border-red-100",
    info: "bg-blue-50 text-blue-700 border-blue-100",
    warning: "bg-orange-50 text-orange-700 border-orange-100",
  },
};
