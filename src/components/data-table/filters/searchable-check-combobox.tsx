import { SearchableCheckCombobox, SearchableCheckComboboxContent, SearchableCheckComboboxItem, SearchableCheckComboboxTrigger, SearchableCheckComboboxValue } from "@/components/ui/searchable-check-combobox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { X } from "lucide-react";
import { useState } from "react";

interface SearchableCheckComboboxFilterProps {
  filter: {
    key: string;
    label: string;
    items: string[];
  }
  columnFilterValue: string[];
  handleFilterChange: (value: string[]) => void;
}

export function SearchableCheckComboboxFilter({ columnFilterValue, filter, handleFilterChange }: SearchableCheckComboboxFilterProps) {
  const [clean, setClean] = useState(false);

  function handleAddItemToFilter(item: string) {
    handleFilterChange([...columnFilterValue, item])
  }

  function handleRemoveItemFromFilter(item: string) {
    const filterValue = [...columnFilterValue];
    
    const itemIndex = filterValue.findIndex(value => value === item)
    
    filterValue.splice(itemIndex, 1);
    
    handleFilterChange(filterValue) 
  }
  
  function handleCheckChange(check: CheckedState, option: string) {
    if(check) {
      handleAddItemToFilter(option)
    }

    if(!check) {
      handleRemoveItemFromFilter(option)
    }
  } 

  function onClean() {
    setClean(false)
  }

  function handleClean() {
    handleFilterChange([])
    setClean(true)
  }

  return (
    <div className='flex items-center gap-x-3' key={filter.label}>
      <SearchableCheckCombobox stickyCheckeds clean={clean} onClean={onClean}>
        <SearchableCheckComboboxTrigger>
          <SearchableCheckComboboxValue className="flex-1" placeholder={`Filtrar por ${filter.label}...`} />
        </SearchableCheckComboboxTrigger>

        <SearchableCheckComboboxContent label={filter.label}>
          {
            filter.items.map(option => (
              <SearchableCheckComboboxItem onCheckedChange={check => handleCheckChange(check, option)} checked={!!columnFilterValue.find(value => value === option)} key={option}>
                {option}
              </SearchableCheckComboboxItem>
            ))
          }
        </SearchableCheckComboboxContent>
      </SearchableCheckCombobox>
        
      <button
        onClick={handleClean}
        className='w-fit disabled:opacity-60'
        disabled={columnFilterValue === undefined || columnFilterValue.length === 0}
      >
        <X />
      </button>
    </div>
  )
}