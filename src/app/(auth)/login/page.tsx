import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormLogin } from "./_components/form-login";

export default async function LoginPage() {
  const sessao = await auth();
  if (sessao) redirect("/painel");

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Área dos noivos</CardTitle>
          <CardDescription>Entre para gerenciar a lista de presentes</CardDescription>
        </CardHeader>
        <CardContent>
          <FormLogin />
        </CardContent>
      </Card>
    </main>
  );
}