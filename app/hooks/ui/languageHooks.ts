import { getCurrentLanguage, toggleLanguage } from "@/app/helpers/urlHelpers";
import { usePathname } from "next/navigation";

export function useCurrentLanguage() {
  const relativePath = usePathname();

  return getCurrentLanguage(relativePath);
}
export function useToggleLanguage() {
  const relativePath = usePathname();
  return toggleLanguage(relativePath);
}
