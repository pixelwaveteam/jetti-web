'use server'

import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";

export async function deleteClosureDistribution(id: string) {
  await api(`/closures/distributions/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('closures-distributions');
}