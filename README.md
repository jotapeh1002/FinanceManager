# 💰 FinanceManager

<div align="center">

O FinanceManager é uma aplicação web moderna e intuitiva para gestão financeira pessoal, desenvolvida para ajudar usuários a controlarem suas finanças de maneira eficiente e segura. Com interface limpa e recursos avançados, transformamos a maneira como você gerencia seu dinheiro.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

*Controle suas finanças de forma simples e eficiente*

</div>

## ✨ Funcionalidades

- 📊 **Dashboard** interativo
- 💸 **Transações** (receitas/despesas)
- 📈 **Relatórios** e gráficos
- 🎯 **Metas** financeiras
- 💰 **Orçamentos** mensais

## 🚀 Tecnologias

| Frontend | Backend |
|----------|---------|
| Next.js 14 | NestJS |
| TypeScript | PostgreSQL |
| Tailwind CSS | Mikro-orm |

## 📦 Instalação Rápida 

```bash
# Clone o repositório
git clone https://github.com/jotapeh1002/FinanceManager.git

#Entre na pasta do projeto
cd FinanceManager

# Configure o ambiente e preencha o .env
cp .env.example .env

# Para rodar o proximo script sera necessario ter o docker instalado em sua maquina  
# Rode o script, use o -b para --build
compose-run 

# Acesse o sistema pelo navegador, remova o '3000' e troque pela porta que voce colocoi no seu .env
http://localhost:3000
