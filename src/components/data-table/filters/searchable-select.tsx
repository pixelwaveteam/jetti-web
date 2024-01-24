import { SearchableSelect, SearchableSelectContent, SearchableSelectItem, SearchableSelectTrigger, SearchableSelectValue } from "@/components/ui/searchable-select";
import { X } from "lucide-react";

interface SearchableSelectFilterBase {
  options: {[label: string]: any};
  dependency?: string;
}

interface SearchableDependentSelectFilter {
  options: {
    [dependency: string]: {
      [label: string]: any
    } | string[]
  };
  dependency: string;
}

interface SearchableSelectFilterProps {
  filter: {
    key: string;
    label: string;
  } & (SearchableSelectFilterBase | SearchableDependentSelectFilter)
  columnFilterValue: unknown;
  handleFilterChange: (value: string | undefined) => void;
  dependencyTableFilterValue: string | undefined;
}

export function SearchableSelectFilter({ columnFilterValue, filter, handleFilterChange, dependencyTableFilterValue }: SearchableSelectFilterProps) {
  const disableSelect = filter.dependency ? !dependencyTableFilterValue : false;

  const filterOptionsRetrievedByDependency = (dependencyTableFilterValue && filter.options[dependencyTableFilterValue]) || undefined;

  if(filter.dependency && !dependencyTableFilterValue && columnFilterValue) {
    handleFilterChange(undefined)
  }

  return (
    <div className='flex items-center gap-x-3' key={filter.key}>
      <SearchableSelect
        value={ 
          (columnFilterValue as string) ?? ''
        }
        onValueChange={(event) =>
          handleFilterChange(event)
        }
        disabled={disableSelect}
      >
        <SearchableSelectTrigger>
          <SearchableSelectValue placeholder={`Filtrar por ${filter.label}...`} />
        </SearchableSelectTrigger>

        <SearchableSelectContent label={filter.label}>
          {
            filterOptionsRetrievedByDependency ? (
              <>
                {
                  filterOptionsRetrievedByDependency instanceof Array ? 
                    filterOptionsRetrievedByDependency.map(label => (
                      <SearchableSelectItem textValue={label} value={label} key={label}>
                        {label}
                      </SearchableSelectItem>
                    )) : 
                    Object.keys(filterOptionsRetrievedByDependency).map((label: string) => (
                      <SearchableSelectItem textValue={label} value={filter.options?.[label]} key={label}>
                        {label}
                      </SearchableSelectItem>
                    ))
                }
              </>
            ) : (
              <>
                {
                  Object.keys(filter.options).map(label => (
                    <SearchableSelectItem textValue={label} value={filter.options?.[label]} key={label}>
                      {label}
                    </SearchableSelectItem>
                  ))
                }
              </>
            )
          }
        </SearchableSelectContent>
      </SearchableSelect>

      <button
        onClick={() =>
          handleFilterChange('')
        }
        className='w-fit aria-[hidden="true"]:invisible'
        aria-hidden={columnFilterValue === undefined}
      >
        <X />
      </button>
    </div>
  )
}