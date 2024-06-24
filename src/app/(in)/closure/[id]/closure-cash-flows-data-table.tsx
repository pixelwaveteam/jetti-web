'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { convertCentsToCurrency } from "@/utils/currency";
import { getDateFormatted } from "@/utils/date";
import { CashFlow } from "../../cash-flows/actions/fetch-cash-flow";

interface ClosuresCashFlowsTableProps {
  closuresCashFlows: (CashFlow & { establishmentName: string })[];
}

export function ClosuresCashFlowsTable({ closuresCashFlows }: ClosuresCashFlowsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Local
          </TableHead>

          <TableHead>
            Data
          </TableHead>

          <TableHead>
            Bruto
          </TableHead>

          <TableHead>
            Liquido
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {closuresCashFlows.length ? (
          closuresCashFlows.map((cashFlow) => (
            <TableRow
              key={cashFlow.id}
            >
              <TableCell className='py-2'>
                {cashFlow.establishmentName}
              </TableCell>
              <TableCell className='py-2'>
                {getDateFormatted(cashFlow.date)}
              </TableCell>
              <TableCell className='py-2'>
                {convertCentsToCurrency(cashFlow.gross)}
              </TableCell>
              <TableCell className='py-2'>
                {convertCentsToCurrency(cashFlow.net)}
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
