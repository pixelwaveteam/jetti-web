'use server';

import { api } from '@/lib/api';

interface ServerClosure {
  closure: {
    _id: { value: string };
    props: {
      organizationId: { value: string };
      closerId: { value: string };
      gross: number;
      net: number;
      createdAt: Date;
      updatedAt?: Date;
    }
  };
  organization: {
    _id: { value: string };
    props: {
      name: string;
      createdAt: Date;
      updatedAt?: Date;
    }
  }
}

export interface Closure {
  closure: {
    id: string;
    organizationId: { value: string };
    closerId: { value: string };
    gross: number;
    net: number;
    createdAt: Date;
    updatedAt?: Date;
  };
  organization: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt?: Date;
  }
}

export async function fetchClosures() {
  const response = await api<ServerClosure[]>('/closures', {
    next: {
      tags: ['closures'],
    },
  });

  const formattedResponse: Closure[] = response.map(entry => {
    const closure = {id: entry.closure['_id'].value, ...entry.closure.props}

    const organization = {id: entry.organization['_id'].value, ...entry.organization.props}

    return ({ closure, organization })
  })

  return formattedResponse;
}
