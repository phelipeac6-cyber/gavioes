"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { supabase } from "@/integrations/supabase"

type SubSede = {
  id: string;
  name: string;
};

interface SubSedeComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SubSedeCombobox({ value, onChange }: SubSedeComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [subSedes, setSubSedes] = React.useState<SubSede[]>([]);

  React.useEffect(() => {
    const fetchSubSedes = async () => {
      const { data, error } = await supabase.from('sub_sedes').select('id, name');
      if (error) {
        console.error('Error fetching sub-sedes:', error);
      } else {
        setSubSedes(data);
      }
    };
    fetchSubSedes();
  }, []);

  const selectedSubSede = subSedes.find(
    (sede) => sede.name.toLowerCase() === value.toLowerCase()
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-2 border-[#1800AD] text-[#1800AD] hover:bg-[#1800AD]/10 hover:text-[#1800AD]"
        >
          {value
            ? selectedSubSede?.name
            : "Selecione a sub-sede..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Buscar sub-sede..." />
          <CommandEmpty>Nenhuma sub-sede encontrada.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {subSedes.map((sede) => (
                <CommandItem
                  key={sede.id}
                  value={sede.name}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.toLowerCase() === sede.name.toLowerCase() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {sede.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}