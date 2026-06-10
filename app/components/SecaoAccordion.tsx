"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useEffect, useState } from "react";

export interface ItemAccordion {
  id: string;
  nome: string;
  conteudo: string;
}

export interface DadosArea {
  gratuitos: ItemAccordion[];
  pagos: ItemAccordion[];
}

const dadosIniciais: Record<string, DadosArea> = {
  TI: {
    gratuitos: [
      {
        id: "ti-g1",
        nome: "Project Genie — Simulacoes dinamicas com IA",
        conteudo: `Gera ambientes interativos em tempo real, aplicável em testes, simulações e UX engineering.

1. O que é?  
Ferramenta da Google DeepMind que transforma texto ou imagens em mundos 3D interativos, com física e comportamento dinâmico. 

2. Como funciona?  
A IA gera ambientes em tempo real, prevendo o “próximo estado” do mundo a cada ação do usuário, criando simulações vivas e navegáveis.

3. Como usar?  
Acessar via Google Labs ou Google AI Ultra → inserir texto/imagem → explorar o mundo criado em primeira ou terceira pessoa com controles simples (WASD + prompts)

4. Benefícios  
Ótimo para testar ideias, visualizar cenários, criar minijogos e simular ambientes complexos rapidamente.` },
      { id: "ti-g2", nome: "LingBot-World (open-source) — Simulador interativo com IA", conteudo: `Simula mundos interativos para testes, interação e automações experimentais. 

1. O que é?  
Simulador open‑source que gera mundos 3D interativos em tempo real, com física, persistência e qualidade comparável ao Google Genie 3. 

2. Como funciona?  
A IA cria ambientes exploráveis a partir de texto ou imagens, com memória estável (10+ minutos), objetos persistentes e resposta imediata às ações do usuário.

3. Como usar?  
Rodar o projeto via GitHub → fornecer imagem ou texto → navegar com WASD ou deixar o agente autônomo explorar. 

4. Benefícios  
Excelente para pesquisa, jogos e robótica: gratuito, totalmente modificável e sem limitações de créditos ou acesso fechado
 ` 
      },
      { id: "ti-g3", nome: "Findtube.AI (gratuito) — Busca inteligente em videos tecnicos", conteudo: `Permite localizar trechos específicos em vídeos a partir de descrição, acelerando pesquisas técnicas. 

1. O que é?  
Plataforma gratuita de busca inteligente em vídeos do YouTube, focada em conteúdo técnico e educacional. Ela ignora clickbait e prioriza vídeos realmente úteis para estudo. 

2. Como funciona?  
Usa busca semântica por IA para encontrar vídeos relevantes, organizar resultados por nível de dificuldade e duração, e até transformar vídeos em texto para análise. 

3. Como usar?  
Abrir o site → buscar o tema técnico → escolher resultados organizados por tempo/dificuldade → opcionalmente converter em texto para anotações.

4. Benefícios  
Ideal para estudos técnicos e consultorias: reduz tempo de busca, cria rotas de aprendizado, exibe pré-requisitos e entrega só conteúdo de alta qualidade.
` 
      },
      { id: "ti-g4", nome: "GLM‑5 (open-source) — Modelo avançado para agentes, planejamento e análise", conteudo: `Modelo de IA aberta, útil para equipes que precisam desenvolver agentes customizados.

1. O que é?  
Modelo avançado open‑source da Zhipu AI, com ~745B parâmetros (MoE) e foco em agentes autônomos, raciocínio complexo e tarefas multietapas. 

2. Como funciona?  
Emprega arquitetura Mixture‑of‑Experts, long context (até 200K tokens) e capacidades de planejamento, uso de ferramentas, navegação web e análise avançada de problemas. 

3. Como usar?  
Rodar via GitHub ou APIs da Zhipu AI → enviar prompts técnicos, analíticos ou de agentes → executar tarefas longas, planejamento e workflows multi‑etapas.

4. Benefícios  
Excelente para engenharia, agentes, código e análises complexas: desempenho frontier open‑source, suporte multilíngue e ideal para automação inteligente de longo prazo. 
`},
      { id: "ti-g5", nome: "Replit AI (plano gratuito) — Assistente de programação", conteudo: `Ferramenta de IA para desenvolvimento, prototipação e execução de código diretamente no navegador.

1. O que é?  
Assistente de programação integrado ao Replit, com acesso limitado no plano free para gerar código e ajudar iniciantes.

2. Como funciona?  
Sugere e corrige código direto no navegador, auxilia compreensão e pequenos trechos usando IA dentro do editor. 

3. Como usar?  
Criar conta → abrir um Repl → ativar Replit AI no editor → pedir explicações, correções ou geração de código dentro dos limites do plano free.

4. Benefícios  
Ótimo para aprender e prototipar rápido sem instalar nada, com suporte básico de IA no ambiente online. ` },
    ],
    pagos: [
      { id: "ti-p1", nome: "ClickUp AI — Automação de tarefas e gestão de TI", conteudo: `Ferramenta que automatiza relatórios, fluxos e integrações para equipes de projetos de TI.

1. O que é?  
IA integrada ao ClickUp que automatiza tarefas e apoia gestão de projetos e TI. 

2. Como funciona?  
Gera resumos, cria conteúdo e automatiza fluxos (atribuições, prioridades, atualizações) entendendo o contexto das tarefas e documentos.

3. Como usar?  
Criar conta → ativar ClickUp Brain → usar IA em tarefas, docs e automações para gerar texto, priorizar itens ou criar fluxos automatizados.

4. Benefícios  
Reduz carga manual, acelera decisões e melhora gestão e operação de TI com alertas, automações e agentes inteligentes. ` },
      { id: "ti-p2", nome: "IBM Watson AIOps — Observabilidade com IA", conteudo: `Detecta anomalias, correlaciona logs e prevê falhas em ambientes complexos de TI. 
1. O que é?  
Plataforma de AIOps da IBM que usa IA para unificar observabilidade e detectar incidentes de forma proativa. 

2. Como funciona?  
Correlaciona métricas, logs e eventos com modelos de IA para prever falhas, identificar anomalias e automatizar respostas. 

3. Como usar?  
Integrar Instana/Cloud Pak for AIOps → conectar fontes de telemetria → visualizar alertas correlacionados → acionar automações ou runbooks.

4. Benefícios  
Reduz MTTR, aumenta resiliência e oferece visão completa do ambiente híbrido/multicloud com análise inteligente. ` },
      { id: "ti-p3", nome: "H2O.ai — Automated machine learning", conteudo: `Ferramenta poderosa para modelagem preditiva utilizada por equipes de dados e TI. 
1. O que é?  
Plataforma AutoML open‑source que automatiza criação, teste e otimização de modelos de machine learning. 

2. Como funciona?  
Executa pré‑processamento automático, treina vários modelos, faz tuning e monta ensembles para encontrar a melhor performance. 

3. Como usar?  
Apontar dataset → definir coluna alvo → rodar AutoML em Python/R/Web → analisar leaderboard → exportar o modelo.

4. Benefícios  
Acelera projetos de ML, melhora resultados sem expertise profunda e escala para clusters distribuídos. ` },
    ],
  },
  Comunicação: {
    gratuitos: [
      { id: "com-g1", nome: "Notion AI (Free tier) — Organização e criação de conteúdo", conteudo: `Ajuda em calendários editoriais, resumos, rascunhos e documentação para marketing.

1. O que é?  
O Notion AI é a camada de IA integrada ao Notion que ajuda a organizar informações, gerar conteúdo e automatizar tarefas, mesmo no plano gratuito. Ele funciona como um assistente de escrita e organização dentro do próprio workspace. 

2. Como funciona?  
A IA cria textos, resumos, listas, planos, reescreve conteúdo, sugere estrutura de páginas e ajuda a organizar tarefas e projetos. No plano gratuito, o usuário tem acesso a geração de textos, resumos e suporte básico à organização. 

3. Como usar?  
Dentro de qualquer página → digitar /ask AI ou selecionar texto → escolher ações como “resumir”, “reescrever”, “criar lista”, “gerar plano”. Também é possível criar páginas estruturadas e pedir para a IA preenchê-las.

4. Benefícios  
Acelera a criação de conteúdo, melhora organização, reduz esforço em tarefas repetitivas, transforma ideias soltas em documentos claros e ajuda a manter projetos, notas e estudos bem estruturados — tudo de forma intuitiva.`},
      { id: "com-g2", nome: "Copy.ai (Free tier) — Textos curtos e criativos", conteudo: `Ideal para headlines, CTAs, descrições de produtos e e-mails rápidos.

1. O que é?  
Copy.ai é uma plataforma de geração de texto com IA focada em criar conteúdo curto, criativo e rápido — como headlines, slogans, posts, ideias e mensagens — com um plano gratuito funcional para uso leve.

2. Como funciona?  
A IA utiliza modelos generativos treinados em formatos de marketing e comunicação para produzir textos em segundos, oferecendo múltiplas variações para escolha. O free tier inclui criação de textos curtos, brainstorm de ideias e assistente de escrita.

3. Como usar?  
Criar conta → escolher um template (post, slogan, e‑mail, headline) ou digitar um prompt → gerar múltiplas opções → editar e copiar o texto final.

4. Benefícios  
Acelera brainstorms, economiza tempo em textos de marketing, facilita criação de mensagens criativas e reduz bloqueio criativo — sem custo para produções rápidas.
`},
      { id: "com-g3", nome: "Freepik AI Image Generator (gratuito) — Imagens para campanhas", conteudo: `Cria imagens via IA para redes sociais, anúncios e banners. 

1. O que é?  
Ferramenta gratuita do Freepik que gera imagens profissionais via IA a partir de descrições de texto, ideal para campanhas, posts e materiais de marketing. 

2. Como funciona?  
O usuário escreve um prompt e escolhe estilo (realista, cartoon, artístico, anime etc.). A IA usa modelos avançados (Google Imagen, Flux, Ideogram e outros) para criar imagens rápidas, consistentes e com alta qualidade, permitindo também usar referências e editar dentro da própria suíte Freepik. 

3. Como usar?  
Entrar no gerador → digitar o prompt → escolher estilo/formato → gerar variações → baixar em PNG/JPEG para uso imediato em campanhas e redes sociais.

4. Benefícios  
Criação rápida de visuais, múltiplos estilos, alta resolução, uso ilimitado sem registro, ideal para anúncios, posts, concept art e materiais de comunicação — com variações rápidas para testes A/B.`},
      { id: "com-g4", nome: "Beehiiv (Free plan) — Newsletter com IA", conteudo: `Automatiza crescimento, segmentação e otimização de newsletters. 

1. O que é?  
Beehiiv é uma plataforma de criação e envio de newsletters com foco em crescimento, oferecendo um plano gratuito robusto (Launch) com até 2.500 inscritos e envios ilimitados. 

2. Como funciona?  
Mesmo no free plan, você pode criar newsletters, publicar posts, usar site/landing page, e acessar métricas básicas. A IA integrada (nos planos pagos) inclui assistente de escrita, edição inteligente e geração de texto — mas parte das funções de escrita com IA existe como ferramentas básicas gratuitas para rascunhos. 

3. Como usar?  
Criar conta → configurar newsletter → escrever pelo editor intuitivo → usar blocos e comandos → publicar e enviar → acompanhar crescimento pelo dashboard.

4. Benefícios  
Perfeito para começar uma newsletter sem custos: envios ilimitados, website nativo, facilidade de publicação e ambiente feito para criadores crescerem sua base — com upgrade fácil para IA avançada quando necessário.`},
      { id: "com-g5", nome: "Zapier (Free tier) — Automação de marketing com IA", conteudo: `Conecta ferramentas, automatiza workflows e cria fluxos inteligentes.

1. O que é?  
Zapier é uma plataforma de automação no‑code que conecta apps e cria fluxos automáticos — muito usada em marketing para integrar leads, enviar e-mails, registrar eventos e nutrir contatos. O plano gratuito permite começar sem custo. 

2. Como funciona?  
No plano free, você pode criar Zaps de 2 etapas (1 trigger + 1 ação), com 100 tarefas/mês, e usar o Copilot, o assistente de IA do Zapier para criar automações em linguagem natural. Ele também inclui acesso gratuito aos Zapier Chatbots e Zapier Agents, versões básicas de automação com IA. 

3. Como usar?  
Criar conta → escolher apps (ex.: Instagram, Google Sheets, Mailchimp) → descrever a automação com IA ou montar manualmente → ativar → o Zap roda sozinho a cada 15 min (limite do free tier). 

4. Benefícios  
Perfeito para marketing de pequena escala: automatiza coleta de leads, atualiza planilhas, envia notificações, registra eventos e reduz tarefas manuais — tudo gratuitamente e sem código.`},
    ],
    pagos: [
      { id: "com-p1", nome: "Semrush (com IA) — SEO & pesquisa competitiva", conteudo: `Usa IA para encontrar palavras-chave, criar clusters e analisar concorrência. 
1. O que é?  
Plataforma de SEO e análise competitiva com recursos avançados de IA para medir visibilidade em buscas tradicionais e em respostas de modelos como ChatGPT e Google AI Overviews. 

2. Como funciona?  
A IA usa o AI Visibility Toolkit e o Copilot para analisar palavras‑chave, backlinks, concorrentes e presença da marca em ambientes híbridos (SEO + IA Search).

3. Como usar?  
Criar um projeto, rodar auditoria técnica, analisar palavras‑chave e concorrentes e usar o Copilot para insights automáticos e recomendações rápidas.

4. Benefícios  
Mostra oportunidades reais, melhora conteúdo com IA e revela como sua marca aparece tanto no Google quanto em respostas de IA.`},
      { id: "com-p2", nome: "Arcads (ad automation) — Automação de anúncios com IA", conteudo: `Cria e otimiza campanhas automaticamente, melhorando ROI.

1. O que é?  
Arcads é uma plataforma de criação automática de anúncios com IA que gera vídeos e imagens usando atores digitais realistas, avatares e UGC sintético.

2. Como funciona?  
A IA cria anúncios completos a partir de textos ou roteiros: seleciona atores, sincroniza voz e lábios, adiciona cenas e permite produzir dezenas de variações para testes rápidos. 

3. Como usar?  
Escrever ou colar um script → escolher um ator/estilo → gerar o vídeo ou imagem → exportar para campanhas em TikTok, Meta, YouTube e outras plataformas. 

4. Benefícios  
Reduz custos de produção, acelera criação de criativos, facilita testes A/B em escala e permite personalizar anúncios com alta velocidade e realismo.`},
      { id: "com-p3", nome: "Clepher — Chatbots de vendas e suporte", conteudo: `IA para conversação em múltiplos canais (Instagram, WhatsApp, Messenger).

1. O que é?  
Clepher é uma plataforma de chatbots para vendas, marketing e suporte, focada em Facebook Messenger e Instagram DM, com criação visual e automações sem código. 

2. Como funciona?  
Usa fluxos drag‑and‑drop, templates prontos e integrações nativas (50+) para automatizar conversas, qualificar leads, responder dúvidas e impulsionar conversões. 

3. Como usar?  
Criar um bot pelo wizard → montar fluxos de vendas e suporte → conectar canais Meta → ativar capturas, broadcasts e integrações com CRM ou Zapier/Make. 

4. Benefícios  
Aumenta engajamento, qualifica leads automaticamente, reduz carga de suporte (até 80% das dúvidas), melhora conversões e mantém respostas em tempo real.`},
    ],
  },
  Finanças: {
    gratuitos: [
      { id: "fin-g1", nome: "BlackRock AI Labs — Pesquisa institucional com IA", conteudo: `Publica estudos e soluções de machine learning para otimização de portfólio e análises preditivas. 

1. O que é?  
Centro institucional de pesquisa em IA aplicada a finanças, focado em resolver problemas de investimento, risco e portfólios.

2. Como funciona?  
A equipe aplica modelos avançados de IA para análise financeira, apoiando pesquisas e criando sistemas como o Asimov — o analista virtual que varre documentos e gera insights automaticamente. 

3. Como usar?  
Acessar as publicações e papers liberados → estudar modelos e frameworks → aplicar em pesquisas quantitativas internas ou acadêmicas → integrar algoritmos em soluções financeiras.

4. Benefícios  
Oferece pesquisa de ponta, acelera inovação em investimentos quantitativos e permite aplicar IA de nível institucional em análise de mercado.`},
      { id: "fin-g2", nome: "StockGPT — Buscador financeiro por IA focado em ações (Tesla)", conteudo: `Ferramenta gratuita que fornece análises e dados financeiros com IA.

1. O que é?  
Um buscador financeiro por IA especializado em Tesla ($TSLA), treinado em décadas de relatórios, conferências e dados históricos da empresa.

2. Como funciona?  
A IA consulta transcrições completas de earnings calls desde 2011, dados financeiros, eventos históricos e métricas da Tesla, transformando perguntas em respostas rápidas com contexto técnico, gráficos e comparações. 

3. Como usar?  
Fazer perguntas sobre Tesla → explorar dados históricos por trimestre/ano → comparar métricas → obter insights financeiros sem pesquisa manual.

4. Benefícios  
Acelera análise de TSLA, entrega dados confiáveis em segundos, permite estudo profundo da empresa e ajuda investidores a tomar decisões informadas com histórico completo.`},
      { id: "fin-g3", nome: "FinChat.io — Análise de empresas via IA", conteudo: `Gera insights instantâneos sobre empresas, mercados e investimentos. 

1. O que é?  
Plataforma de pesquisa de investimentos com IA conversacional, que fornece dados verificados sobre milhares de empresas públicas, incluindo métricas financeiras, KPIs, transcrições e dados institucionais. 

2. Como funciona?  
A IA responde perguntas sobre empresas, compara indicadores, analisa demonstrações financeiras, cria visualizações e busca dados fundamentais e históricos para apoiar decisões de investimento — tudo usando um chatbot financeiro treinado em informações verificadas. 

3. Como usar?  
Login grátis → pesquisar empresas → fazer perguntas ao chatbot → visualizar gráficos, KPIs e transcrições → salvar dados no painel personalizado.

4. Benefícios  
Reduz tempo de pesquisa, entrega análises confiáveis, organiza informações complexas e torna análises fundamentais acessíveis tanto para iniciantes como para investidores avançados.`},
      { id: "fin-g4", nome: "Prospero.ai — Análise de ações com IA", conteudo: `Processa milhões de pontos de dados para identificar oportunidades de investimento. 

1. O que é?  
App de investimentos que usa IA para analisar ações, gerar sinais inteligentes e identificar oportunidades de curto e longo prazo com dados institucionais. 

2. Como funciona?  
A IA examina milhões de pontos de dados para detectar padrões, tendências e movimentos de grandes instituições, oferecendo picks exclusivos, sinais bullish/bearish e insights acionáveis para melhorar o win rate de traders e investidores.

3. Como usar?  
Baixar o app → explorar os sinais e listas de ações → acompanhar picks diários e newsletters → usar os insights para ajustar trades e decisões de investimento.

4. Benefícios  
Ajuda a identificar oportunidades rápidas e vencedores de longo prazo, aumenta a confiança nas escolhas, reduz análise manual e oferece sinais comparáveis aos de fundos de hedge.`},
      { id: "fin-g5", nome: "StackAI (versão gratuita limitada) — Automação financeira com IA", conteudo: `Extrai dados de documentos, faz previsões e cria agentes financeiros sem código.

1. O que é?  
Plataforma de automação com IA voltada para empresas financeiras, usada para acelerar compliance, relatórios, operações internas e processamento de dados — com plano gratuito limitado para experimentar agentes e fluxos automatizados. 

2. Como funciona?  
Permite criar agentes financeiros (sem código) que analisam dados, revisam contratos, automatizam compliance, processam reembolsos, geram relatórios e conectam-se a sistemas internos via integrações corporativas e modelos de IA.

3. Como usar?  
Criar conta → montar um agente/fluxo com templates → conectar documentos/dados → rodar automações → acompanhar resultados no painel.

4. Benefícios  
Reduz trabalho manual, acelera decisões, automatiza tarefas financeiras críticas e permite testar automações reais mesmo no plano gratuito (com limites de uso).`},
    ],
    pagos: [
      { id: "fin-p1", nome: "Intuit Assist (TurboTax, QuickBooks) — Contabilidade, marketing e impostos com IA", conteudo: `Recomenda ações financeiras, organiza documentos e ajuda na gestão fiscal. 
1. O que é?  
Assistente financeiro com IA generativa integrado aos produtos da Intuit — TurboTax, QuickBooks, Mailchimp e Credit Karma — para automatizar contabilidade, marketing, impostos e decisões financeiras.

2. Como funciona?  
Usa GenAI para criar faturas, contas, estimativas e lembretes, preencher impostos, gerar campanhas de marketing, responder dúvidas financeiras, analisar fluxo de caixa e oferecer recomendações personalizadas — tudo conectado dentro da plataforma Intuit. 

3. Como usar?  
Acessar seu app (TurboTax/QuickBooks/Mailchimp/Credit Karma) → abrir o Intuit Assist → pedir ações como “preparar meus impostos”, “criar fatura”, “gerar campanha”, “analisar fluxo de caixa” → acompanhar sugestões e relatórios.

4. Benefícios  
Reduz trabalho manual, acelera processos contábeis e fiscais, melhora marketing, ajuda pequenas empresas a crescer e oferece insights financeiros confiáveis em um só ecossistema.
`},
      { id: "fin-p2", nome: "LuxAlgo — Indicadores premium com IA para TradingView", conteudo: `Sinais de compra e venda para ações, cripto e forex.

1. O que é?  
Suite de indicadores premium com IA para TradingView, usada por traders para gerar sinais automáticos, detectar tendências, identificar reversões e otimizar análises técnicas com algoritmos avançados.

2. Como funciona?  
Os indicadores aplicam modelos proprietários para produzir sinais de compra/venda, detecção de estrutura de mercado, suportes/resistências dinâmicos, filtros de volatilidade e dashboards inteligentes — tudo configurável direto no TradingView.

3. Como usar?  
Instalar o add‑on no TradingView → aplicar o indicador no gráfico → ajustar sensibilidade e filtros → seguir sinais e zonas geradas pela IA.

4. Benefícios  
Simplifica análise técnica, reduz ruído, melhora timing de entradas/saídas e oferece ferramentas profissionais com visual limpo e parâmetros personalizáveis — ideal para traders iniciantes e avançados.`},
      { id: "fin-p3", nome: "Kavout — Rankeamento de ações com IA (Kai Score)", conteudo: `Analisa dados históricos, tendências e fontes alternativas para prever performance. 
1. O que é?  
Plataforma de análise quantitativa que usa IA para ranquear ações com o Kai Score (nota de 1 a 9), indicando a probabilidade de um papel superar o mercado com base em milhares de fatores. 

2. Como funciona?  
O sistema processa fundamentos, sinais técnicos, sentimento e dados alternativos para gerar o Kai Score e outros rankings, avaliando mais de 9.000 ações diariamente e destacando as de maior potencial. 

3. Como usar?  
Crie uma conta → pesquise tickers e veja o Kai Score → explore listas de “top picks” e rankings → use InvestGPT para tirar dúvidas → acompanhar sinais e montar seu portfólio.

4. Benefícios  
Simplifica decisões, aponta ações líderes (Kai 7–9), reduz ruído de mercado e oferece análise de nível institucional acessível para investidores comuns.`},
    ],
  },
  Educação: {
    gratuitos: [
      { id: "edu-g1", nome: "Socratic by Google", conteudo: `Ferramenta para estudantes: resolve dúvidas, explica conteúdos e fornece materiais de estudo personalizados.

1. O que é?  
Socratic é um app educativo da Google que usa IA para ajudar estudantes a entender tarefas escolares, oferecendo explicações visuais e passo a passo.

2. Como funciona?  
O aluno tira uma foto ou faz uma pergunta por texto/voz; a IA analisa o problema e entrega soluções, vídeos, guias e recursos confiáveis para vários assuntos.

3. Como usar?  
Abrir o app → fotografar ou digitar a dúvida → acessar explicações, materiais visuais e conteúdos selecionados por professores para compreender o tema.

4. Benefícios  
Facilita o estudo, melhora compreensão, cobre diversas matérias e transforma dúvidas complexas em explicações claras — totalmente gratuito.`},
      { id: "edu-g2", nome: "MagicSchool AI", conteudo: `Auxilia professores com criação de atividades, planos de aula, rubricas, adaptações e conteúdos personalizados.

1. O que é?  
MagicSchool AI é uma plataforma educacional com mais de 80 ferramentas de IA para professores, ajudando em planejamento, avaliação, diferenciação e comunicação. 

2. Como funciona?  
Gera planos de aula, rubricas, atividades, quizzes, conteúdos acadêmicos e feedback usando IA, além de oferecer 50+ ferramentas para alunos e recursos avançados para escolas. 

3. Como usar?  
Criar uma conta gratuita → acessar ferramentas como Lesson Plan, Rubric Maker e Worksheet Generator → personalizar outputs → integrar com Google Classroom, Docs ou Canvas. 

4. Benefícios  
Economiza 7–10 horas semanais, melhora apoio a alunos diversos e oferece versão gratuita robusta, com funções adicionais no plano Plus e no Enterprise.`},
      { id: "edu-g3", nome: "Curipod", conteudo: `Cria slides interativos, quizzes e aulas completas com IA para uso em sala de aula.

1. O que é?  
Curipod é uma plataforma de lições interativas geradas por IA, criada para aumentar engajamento e participação em sala de aula com slides, atividades e feedback em tempo real. 

2. Como funciona?  
A IA gera apresentações completas com quizzes, polls, desenhos e prompts, além de oferecer feedback imediato aos alunos e atividades alinhadas a padrões educacionais. 

3. Como usar?  
Criar conta gratuita → escolher “Generate with AI” ou criar slides manualmente → personalizar atividades → compartilhar o código da aula para os alunos participarem. 

4. Benefícios  
Economiza tempo na preparação, aumenta 100% a participação estudantil e oferece recursos essenciais no plano gratuito, como aulas ilimitadas e atividades interativas. `},
      { id: "edu-g4", nome: "Brisk Teaching", conteudo: `Extensão que ajuda professores a criar atividades e adaptar conteúdos diretamente no navegador. 
1. O que é?  
Brisk Teaching é uma plataforma/extension de IA gratuita para educadores, que cria materiais, personaliza instrução e gera feedback diretamente em Google e Microsoft tools. 

2. Como funciona?  
A IA atua dentro de Docs, Slides, PDFs, sites e YouTube, criando atividades, ajustando níveis de leitura, gerando comentários personalizados e analisando escrita dos alunos. 

3. Como usar?  
Instalar a extensão → abrir qualquer documento, texto ou vídeo → clicar no ícone Brisk → gerar lições, quizzes, feedback ou adaptações com base no conteúdo exibido. 

4. Benefícios  
Economiza 7–10 horas por semana, facilita diferenciação, agiliza correções e oferece mais de 20 ferramentas no plano Free Forever, feito especificamente para professores.
`},
      { id: "edu-g5", nome: "Socrait", conteudo: `Ferramenta para coleta de feedback e reflexão guiada por IA em atividades escolares

1. O que é?  
Socrait é um assistente de sala de aula por voz que usa IA para registrar automaticamente eventos, comportamentos e informações durante a aula sem gravar áudio. 

2. Como funciona?  
O app “ouve” o professor, detecta elogios, avisos, participação e presença, e transforma tudo em dados organizados, resumos e ações de follow‑up.

3. Como usar?  
O professor abre o app, inicia o streaming antes da aula e ao final acessa o painel com registros, dashboards e sugestões automáticas.

4. Benefícios  
Reduz a carga administrativa e o burnout docente, facilita comunicação com famílias e melhora documentação de sala, com forte foco em privacidade.`},
    ],
    pagos: [
      { id: "edu-p1", nome: "Synthesia", conteudo: `Cria vídeos educacionais com avatares e narração por IA, útil para EAD e criação de cursos. 

1. O que é?  
Synthesia é uma plataforma de criação de vídeos com avatares realistas gerados por IA, usada para treinamentos, comunicados e conteúdo corporativo sem precisar gravar nada. 

2. Como funciona?  
O usuário escreve um roteiro, escolhe entre 200+ avatares e 140+ idiomas; a IA gera um vídeo profissional com lip‑sync e apresentação natural, pronto para uso.

3. Como usar?  
Criar conta → inserir o script → selecionar avatar, voz e template → personalizar visuais e marca → gerar o vídeo em poucos minutos, sem filmagem. 

4. Benefícios  
Economiza tempo e custos de produção, garante consistência em vídeos, facilita criação em escala e suporta equipes globais via múltiplos idiomas e avatares.
`},
      { id: "edu-p2", nome: "Jasper AI", conteudo: `Gera textos didáticos, explicações, apresentações e materiais educativos para professores e instituições. 
1. O que é?  
Jasper AI é uma plataforma de conteúdo voltada para marketing, com agentes especializados, Brand Voice e recursos avançados para criar textos consistentes em escala. 

2. Como funciona?  
Usa mais de 50–100 modelos/agents para gerar blogs, anúncios, e‑mails e posts, aplicando automaticamente o tom, estilo e informações da marca em cada peça. 

3. Como usar?  
Definir o Brand Voice → escolher um template ou agente → inserir briefing/roteiro → gerar e ajustar conteúdo, com integração a Docs, Notion, HubSpot e outros. 

4. Benefícios  
Acelera campanhas, mantém consistência entre canais e reduz retrabalho — ideal para equipes e agências, embora tenha preço premium.
`},
      { id: "edu-p3", nome: "Education Copilot", conteudo: `Cria planos de aula completos, avaliações e materiais alinhados ao currículo escolar.

1. O que é?  
Education Copilot é uma plataforma de IA focada em professores, que gera planos de aula, atividades, handouts, relatórios e materiais educativos em segundos.

2. Como funciona?  
A IA cria modelos estruturados a partir de um tema digitado, oferecendo mais de 10 ferramentas para aulas, incluindo lições, prompts, projetos e relatórios em inglês e espanhol.  

3. Como usar?  
Criar conta → escolher um tipo de recurso (ex.: lesson plan) → inserir tema/objetivos → gerar, revisar e exportar o material, aceitando DOCX, PDF e TXT. 

4. Benefícios  
Economiza tempo no preparo, padroniza materiais e facilita criação rápida de conteúdo pedagógico — com teste grátis e planos pagos para uso ilimitado.`},
    ],
  },
  "RH/Administração": {
    gratuitos: [
      { id: "rh-g1", nome: "MgrWorkbench.ai (freemium) — Redação automática para RH", conteudo: `Gera avaliações de desempenho, planos de desenvolvimento e cartas profissionais com IA. 
 
1. O que é?  
Ferramenta de redação automatizada para RH e gestores, que cria avaliações de desempenho, planos de desenvolvimento, metas anuais e comunicações internas usando IA. 

2. Como funciona?  
Gera rascunhos completos com IA usando boas práticas de gestão, cria feedback baseado em comportamentos, desenvolve planos individuais e ainda oferece um “HR Copilot” para responder dúvidas sobre políticas e processos. 

3. Como usar?  
Criar conta → escolher o tipo de documento (review, meta, plano, carta) → inserir pontos-chave → deixar a IA gerar o texto → editar e exportar.

4. Benefícios  
Economiza horas de trabalho, reduz bloqueio de escrita, padroniza comunicação de RH e melhora a qualidade e clareza das avaliações — mesmo no plano freemium.`},
      { id: "rh-g2", nome: "Rissoto (AI HR Chatbot) — Atendimento interno automatizado", conteudo: `Chatbot que responde perguntas recorrentes de colaboradores usando a base interna de conhecimento.

1. O que é?  
O Rissoto é um help desk de RH com IA que fornece atendimento interno 24/7, respondendo dúvidas de colaboradores, automatizando tarefas repetitivas e gerenciando tickets com inteligência. 

2. Como funciona?  
O chatbot busca respostas na base de conhecimento, Slack, Confluence e políticas internas, resolve problemas recorrentes automaticamente, entende mensagens e screenshots, e encaminha tickets para o time certo quando necessário.

3. Como usar?  
Integrar ao Slack/Teams → colaboradores enviam dúvidas ou solicitações → o bot responde ou executa ações → tickets complexos são encaminhados ao RH com contexto completo.

4. Benefícios  
Reduz carga do RH, elimina perguntas repetidas, melhora a velocidade de resposta, centraliza o suporte e aumenta a satisfação dos colaboradores com atendimento imediato.`},
      { id: "rh-g3", nome: "Breezy HR (free tier) — ATS com automação por IA", conteudo: `Gerencia pipelines de candidatos e automatiza recrutamento inicial. 

1. O que é?  
O Breezy HR é um ATS (Applicant Tracking System) que organiza vagas, candidatos e entrevistas, oferecendo automações e recursos de IA para pequenas e médias empresas — com um plano gratuito chamado Bootstrap. 

2. Como funciona?  
A plataforma automatiza tarefas como postar vagas em +50 job boards, pré‑triagem, envio de e‑mails, agendamento de entrevistas e movimentação no pipeline. A IA (Breezy Intelligence) ajuda a pontuar candidatos, detectar currículos falsos e resumir entrevistas. 

3. Como usar?  
Criar conta → abrir uma vaga → publicar com 1 clique → acompanhar candidatos no pipeline (drag‑and‑drop) → usar automações para triagem, e‑mails e entrevistas → avançar até oferta e contratação.

4. Benefícios  
Economiza tempo no recrutamento, reduz tarefas manuais, melhora organização das etapas e entrega recursos de IA mesmo no plano gratuito (limitado a uma vaga ativa). `},
      { id: "rh-g4", nome: "Reclaim.ai (free tier) — Automação de agenda com foco em bem-estar", conteudo: `Agenda inteligente que reduz burnout através de otimização automática.

1. O que é?  
Reclaim.ai é um agenda inteligente com IA que automatiza horários de tarefas, reuniões, hábitos e pausas — ajudando a melhorar produtividade e equilíbrio entre trabalho e bem‑estar. 

2. Como funciona?  
A IA reorganiza sua agenda em tempo real, defendendo focus time, inserindo pausas automáticas, encontrando os melhores horários para reuniões e mantendo rotinas saudáveis mesmo em semanas cheias. Ele aprende prioridades e ajusta tudo dinamicamente. 

3. Como usar?  
Criar conta → conectar Google/Outlook Calendar → adicionar tarefas, hábitos e metas de foco → deixar a IA preencher e reorganizar sua semana conforme a carga de trabalho muda.

4. Benefícios  
Reduz estresse, evita sobrecarga, aumenta tempo de foco, melhora bem‑estar e ajuda a recuperar até 40% da semana bloqueando automaticamente tempo para o que importa — mesmo no plano gratuito.`},
      { id: "rh-g5", nome: "NotebookLM — Pesquisa e síntese de documentos de RH", conteudo: `Usado para resumir políticas internas, documentos de compliance e manuais. 

1. O que é?  
NotebookLM é um assistente de pesquisa do Google que lê, organiza e resume documentos enviados pelo usuário — ideal para centralizar políticas, manuais, processos e materiais de RH em um só lugar. 

2. Como funciona?  
Você envia PDFs, Docs, Slides, sites ou vídeos; a IA sintetiza, responde perguntas com citações, cruza informações entre arquivos e até gera resumos em áudio, roteiros, briefings, FAQs e análises estruturadas sobre qualquer conjunto de documentos.

3. Como usar?  
Criar um notebook → subir documentos de RH (políticas, onboarding, job descriptions, pesquisas internas) → fazer perguntas ou pedir resumos → usar os outputs para decisões, treinamento ou comunicação interna.

4. Benefícios  
Reduz tempo de leitura, padroniza conhecimento, melhora a qualidade das análises e facilita treinamento de colaboradores ao transformar materiais de RH extensos em resumos claros, FAQs e insights acionáveis — tudo grátis para uso individual.`},
    ],
    pagos: [
      { id: "rh-p1", nome: "Jobscan — Otimização de currículos para ATS", conteudo: `Usa IA para comparar currículos com vagas e gerar relatórios de compatibilidade. 
1. O que é?  
Jobscan é uma ferramenta de otimização de currículos para ATS, que compara seu currículo com uma vaga e mostra o quanto ele combina com os requisitos, aumentando suas chances de entrevista. 

2. Como funciona?  
A IA analisa seu currículo, identifica palavras‑chave ausentes, habilidades relevantes, formatação compatível com ATS e sugere ajustes para superar filtros automáticos usados por recrutadores. Também oferece otimização de LinkedIn e criador de currículos ATS‑friendly. 

3. Como usar?  
Fazer upload do currículo → colar a descrição da vaga → revisar o relatório de compatibilidade → ajustar palavras‑chave, habilidades e estrutura → repetir até aumentar o match.

4. Benefícios  
Ajuda seu currículo a “passar pelos robôs”, destaca pontos fortes, reduz rejeições automáticas e pode aumentar suas chances de entrevista em até 50%.`},
      { id: "rh-p2", nome: "Eightfold AI — People Intelligence & Talent Predictive Analytics", conteudo: `Analisa habilidades, faz previsões de retenção e auxilia em contratações baseadas em competências.

1. O que é?  
Eightfold AI é uma plataforma de Talent Intelligence que usa IA avançada e análise preditiva para apoiar empresas em recrutamento, mobilidade interna, retenção e planejamento de força de trabalho.

2. Como funciona?  
Baseada em deep learning treinado em bilhões de perfis, a plataforma cria um “Talent Graph” que entende habilidades, potencial, trajetória futura e riscos de saída. Ela prevê compatibilidade com vagas, identifica oportunidades de upskilling e oferece insights estratégicos sobre a força de trabalho. 

3. Como usar?  
Conectar ATS/HRIS → analisar candidatos e colaboradores → visualizar correspondência por habilidades → usar recomendações de carreira, mobilidade e reskilling → acessar painéis de análise preditiva para decisões de pessoas.

4. Benefícios  
Aumenta precisão em contratações, reduz tempo de preenchimento, melhora retenção, acelera desenvolvimento interno e entrega inteligência preditiva para construir uma força de trabalho preparada para o futuro.`},
      { id: "rh-p3", nome: "Engagedly (AI Coach Marissa) — Gestão de performance e desenvolvimento", conteudo: `Oferece treinamentos personalizados e insights sobre colaboradores.

1. O que é?  
Engagedly é uma plataforma de gestão de performance, desenvolvimento e engajamento impulsionada pela Marissa™, uma assistente de IA que coordena tarefas e agentes especializados para apoiar líderes, RH e colaboradores. 

2. Como funciona?  
Marissa usa agentic AI para automatizar avaliações de desempenho, gerar feedback, auxiliar no estabelecimento de metas, sugerir trilhas de aprendizado, oferecer análises preditivas de talento e apoiar planejamento de carreira — tudo com inteligência contextual sobre habilidades e objetivos. 

3. Como usar?  
Conectar módulos de performance → utilizar Marissa para gerar reviews e OKRs → acompanhar feedbacks, aprendizados e planos de crescimento → acessar insights preditivos sobre gaps, potencial e mobilidade interna.

4. Benefícios  
Reduz trabalho manual de RH, melhora consistência nas avaliações, acelera desenvolvimento de competências, fortalece alinhamento entre metas e estratégia e entrega inteligência de talento em tempo real.`},
    ],
  },
  Esporte: {
    gratuitos: [
      { id: "esp-g1", nome: "Hooper (Plano Rookie – gratuito) — Estatísticas de basquete via IA", conteudo: `Gera highlights e estatísticas usando gravações simples de celular.

1. O que é?  
App de IA que gera estatísticas e destaques automáticos de basquete a partir de vídeos gravados no celular.

2. Como funciona?  
Analisa o vídeo com visão computacional para detectar arremessos, acertos/erros e posições, criando métricas e mixtapes em jogos de 1x1 a 5x5. 

3. Como usar?  
Abrir o app → posicionar o celular → gravar a partida/treino → deixar a IA processar → ver estatísticas, destaques e progresso no perfil.

4. Benefícios  
Fornece análise rápida de desempenho sem equipamentos extras e oferece estatísticas de nível profissional no plano gratuito.`},
      { id: "esp-g2", nome: "PocketCoach (versão gratuita) — Treinamento guiado por IA", conteudo: `Ferramenta que ajuda atletas com coaching assistido por inteligência artificial. 

1. O que é?  
App de treino guiado por IA que usa visão computacional e feedback em tempo real para ajudar atletas a melhorar técnica e motivação. 

2. Como funciona?  
Analisa seus movimentos via câmera, transforma exercícios em sessões gamificadas, gera métricas de desempenho e orienta ajustes imediatos com IA.

3. Como usar?  
Baixar o app → criar conta → definir objetivos → usar o recurso Playi para capturar treinos → seguir exercícios gamificados e analisar métricas no app.

4. Benefícios  
Fornece treino acessível e estruturado, com motivação, feedback instantâneo e evolução acompanhada mesmo na versão gratuita.`},
      { id: "esp-g3", nome: "Machina Sports — Estratégia e análise tática por IA", conteudo: `Fornece análise de jogo, workflows de IA e integração com CRM para dados esportivos.

1. O que é?  
Plataforma de IA generativa para esportes, usada para criar agentes inteligentes que analisam partidas, estatísticas, táticas e cenários em tempo real.

2. Como funciona?  
Oferece dados ao vivo de grandes ligas, modelos esportivos nativos e workflows de raciocínio que permitem gerar análises táticas, previsões, insights estratégicos e conteúdo automático (highlights, podcasts, previews).

3. Como usar?  
Integrar a API/SDK → acessar dados ao vivo → ativar agentes táticos → gerar análises, simulações e insights para times, ligas, apps esportivos ou plataformas de fãs.

4. Benefícios  
Permite criar análises táticas detalhadas, prever cenários, automatizar insights e transformar dados esportivos em inteligência estratégica em tempo real — sem infraestrutura própria. 
 
`},
      { id: "esp-g4", nome: "iSWIM (versão gratuita) — Análise de natação com IA", conteudo: `Ferramenta que analisa performance em natação e sugere melhorias técnicas.

1. O que é?  
Ferramenta gratuita de análise de natação por IA que transforma vídeos de provas e treinos em métricas detalhadas de performance. 

2. Como funciona?  
A IA identifica automaticamente elementos técnicos (saída, mergulho, underwater, tempos parciais) e entrega insights objetivos para evolução técnica. 

3. Como usar?  
Record a swim race using your phone → upload to the platform → let the AI analyze → review metrics and insights → share with coaches or teammates.

4. Benefícios  
Ajuda atletas e treinadores a melhorar técnica e acompanhar progresso usando apenas o celular, sem equipamentos especiais.
`},
      { id: "esp-g5", nome: "Tenni (gratuito) — Analytics de tênis por IA", conteudo: `Ajuda jogadores com insights automáticos de desempenho e padrões de jogo. 
1. O que é?  
Plataforma gratuita para jogadores de tênis que oferece acompanhamento de progresso por IA, conexão com parceiros locais e ferramentas para organizar treinos e jogos. 

2. Como funciona?  
A IA acompanha evolução técnica, organiza dados de treino, ajuda a encontrar quadras/atletas próximos, cria grupos e oferece recursos de comunidade e gamificação para engajar jogadores e marcas. 

3. Como usar?  
Criar conta → encontrar quadras ou parceiros → registrar treinos e progresso com IA → participar de grupos/torneios → usar a comunidade para melhorar o jogo.

4. Benefícios  
Facilita treinos e jogos, melhora evolução técnica com IA, conecta jogadores e oferece uma experiência completa de comunidade tenística — tudo grátis na versão básica.`},
    ],
    pagos: [
      { id: "esp-p1", nome: "Hudl Sportscode — Análise de vídeo com IA", conteudo: `Amplamente usado por academias e times profissionais; fornece insights via análise automatizada.

1. O que é?  
Software profissional de análise de vídeo e performance usado por equipes de elite para codificar, segmentar e estudar jogos com profundidade tática e técnica. 

2. Como funciona?  
Permite capturar e sincronizar múltiplas câmeras, criar códigos personalizados, automatizar análises com scripts, gerar relatórios visuais e integrar dados externos (GPS, tracking, estatísticas) para insights completos de jogo.

3. Como usar?  
Importar jogos → criar/ou usar janelas de código → marcar eventos → gerar timelines e playlists → exportar insights para treinadores e atletas.

4. Benefícios  
Entrega análise tática profunda, acelera preparação de jogos, integra-se ao ecossistema Hudl e fornece ferramentas de nível profissional para tomada de decisão em alta performance. `},
      { id: "esp-p2", nome: "Dartfish — Ferramenta pro de análise de vídeo esportivo", conteudo: `Utiliza IA para rastrear movimentos, comparar execuções e melhorar performance.

1. O que é?  
Ferramenta profissional de análise de vídeo esportivo, usada para estudo técnico e tático com recursos avançados como marcações, comparações lado a lado e ferramentas de movimento. 

2. Como funciona?  
Permite taggear jogadas, fazer medições técnicas (ângulos, velocidade, trajetória), analisar frame a frame, comparar atletas, criar playlists táticas e integrar dados externos para relatórios completos.

3. Como usar?  
Importar o vídeo → marcar eventos → usar ferramentas de desenho/medição → montar playlists e relatórios → compartilhar com atletas e comissão técnica.

4. Benefícios  
Oferece análise detalhada e visual, melhora feedback técnico, acelera revisão de jogos e é amplamente usado por equipes profissionais em múltiplos esportes.`},
      { id: "esp-p3", nome: "Coach’s Eye — Análise técnica por IA", conteudo: `Usado para análise de movimentos e correção técnica em diversos esportes. 

1. O que é?  
Ferramenta profissional de análise técnica via vídeo, usada por treinadores e atletas para revisar movimentos com precisão (câmera lenta, comparações, anotações e métricas). 

2. Como funciona?  
Permite gravar ou importar vídeos, aplicar replay em câmera lenta, comparar dois vídeos lado a lado, desenhar sobre o frame, adicionar comentários de voz e usar ferramentas como ângulos, timers e spotlight.

3. Como usar?  
Importar ou gravar o vídeo → aplicar câmera lenta/frame‑a‑frame → anotar com desenhos e voz → comparar com outros vídeos → compartilhar com atletas ou equipe técnica.

4. Benefícios  
Melhora análise técnica de qualquer modalidade, acelera correções, facilita feedback visual e funciona apenas com o celular — amplamente usado em esportes, dança e performance.`},
    ],
  },
  Saúde: {
    gratuitos: [
      { id: "sau-g1", nome: "Earkick — Monitoramento de saúde mental", conteudo: `Plataforma gratuita de autocuidado com rastreamento de humor, ansiedade e hábitos, oferecendo insights em tempo real. 
1. O que é?  
Earkick é uma plataforma de monitoramento de saúde mental em tempo real, usando IA para rastrear humor, sintomas, ansiedade e bem‑estar de forma privada e anônima.

2. Como funciona?  
A IA analisa voz, texto, vídeo, batimentos cardíacos e contexto diário para detectar padrões emocionais, prever riscos e sugerir estratégias baseadas em CBT/DBT. 

3. Como usar?  
Abrir o app → registrar humor via voz/texto/vídeo → receber insights, exercícios e acompanhamento contínuo, podendo integrar Apple Watch para métricas biométricas. 

4. Benefícios  
Gera avaliações rápidas, personalizadas e sem coleta de dados pessoais; ajuda a reduzir ansiedade, prevenir burnout e acompanhar progresso emocional no dia a dia.
`},
      { id: "sau-g2", nome: "MindMateGPT — Aconselhamento emocional automatizado", conteudo: `App que utiliza IA para oferecer conselhos personalizados de bem-estar emocional por meio de perguntas guiadas e um chatbot terapeuta.

1. O que é?  
MindMateGPT é um agente de IA voltado para aconselhamento emocional, simulando a terapeuta “Mindy” para oferecer suporte empático e conversas terapêuticas personalizadas. 

2. Como funciona?  
A ferramenta coleta informações sobre personalidade, infância, relações e rotina para adaptar o diálogo e conduzir sessões sensíveis, reflexivas e alinhadas às necessidades do usuário. 

3. Como usar?  
O usuário apenas inicia o chat na web; Mindy faz perguntas guiadas, acompanha padrões, resume sessões e oferece exercícios de autocuidado e insights para desenvolvimento emocional.

4. Benefícios  
Proporciona apoio emocional contínuo, validação afetiva e evolução entre sessões, sem exigir cadastro, garantindo privacidade e acessibilidade imediata.`},
      { id: "sau-g3", nome: "6000 Thoughts — Coach mental por IA", conteudo: `Ferramenta gratuita para autoconsciência, reflexão e identificação de padrões mentais, com análises automatizadas.

1. O que é?  
6000 Thoughts é um coach mental com IA que transforma pensamentos falados ou escritos em clareza emocional, ajudando a entender padrões, vieses e gatilhos internos. 

2. Como funciona?  
O usuário fala ou digita pensamentos; a IA resume temas, identifica causas e efeitos, destaca vieses cognitivos e sugere ferramentas de autorreflexão e crescimento pessoal. 

3. Como usar?  
Basta abrir o app (iOS/Android), registrar pensamentos espontâneos e receber análises, insights, lembretes e acompanhamentos via painel de tendências emocionais.  

4. Benefícios  
Reduz ruído mental, aumenta autoconsciência, acelera breakthroughs e oferece ambiente privado sem coleta de dados, funcionando como diário guiado por IA.`},
      { id: "sau-g4", nome: "MachineTranslation.com (Plano Gratuito) — Tradução para documentos clínicos", conteudo: `Oferece tradução em mais de 270 idiomas, com suporte a formatos clínicos (PDF, DOCX) e uma camada gratuita de uso.

1. O que é?  
MachineTranslation.com é uma plataforma de tradução por IA que combina 22 modelos simultaneamente, oferecendo alta precisão e segurança para documentos sensíveis.  

2. Como funciona?  
A ferramenta compara traduções de múltiplos modelos e seleciona o consenso mais confiável, preservando formatação de PDFs, DOCX e planilhas — útil para materiais clínicos. 

3. Como usar?  
No plano gratuito, basta colar texto ou fazer upload do arquivo; o sistema detecta o idioma, traduz e permite baixar o documento no formato original já traduzido.

4. Benefícios  
Ideal para documentos clínicos por oferecer tradução precisa, anonimização automática de dados e processamento em servidores seguros — sem custo inicial.`},
      { id: "sau-g5", nome: "GnothiAI (Freemium) — Journaling e bem-estari", conteudo: `Diário inteligente que combina escrita com IA para insights de saúde emocional e hábitos.

1. O que é?  
GnothiAI é um diário guiado por IA que combina jornaling, autoconsciência e bem‑estar, oferecendo reflexões inteligentes e apoio à autoexploração.

2. Como funciona?  
A IA analisa suas entradas, identifica temas e padrões, gera resumos e sugere livros, além de integrar hábitos como humor, sono e exercício para insights personalizados.

3. Como usar?  
Criar conta gratuita → escrever reflexões diárias → usar tags, snapshots, prompts gerados pela IA e acompanhar comportamentos que impactam o bem‑estar.

4. Benefícios  
Ajuda na clareza mental, autoconhecimento e consistência no journaling, sem substituir terapia, mas oferecendo uma rotina estruturada de crescimento pessoal. 
`},
    ],
    pagos: [
      { id: "sau-p1", nome: "IBM Watson Health (Merative) — Suporte à decisão clínica", conteudo: `Analisa prontuários, auxilia planejamento oncológico e gestão populacional. Muito usado por grandes hospitais.

1. O que é?  
Merative (antiga IBM Watson Health) é um conjunto de soluções de suporte à decisão clínica, análise de dados e gestão de informações médicas baseado em IA.

2. Como funciona?  
A plataforma usa NLP e modelos de IA para interpretar dados estruturados e não estruturados, oferecendo recomendações, insights e evidências no ponto de cuidado. 

3. Como usar?  
Profissionais acessam soluções como Micromedex e ferramentas analíticas da Merative, integradas a EHRs, para consultar tratamentos, interações medicamentosas e análises clínicas. 

4. Benefícios  
Apoia decisões mais seguras e rápidas, melhora a precisão clínica e reduz riscos, combinando IA com bases de dados médicas robustas e segurança de nível HIPAA.`},
      { id: "sau-p2", nome: "Aidoc — Detecção automática em radiologia", conteudo: `Analisa exames de imagem em tempo real para priorizar emergências e reduzir erros diagnósticos. 

1. O que é?  
Aidoc é uma plataforma de IA para radiologia que detecta achados críticos em imagens médicas, priorizando casos urgentes e acelerando o fluxo clínico. 

2. Como funciona?  
Seus algoritmos FDA‑cleared analisam tomografias em tempo real, identificando condições como hemorragias, embolia pulmonar e múltiplas lesões abdominais em um único exame. 

3. Como usar?  
A solução se integra ao PACS/EHR; os achados são sinalizados automaticamente na worklist, permitindo ao radiologista revisar rapidamente e acionar equipes clínicas pelo aiOS™. 

4. Benefícios  
Reduz o tempo até o diagnóstico, diminui risco de atrasos em EDs congestionados e melhora a segurança do paciente, com alta sensibilidade e baixa taxa de falsos alertas.`},
      { id: "sau-p3", nome: "Nuance DAX Copilot — Documentação ambulatorial automática", conteudo: `Capta conversas médico–paciente e gera notas clínicas estruturadas. 
1. O que é?  
Ferramenta que usa IA conversacional + áudio ambiente para gerar notas clínicas automaticamente após a consulta. 

2. Como funciona?  
Capta a conversa do atendimento e transforma em resumo clínico estruturado, pronto para revisão e envio ao EHR. 

3. Como usar ?  
Abrir o app → conversar normalmente com o paciente → revisar o resumo → enviar ao prontuário. 

4. Benefícios  
Reduz grande parte do tempo de documentação, melhora a qualidade das notas e diminui burnout. `},
    ],
  },
};

const todasAreas = Object.keys(dadosIniciais);

function GrupoAccordion({ itens }: { itens: ItemAccordion[] }) {
  if (itens.length === 0) return null;
  return (
    <Accordion.Root type="multiple" className="space-y-2">
      {itens.map((item) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className="bg-[#1a4a6e] rounded-lg overflow-hidden"
        >
          <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-3 text-white text-sm font-medium hover:bg-[#1f5480] transition-colors group">
            <span className="text-left">{item.nome}</span>
            <svg
              className="w-4 h-4 text-white/60 transition-transform duration-200 group-data-[state=open]:rotate-180 flex-shrink-0 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Accordion.Trigger>
          <Accordion.Content className="px-4 py-3 text-white/75 text-sm border-t border-white/10 whitespace-pre-line">
            {item.conteudo}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

interface SecaoAccordionProps {
  areaSelecionada: string;
}

export default function SecaoAccordion({ areaSelecionada }: SecaoAccordionProps) {
  const [areaAtual, setAreaAtual] = useState(areaSelecionada || "");

  useEffect(() => {
    if (areaSelecionada) setAreaAtual(areaSelecionada);
  }, [areaSelecionada]);

  const dados = areaAtual ? dadosIniciais[areaAtual] : null;

  return (
    <section className="w-full bg-[#0d2137] py-16 px-8">
      <div className="max-w-xl mx-auto">
        <p className="text-white/80 text-sm mb-2">Escolha sua área de interesse:</p>
        <div className="relative mb-8">
          <select
            value={areaAtual}
            onChange={(e) => setAreaAtual(e.target.value)}
            className="w-full bg-white text-gray-800 text-sm rounded-md px-4 py-2.5 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Selecione sua área de interesse aqui
            </option>
            {todasAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {dados && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setAreaAtual("")}
                className="text-white/70 hover:text-white text-lg leading-none"
              >
                &lsaquo;
              </button>
              <h2 className="text-white font-semibold text-xl">{areaAtual}</h2>
            </div>
            <hr className="border-white/20 mb-8" />

            {dados.gratuitos.length > 0 && (
              <div className="mb-8">
                <p className="text-white/70 text-sm mb-3">Gratuitos:</p>
                <GrupoAccordion itens={dados.gratuitos} />
              </div>
            )}

            {dados.pagos.length > 0 && (
              <div>
                <p className="text-white/70 text-sm mb-3">Pagos:</p>
                <GrupoAccordion itens={dados.pagos} />
              </div>
            )}
          </>
        )}

        {!dados && (
          <p className="text-white/40 text-sm text-center py-12">
            Selecione sua área de interesse e veja como a inteligência artificial pode ajudar nas suas atividades.
          </p>
        )}
      </div>
    </section>
  );
}
