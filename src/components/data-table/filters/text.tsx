import { Input } from "@/components/ui/input";

interface TextFilterProps {
  filter: {
    key: string;
    label: string
  }
  columnFilterValue: unknown;
  handleFilterChange: (value: string | undefined) => void;
}

export function TextFilter({ columnFilterValue, filter, handleFilterChange }: TextFilterProps) {
  return (
    <Input
      placeholder={`Filtrar por ${filter.label}...`}
      value={
        (columnFilterValue as string) ?? ''
      }
      onChange={(event) =>
        handleFilterChange(event.target.value)
      }
      className='max-w-sm'
      name='search'
      key={filter.key}
    />
  )
}