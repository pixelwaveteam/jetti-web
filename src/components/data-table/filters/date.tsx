import { Calendar } from "@/components/ui/calendar"
import { FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { X } from "lucide-react"
import { DateRange } from "react-day-picker"

interface DateFilterProps {
  filter: {
    key: string;
    label: string
  }
  columnFilterValue: unknown;
  handleFilterChange: (value: DateRange | undefined) => void;
}

export function DateFilter({ filter, columnFilterValue, handleFilterChange }: DateFilterProps) {
  const columnFilterDateRange = (columnFilterValue as DateRange) ?? ''

  const fromToDisplay = columnFilterDateRange.from && format(columnFilterDateRange.from, 'dd/MM/yyyy')

  const toToDisplay = columnFilterDateRange.to && format(columnFilterDateRange.to, 'dd/MM/yyyy')

  const dateToDisplay = (fromToDisplay && toToDisplay) ? 
      `${fromToDisplay} até ${toToDisplay}` 
    : fromToDisplay

  return (
    <div className='flex items-center gap-x-3' key={filter.key}>
      <Popover>
        <PopoverTrigger asChild>
          <FormItem
          className="flex-1 min-w-[15rem]">
            <Input
              placeholder={`Filtrar por ${filter.label}...`}
              value={dateToDisplay ?? ''}
              
              readOnly
            />
          </FormItem>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            locale={ptBR}
            mode='range'
            selected={(columnFilterValue as DateRange)}
            onSelect={(range) => handleFilterChange(range)}
            key={filter.key}
          />
        </PopoverContent>
      </Popover>
      <button
        onClick={() =>
          handleFilterChange(undefined)
        }
        className='w-fit disabled:opacity-60'
        disabled={columnFilterValue === undefined}
      >
        <X />
      </button>
    </div>
  )
}