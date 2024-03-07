'use client'

import { Button } from "@/components/ui/button";
import { json2csv } from 'json-2-csv';
import { Download } from "lucide-react";
import { TerminalDataTableData } from "./columns";

interface TerminalDataTableProps {
  data: TerminalDataTableData[];
}

export function DownloadCsvLink({ data }: TerminalDataTableProps) {
  
  const blob = new Blob([json2csv(data)], {type: 'text/csv;charset=utf-8;'});

  const url = URL.createObjectURL(blob);

  return (
    <Button asChild>
      <a href={url} download='terminais'>
        <Download className="w-4 h-4 mr-2" /> Baixar CSV 
      </a>
    </Button>
  )
}