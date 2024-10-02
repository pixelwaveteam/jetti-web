import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function IndexPage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect(`/auth/signin`);
  }

  redirect('/dashboard')
  //
}