'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { convertCentsToCurrency } from "@/utils/currency";
import { getDateFormatted } from "@/utils/date";
import { Expense } from "../../expenses/actions/fetch-expenses";

interface ClosuresExpensesTableProps {
  closuresExpenses: Expense[];
}

export function ClosuresExpensesTable({ closuresExpenses }: ClosuresExpensesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Id
          </TableHead>

          <TableHead>
            Despesa
          </TableHead>

          <TableHead>
            Data
          </TableHead>

          <TableHead>
            Valor
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {closuresExpenses.length ? (
          closuresExpenses.map((expense) => (
            <TableRow
              key={expense.id}
            >
              <TableCell className='py-2'>
                {expense.id.slice(0, 6)}
              </TableCell>
              <TableCell className='py-2'>
                {expense.name}
              </TableCell>
              <TableCell className='py-2'>
                {getDateFormatted(expense.createdAt)}
              </TableCell>
              <TableCell className='py-2'>
                {convertCentsToCurrency(expense.amount)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={4}
              className='h-24 text-center'
            >
              Nenhum registro encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
