'use client'

import { CheckboxProps } from "@radix-ui/react-checkbox";
import { PopoverContentProps, PopoverProps, PopoverTriggerProps } from "@radix-ui/react-popover";
import React, { ChangeEvent, InputHTMLAttributes, createContext, useContext, useEffect, useMemo, useState } from "react";
import { Checkbox } from "./checkbox";
import { FormItem } from "./form";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface SearchableCheckComboboxContextValue {
  items: string[];
  originalItems: string[];
  addItemToOriginalItems: (item: string) => void;
  itemsQuery: string;
  queryItems: (query: string) => void;
  isItemsQueryEmpty: boolean;
  checkedItems: string[];
  addItemToCheckedItems: (item: string) => void;
  removeItemFromCheckedItems: (item: string) => void;
}

const searchableCheckComboboxContext = createContext<SearchableCheckComboboxContextValue>({} as SearchableCheckComboboxContextValue);

function useSearchableCheckCombobox() {
  const context = useContext(searchableCheckComboboxContext);

  if (!context) {
    throw new Error('useSearchableCheckCombobox should be used within <SearchableCheckCombobox>');
  }

  return (context)
}

interface SearchableCheckComboboxProps extends Omit<PopoverProps, 'onOpenChange' | 'open'> {
  stickyCheckeds?: boolean;
  clean: boolean;
  onClean: () => void;
}

function SearchableCheckCombobox({ children, stickyCheckeds = false, clean, onClean,...props }: SearchableCheckComboboxProps) {
  const [itemsQuery, setItemsQuery] = useState('');
  const [originalItems, setOriginalItems] = useState<string[]>([]);
  const [checkedItems, setCheckedItem] = useState<string[]>([])
  const [isOpen, setIsOpen]= useState(false);

  const isItemsQueryEmpty = useMemo(() => itemsQuery.length === 0, [itemsQuery.length])

  const items = useMemo(() => {
      const filteredItems = originalItems.filter(item => item.toLocaleLowerCase().includes(itemsQuery.toLocaleLowerCase()))

      return stickyCheckeds ? [...checkedItems, ...filteredItems] : filteredItems
    },
    [itemsQuery, originalItems, checkedItems, stickyCheckeds]
  )

  function addItemToCheckedItems(item: string) {
    setCheckedItem(state => [item, ...state])
  }

  function removeItemFromCheckedItems(item: string) {
    setCheckedItem(state => state.filter(checkedItem => checkedItem !== item))
  }

  function queryItems(query: string) {
    setItemsQuery(query)
  }

  function addItemToOriginalItems(item: string) {
    setOriginalItems(state => [...state, item])
  }

  useEffect(() => {
    if(!isOpen) {
      setItemsQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    if(clean) {
      setCheckedItem([])
      onClean();
    }
  }, [clean, onClean])

  return (
    <searchableCheckComboboxContext.Provider value={{
      addItemToOriginalItems,
      isItemsQueryEmpty,
      items,
      itemsQuery,
      originalItems,
      queryItems,
      addItemToCheckedItems,
      checkedItems,
      removeItemFromCheckedItems
    }}>
      <Popover onOpenChange={setIsOpen} open={isOpen} {...props}>
        {children}
      </Popover>
    </searchableCheckComboboxContext.Provider>
  )
}

function SearchableCheckComboboxTrigger({ children, ...props }: PopoverTriggerProps) {
  return (
    <PopoverTrigger {...props}>
      {children}
    </PopoverTrigger>
  )
}

function SearchableCheckComboboxValue({ placeholder, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const { checkedItems } = useSearchableCheckCombobox();

  const displayValue = checkedItems.length > 0 ? checkedItems.join(', ') : '';

  return (
    <Input readOnly value={displayValue} placeholder={placeholder} {...props} />
  )
}

interface SearchableCheckComboboxContentProps extends PopoverContentProps {
  label: string;
}

function SearchableCheckComboboxContent({children, label, ...props}: SearchableCheckComboboxContentProps) {
  const { queryItems, itemsQuery } = useSearchableCheckCombobox()

  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    queryItems(e.target.value)
  }

  return (
    <PopoverContent {...props}>
      <FormItem className="mb-2">
        <Input autoComplete='off' placeholder={`Pesquisar ${label}`} onChange={handleQueryChange} value={itemsQuery} />
      </FormItem>

      <div className="flex flex-col w-full gap-y-1">
        {children}
      </div>
    </PopoverContent>
  )
}

interface SearchableCheckComboboxItemProps extends CheckboxProps {
  children: string;
}

function SearchableCheckComboboxItem({ children, onCheckedChange, checked,...props }: SearchableCheckComboboxItemProps) {
  const { items, isItemsQueryEmpty, addItemToOriginalItems, originalItems, addItemToCheckedItems, removeItemFromCheckedItems } = useSearchableCheckCombobox()

  const id = React.useId();

  function handleCheck(check: boolean) {
    if(onCheckedChange) {
      onCheckedChange(check)
    }
    
    if(check) {
      addItemToCheckedItems(children)
      return
    }
  
    if(!check) {
      removeItemFromCheckedItems(children)
      return
    }
  }

  useEffect(() => {
    if(!originalItems.includes(children)) {
      addItemToOriginalItems(children)
    }
  }, [addItemToOriginalItems, originalItems, children])

  if(isItemsQueryEmpty || items.includes(children)) {
    return (
      <label htmlFor={id} className="flex items-center justify-between w-full cursor-pointer select-none rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        {children}

        <Checkbox id={id} {...props} onCheckedChange={handleCheck} checked={checked} />
      </label>
    )
  }

  return undefined;
}

export {
  SearchableCheckCombobox, SearchableCheckComboboxContent, SearchableCheckComboboxItem, SearchableCheckComboboxTrigger, SearchableCheckComboboxValue
};

