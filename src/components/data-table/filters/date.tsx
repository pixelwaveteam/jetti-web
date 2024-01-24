import { Calendar } from "@/components/ui/calendar"
import { FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
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
    <Popover key={filter.key}>
      <PopoverTrigger asChild>
        <FormItem>
          <Input
            placeholder={`Filtrar por ${filter.label}...`}
            value={dateToDisplay ?? ''}
            className="flex-1 min-w-[15rem]"
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
  )
}