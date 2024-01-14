'use server';

interface AddressResponseData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export async function fetchAddressByCep(zipCode: string) {
  const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);

  if (!response.ok) {
    throw new Error('Failed to fetch address by CEP');
  }

  return (await response.json()) as AddressResponseData;
}
