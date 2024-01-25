'use client'

import { cn } from "@/utils/style";
import * as SelectPrimitive from "@radix-ui/react-select";
import React, { ChangeEvent, ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { FormItem } from "./form";
import { Input } from "./input";
import { Select, SelectItem, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger } from "./select";

const SearchableSelectValue = SelectPrimitive.Value;

const SearchableSelectTrigger = SelectTrigger;

interface SearchableSelectContextValue {
  items: string[];
  originalItems: string[];
  addItemToOriginalItems: (item: string) => void;
  itemsQuery: string;
  queryItems: (query: string) => void;
  isItemsQueryEmpty: boolean;
} 

const searchableSelectContext = createContext<SearchableSelectContextValue>({} as SearchableSelectContextValue)

function useSearchableSelect() {
  const context = useContext(searchableSelectContext);

  if (!context) {
    throw new Error('useSearchableSelect should be used within <SearchableSelect>');
  }
  
  return context
}

interface SearchableSelectProps extends SelectPrimitive.SelectProps {
  children: ReactNode;
  placeholder?: string;
}

function SearchableSelect({children, ...props}: SearchableSelectProps) {
  const [itemsQuery, setItemsQuery] = useState('');
  const [originalItems, setOriginalItems] = useState<string[]>([]);
  const [isOpen, setIsOpen]= useState(false);

  const isItemsQueryEmpty = useMemo(() => itemsQuery.length === 0, [itemsQuery.length])

  const items = useMemo(() => 
    originalItems.filter(item => item.toLocaleLowerCase().includes(itemsQuery.toLocaleLowerCase())), 
    [itemsQuery, originalItems]
  )

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

  return (
    <searchableSelectContext.Provider value={{
      items,
      itemsQuery,
      originalItems,
      queryItems,
      isItemsQueryEmpty,
      addItemToOriginalItems,
    }}>
      <Select {...props} onOpenChange={() => setIsOpen(state => !state)} open={isOpen}>
        {children}
      </Select>
    </searchableSelectContext.Provider>
  )
}


interface SearchableSelectContentProps extends SelectPrimitive.SelectContentProps {
  label: string;
}

const SearchableSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SearchableSelectContentProps
>(({ className, children, position = 'popper', label,...props }, ref) => {
  const { queryItems, itemsQuery } = useSearchableSelect();

  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    queryItems(e.target.value)
  }

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'relative py-3 px-2 z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        
        {...props}
      >
        <FormItem className="mb-2">
          <Input autoComplete='off' placeholder={`Pesquisar ${label}`} onChange={handleQueryChange} value={itemsQuery} />
        </FormItem>

        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
        autoFocus={false}
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
SearchableSelectContent.displayName = "SearchableSelectContent"

type SearchableSelectItemProps = Omit<SelectPrimitive.SelectItemProps, 'textValue'> & {
  textValue: string;
} 
function SearchableSelectItem({children,...props}: SearchableSelectItemProps) {
  const { items, isItemsQueryEmpty, addItemToOriginalItems, originalItems } = useSearchableSelect()
  
  const { textValue } = props;

  useEffect(() => {
    if(!originalItems.includes(textValue)) {
      addItemToOriginalItems(textValue)
    }
  }, [addItemToOriginalItems, textValue, originalItems])

  if(isItemsQueryEmpty || items.includes(textValue)) {
    return (
      <SelectItem {...props} autoFocus={false}>
        {children}
      </SelectItem>
    )
  }

  return undefined;
} 

export {
  SearchableSelect, SearchableSelectContent,
  SearchableSelectItem, SearchableSelectTrigger,
  SearchableSelectValue
};

