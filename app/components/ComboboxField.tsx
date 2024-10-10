"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useField } from "formik";
import { FieldProps } from "../Props/CommonProps";
type Props = FieldProps & {
  options: { label: string; value: string }[];
  showSearch?: boolean;
};
const ComboBoxField = ({ options, placeholder, name, showSearch }: Props) => {
  const [field, meta] = useField(name);

  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {field.value
            ? options.find((option) => option.value === field.value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {showSearch && (
            <>
              <CommandInput placeholder="Search..." className="h-9" />
              <CommandEmpty>No items found.</CommandEmpty>
            </>
          )}

          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                //value={option.value}
                {...field}
                onSelect={(currentValue) => {
                  // setValue(currentValue === value ? "" : currentValue);
                  // onValueChanged(currentValue);
                  field.value = currentValue;
                  setOpen(false);
                }}
              >
                {option.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    field.value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBoxField;
