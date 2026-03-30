"use client";

import { AppShell } from "@/components/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Palette, Download, Trash2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <main className="min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex min-h-16 flex-col justify-center gap-1 px-4 py-3 sm:px-6">
            <h1 className="text-lg font-semibold text-foreground sm:text-xl">
              Configurações
            </h1>
            <p className="text-sm text-muted-foreground">
              Personalize sua experiência
            </p>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Perfil */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Perfil</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    U
                  </div>
                  <Button variant="outline">Alterar foto</Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-foreground">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Usuário"
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="usuario@email.com"
                      className="bg-input border-border"
                    />
                  </div>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Salvar alterações
                </Button>
              </CardContent>
            </Card>

            {/* Notificações */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">
                    Notificações
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Configure como deseja receber alertas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Alertas de gastos
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Receba notificações quando ultrapassar limites
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Resumo semanal
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Receba um resumo das suas finanças
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Vencimento de faturas
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Lembrete antes do vencimento
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Novidades e dicas
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Fique por dentro das novidades
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Aparência */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Aparência</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Personalize a interface do aplicativo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label className="text-foreground">Tema</Label>
                  <Select defaultValue="dark">
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Selecione o tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-foreground">Moeda</Label>
                  <Select defaultValue="brl">
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Selecione a moeda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brl">Real (BRL)</SelectItem>
                      <SelectItem value="usd">Dólar (USD)</SelectItem>
                      <SelectItem value="eur">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Segurança</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Proteja sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Autenticação em dois fatores
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator className="bg-border" />
                <Button variant="outline" className="w-full bg-transparent">
                  Alterar senha
                </Button>
              </CardContent>
            </Card>

            {/* Dados */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Seus Dados</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Exporte ou exclua seus dados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar dados (CSV)
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir conta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
