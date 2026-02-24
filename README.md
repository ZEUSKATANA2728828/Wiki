# ⚔ SlayersWiki — Project Slayers (Roblox) | Primeiro Mundo

Wiki completa e estática do Primeiro Mundo de Project Slayers, pronta para publicação no **GitHub Pages**.

## 📁 Estrutura de Arquivos

```
/
├── index.html        ← Página principal (site completo)
├── style.css         ← Todos os estilos (tema dark neon)
├── script.js         ← Navegação, busca e interatividade
└── README.md         ← Este arquivo
```

## 🚀 Como Publicar no GitHub Pages

### Passo 1 — Criar o Repositório
1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"** (botão verde)
3. Escolha um nome (ex: `slayers-wiki`)
4. Deixe como **Public**
5. Clique em **"Create repository"**

### Passo 2 — Fazer Upload dos Arquivos
**Opção A — Pela interface web do GitHub:**
1. No repositório criado, clique em **"uploading an existing file"** ou **"Add file > Upload files"**
2. Arraste os arquivos `index.html`, `style.css` e `script.js`
3. Clique em **"Commit changes"**

**Opção B — Via Git (linha de comando):**
```bash
git init
git add .
git commit -m "Publicar SlayersWiki"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/slayers-wiki.git
git push -u origin main
```

### Passo 3 — Ativar GitHub Pages
1. No repositório, clique em **"Settings"** (engrenagem)
2. Role até a seção **"Pages"** no menu lateral
3. Em **Source**, selecione: **"Deploy from a branch"**
4. Em **Branch**, selecione: **"main"** e pasta **"/ (root)"**
5. Clique em **"Save"**

### Passo 4 — Acessar o Site
Aguarde 1-2 minutos e acesse:
```
https://SEU_USUARIO.github.io/slayers-wiki/
```

> Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub e `slayers-wiki` pelo nome do repositório que você escolheu.

## ✅ Seções da Wiki

| Seção | Conteúdo |
|-------|----------|
| 🏠 Início | Apresentação, navegação e resumo da jornada |
| 🌟 Começando | Criação de personagem, interface, controles, dicas |
| 🗺️ Mapa | Regiões, cidades, locais de farm, NPCs por área |
| 📜 Missões | Todas as missões em ordem com objetivos e recompensas |
| 👤 NPCs | Personagens importantes, localizações e funções |
| ⬆️ Progressão | Atributos, respirações, sistema de combate, XP |
| 👹 Inimigos | Todos os inimigos e bosses com estratégias |
| ⚔️ Itens | Espadas, roupas, cura e materiais de crafting |
| 📋 Guia | Roteiro completo do início ao fim com checkpoints |
| ❓ FAQ | 12+ perguntas frequentes respondidas |

## 🎨 Características Técnicas

- **100% estático** — funciona em qualquer hospedagem de arquivos estáticos
- **Zero dependências externas** de JavaScript (apenas Google Fonts para tipografia)
- **SPA (Single Page Application)** com navegação sem recarregar a página
- **Responsivo** para mobile e desktop
- **Sistema de busca** com índice local em JavaScript
- **Roteamento por URL hash** (links diretos para seções funcionam)
- **Animações CSS** com preferência de redução de movimento respeitada

## 📝 Licença

Conteúdo criado para fins educacionais e de comunidade.  
Project Slayers pertence aos seus desenvolvedores. Roblox é marca da Roblox Corporation.
