'use client';

import { useContext, useMemo, useState } from 'react';

import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { SheetContext } from '@/providers/sheet-provider';
import { UserContext } from '@/providers/user-provider';
import { PopoverArrow } from '@radix-ui/react-popover';
import { Trash, Triangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { createUserTerminal } from '../../../actions/create-user-terminal';
import { deleteUserTerminal } from '../../../actions/delete-user-terminal';
import { UserRelations } from '../../edit-sheet';

interface CreateUserTerminal {
  terminalId: string;
  userId: string;
}

interface UserFormEditProps {
  user: UserRelations
}

interface NamedUserTerminal  {
  id: string;
  userId: string;
  terminalId: string;
  terminalName: string;
}

type NewUserTerminal = NamedUserTerminal | {
  id: undefined;
  userId: undefined;
  terminalId: undefined;
  terminalName: undefined;
}

export function UserTerminalFormEdit({ user: { id: userId, ...user } }: UserFormEditProps) {
  const [terminalsQuery, setTerminalQuery] = useState<string | undefined>();
  const [newTerminal, setNewTerminal] = useState<NewUserTerminal[]>([]);
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);
  const { terminals } = useContext(UserContext);

  const userTerminal = useMemo(() => 
    user.terminals.reduce((acc, userTerminal) => {
      const terminal = terminals.find(({ id }) => id === userTerminal.terminalId)

      return terminal ? [{...userTerminal, terminalName: terminal.code}, ...acc] : acc
    } ,[] as NamedUserTerminal[]), 
    [terminals, user.terminals]
  );

  const userTerminals = useMemo(() => 
    [...newTerminal, ...userTerminal],
    [newTerminal, userTerminal]
  )

  const formMethods = useForm();

  const onCreateUserTerminal = async (data: CreateUserTerminal, index: number) => {
    try {
      await createUserTerminal(data);

      handleNewUserTerminalDelete(index)

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Terminal adicionado com sucesso.',
        duration: 5000,
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };

  function handleNewUserTerminalDelete(index: number) {
    setNewTerminal(state => {
      const fieldValue = [...state];
                              
      fieldValue.splice(index, 1)
  
      return fieldValue;
    });
  }

  const handleDeleteUserTerminal = async (id: string) => {
    try {
      await deleteUserTerminal(id);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Terminal excluído com sucesso do usuário.',
        duration: 5000,
      });
    } catch(err) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };

  const filteredTerminal = useMemo(() => 
    terminals.filter(({ id, code }) => 
      !userTerminals.find(terminal => 
        code === terminal.terminalName && id === terminal.terminalId
      ) &&
        (terminalsQuery ? code.includes(terminalsQuery) : true)
    ),
    [userTerminals, terminals, terminalsQuery]
  )

  function handleNewUserTerminal() {
    setNewTerminal(state => [
      {
      id: undefined, code: undefined, terminalId: undefined, terminalName: undefined, userId: undefined
      },
      ...state
    ])
  }

  return (
    <div className='space-y-6'>
      <Form {...formMethods}>
        <form className='mt-4 space-y-4'>
          {
            userTerminals.map(({ id, terminalName }, index) => (
              <Popover key={id} onOpenChange={() => setTerminalQuery(undefined)}>
                <PopoverTrigger asChild>
                  <FormItem>
                    <FormControl>
                      <div className='relative'>
                        <Input 
                          placeholder='Escolha o terminal'
                          readOnly
                          className='data-[selected="true"]:bg-primary text-primary-foreground cursor-pointer text-center'
                          value={terminalName || ''}
                          data-selected={!!terminalName}
                        />
                        {
                          terminalName ? (
                            <button onClick={() => handleDeleteUserTerminal(id)} type='button' className='absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-black/5 transition-all'>
                              <Trash className='w-6 h-6 text-destructive' strokeWidth={2}/>
                            </button>
                          ) : (
                            <button onClick={() => handleNewUserTerminalDelete(index)} type='button' className='absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-black/5 transition-all'>
                              <Trash className='w-6 h-6 text-destructive' strokeWidth={2}/>
                            </button>
                          )
                        }
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </PopoverTrigger>
                <PopoverContent onCloseAutoFocus={(e) => e.preventDefault()} sideOffset={-10}>
                  {
                    (!!terminalsQuery || filteredTerminal.length > 0) && (
                      <Input 
                        placeholder='Busque terminais'
                        value={terminalsQuery}
                        onChange={({ target: { value } }) => setTerminalQuery(value)}
                        className='mb-4'
                      />
                    )
                  }
                  {
                    filteredTerminal.length > 0 ? (
                      <div className='flex flex-col gap-y-2 mb-4 max-h-[25rem] overflow-y-auto'>
                        {
                          filteredTerminal
                            .map(({ id: terminalId, code: terminalCode }) => (
                              <>
                                <Button 
                                  className='w-full'
                                  key={terminalId}
                                  onClick={() => onCreateUserTerminal({ terminalId, userId }, index)}
                                >
                                  {terminalCode}
                                </Button>
                              </>
                            ))
                        }
                      </div>
                    ) : (
                      <p className='text-muted-foreground text-center text-sm'>
                        {terminalsQuery ? 'Nenhum terminal encontrada.' : 'Todos terminais foram escolhidos.'}
                      </p>
                    )
                  }
                  <PopoverArrow asChild>
                    <Triangle className='text-border rotate-180 w-14 h-5 fill-popover' strokeWidth={0.5} />
                  </PopoverArrow>
                </PopoverContent>
              </Popover>
            ))
          }

          <EmptyState label='Novo terminal' className='py-4' onClick={handleNewUserTerminal} />
        </form>
      </Form>
    </div>
  );
}
