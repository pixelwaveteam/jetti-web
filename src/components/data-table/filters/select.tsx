import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface SelectFilterProps {
  filter: {
    key: string;
    label: string;
    options: {[label: string]: any};
  }
  columnFilterValue: unknown;
  handleFilterChange: (value: string | undefined) => void;
}

export function SelectFilter({ columnFilterValue, filter, handleFilterChange }: SelectFilterProps) {
  return (
    <div className='flex items-center gap-x-3' key={filter.key}>
      <Select
        value={ 
          (columnFilterValue as string) ?? ''
        }
        onValueChange={(event) =>
          handleFilterChange(event)
        }
      >
        <SelectTrigger className="flex-1 min-w-[15rem]">
          <SelectValue placeholder={`Filtrar por ${filter.label}...`} />
        </SelectTrigger>
        <SelectContent>
          {
            Object.keys(filter.options).map(label => (
              <SelectItem value={filter.options?.[label]} key={filter.options?.[label]}>
                {label}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
        
      <button
        onClick={() =>
          handleFilterChange('')
        }
        className='w-fit disabled:opacity-60'
        disabled={columnFilterValue === undefined}
      >
        <X />
      </button>
    </div>
  )
}