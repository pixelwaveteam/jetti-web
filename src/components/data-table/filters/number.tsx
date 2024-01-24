import { Input } from "@/components/ui/input";

interface NumberFilterProps {
  filter: {
    key: string;
    label: string
  }
  columnFilterValue: unknown;
  handleFilterChange: (value: [number | undefined, number] | undefined) => void;
}

export function NumberFilter({ columnFilterValue, filter, handleFilterChange }: NumberFilterProps) {
  return (
    <Input
      placeholder={`Min de ${filter.label}...`}
      value={
        (columnFilterValue as [number, number])?.[0] ?? ''
      }
      onChange={(event) =>
        handleFilterChange([Number(event.target.value) > 0 ? Number(event.target.value) : undefined, Infinity])
      }
      className='max-w-[10rem]'
      name='search'
      key={filter.key}
    />
  )
}