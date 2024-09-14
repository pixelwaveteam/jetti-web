'use client'

import { Button } from "@/components/ui/button";
import { json2csv } from 'json-2-csv';
import { Download } from "lucide-react";

interface DownloadCsvLinkProps<DataType> {
  data: DataType[];
  fileName: string;
}

export function DownloadCsvLink<T extends Object>({ data, fileName }: DownloadCsvLinkProps<T>) {
  
  const blob = new Blob([json2csv(data)], {type: 'text/csv;charset=utf-8;'});

  const url = URL.createObjectURL(blob);

  return (
    <Button asChild>
      <a href={url} download={fileName}>
        <Download className="w-4 h-4 mr-2" /> Baixar CSV 
      </a>
    </Button>
  )
}