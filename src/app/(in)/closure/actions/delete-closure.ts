'use server'

import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";

export async function deleteClosure(id: string) {
  await api(`/closures/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('closures');
}