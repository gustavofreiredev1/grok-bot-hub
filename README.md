# 🤖 GROK BOT HUB

**Central moderna, poderosa e intuitiva para gerenciamento de bots — inspirada no design futurista do Grok.**

Uma plataforma web construída com React + Vite + Tailwind CSS, criada para organizar, visualizar, testar e operar múltiplos bots em um único hub elegante e minimalista.

## ✨ Funcionalidades

Painel Futurista: Métricas rápidas, visão geral do sistema e navegação ultra fluida

Hub de Bots: Organização inteligente de múltiplos bots em cartões modernos

Criação e Gerenciamento: Adicione, edite e exclua bots facilmente

Simulação de Chat: Teste interações em tempo real dentro do próprio sistema

Assistente Grok-Like: Interface inspirada no design do Grok para máxima produtividade

Listagem Inteligente: Bots, ações e sessões visíveis com design limpo e responsivo

Tema Dark Neon: Interface premium com foco em legibilidade e estética high-tech

## 🎨 Design System

Tema: Dark Mode neon — inspirado no Grok

Cores:

Fundo: #0a0a0a

Cards: #1a1a1a

Accent: Azul ciano neon #3b82f6

Tipografia: Inter

Animações: Framer Motion com micro-interações suaves

Layout: Clean, futurista, totalmente responsivo (mobile-first)

##🚀 Tecnologias Utilizadas

React 18 (Hooks + SPA Architecture)

Vite (dev ultra rápido)

TypeScript

Tailwind CSS

shadcn/ui (UI moderna e escalável)

Framer Motion (animações premium)

React Router

Zustand (estado global leve e eficiente)

Recharts (gráficos profissionais)

Lovable.dev para prototipação acelerada

## 📦 Instalação
# Clone o repositório
git clone https://github.com/gustavofreiredev1/grok-bot-hub.git

# Entre no diretório
cd grok-bot-hub

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev


A aplicação estará disponível em:
👉 http://localhost:8080

## 🏗️ Estrutura do Projeto
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/              # Componentes shadcn/ui
│   ├── BotCard.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── ChatSimulator.tsx
├── layouts/             # Layouts principais
│   ├── MainLayout.tsx
│   └── MinimalLayout.tsx
├── pages/               # Páginas do Hub
│   ├── Home.tsx
│   ├── Bots.tsx
│   ├── CreateBot.tsx
│   ├── Chat.tsx
│   ├── Settings.tsx
│   └── Support.tsx
├── store/               # Estado global (Zustand)
│   └── botStore.ts
├── mocks/               # Dados mockados
│   └── mockBots.ts
└── App.tsx              # Root + rotas

## 🔐 Autenticação

Atualmente o sistema funciona com autenticação mockada para fins de teste e demonstração.

Login simples

Persistência via localStorage

Ótimo para prototipação de UX/UI

## 📊 Dados Mockados

Para facilitar a demonstração:

Lista mockada de bots de exemplo

Métricas e gráficos gerados dinamicamente

Chats simulados

Informações fictícias de status e uptime

## 🎯 Próximos Passos / Roadmap

Integração com API real de bots

Backend dedicado (Node + PostgreSQL)

Suporte para múltiplas plataformas

Sistema de Webhooks

Notificações realtime

Export de relatórios (PDF / CSV)

Multi-idioma (i18n)

Temas customizáveis

Painel avançado com IA para análise de bots

## 📝 Scripts Disponíveis
npm run dev          # Ambiente de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview local
npm run lint         # Verificação de código

## 🌐 Deploy

O projeto pode ser publicado facilmente usando:

Lovable Publish

Vercel

Netlify

Cloudflare Pages

## 📄 Licença

Este projeto é um protótipo desenvolvido com ❤️ e criatividade no Lovable.dev.
Uso livre para estudo, melhoria e expansão.

## 🤝 Contribuindo

Pull Requests são bem-vindos!
Se quiser propor novas funcionalidades, abra uma issue antes para discutirmos.
