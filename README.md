# Felipe Feitosa | Engenheiro de Dados

Portfólio estático em HTML, CSS e JavaScript, compatível com GitHub Pages. A estrutura retoma a apresentação pessoal e o logo do portfólio original, com conteúdo voltado à engenharia de dados.

## Executar

Abra `index.html` no navegador ou execute na pasta do projeto:

```sh
python3 -m http.server 4173
```

Acesse `http://localhost:4173`. Não há instalação de pacotes nem etapa de build.

## Arquivos

- `index.html`: conteúdo, projetos, detalhes técnicos e ícones SVG Phosphor incorporados.
- `style.css`: layout responsivo, cores, tipografia e estados de interação.
- `script.js`: menu móvel, filtros de projetos, indicação da seção atual e visualizador de imagens.
- `preferences.js`: alternância de tema e idioma, rótulos acessíveis e persistência local.
- `translations.js`: traduções do português para inglês britânico.
- `assets/covers/`: imagens reais dos repositórios e diagrama do pipeline de países.
- `assets/images/`: logo original e favicon.
- `assets/fonts/`: IBM Plex Sans e licença SIL Open Font License.
- `assets/icons/`: SVGs oficiais do Phosphor, licença MIT e versão utilizada.
- `.nojekyll`: permite servir o projeto sem processamento pelo Jekyll.

Todos os recursos são locais. Não há CDN, rastreamento, e-mail, formulário de contato, currículo para download ou imagem da capa do LinkedIn. Os links externos apontam apenas para LinkedIn, GitHub e os repositórios dos projetos.

## Atualizar projetos e capas

Os cards e os detalhes técnicos estão diretamente em `index.html`, disponíveis também sem JavaScript.

| Projeto | Imagem |
| --- | --- |
| SQL Data Warehouse | `assets/covers/warehouse.png` |
| Countries Data Pipeline | `assets/covers/countries.svg` |
| Análise de e-commerce — Olist | `assets/covers/olist.png` |
| NBA Stat Predictor | `assets/covers/nba.jpg` |
| Identificação de cargas elétricas — NILM | `assets/covers/nilm.png` |

Para trocar uma capa:

1. Coloque a nova imagem em `assets/covers/`. JPG, PNG, WebP e SVG são aceitos.
2. No card correspondente, atualize o `src` do `<img>` **e** o atributo `data-image` do botão que contém a imagem.
3. Atualize o texto alternativo `alt` e a legenda `.image-caption`.

As imagens usam `object-fit: contain`, para não cortar os diagramas ou dashboards. O botão abre uma versão maior em um diálogo, com fechamento pelo botão, pela tecla Escape ou por clique fora da janela.

Para adicionar um projeto, duplique um `<article class="project-card">`, atualize título, texto, imagem, tecnologias e link do repositório. Use `data-category="engineering"` ou `data-category="analytics"`, e atualize as contagens iniciais dos filtros e `.project-count`. Os detalhes técnicos usam `<details>` e `<summary>` nativos.

## Fontes do conteúdo e das imagens

As informações profissionais vieram do perfil LinkedIn fornecido. Os textos dos projetos foram conferidos nos respectivos READMEs. Não foram adicionadas métricas comerciais ou resultados de produção.

- [SQL Data Warehouse](https://github.com/felipeft/sql-data-warehouse-project): capa em `docs/data_architecture.png`. Projeto de estudo desenvolvido no curso Data With Baraa, com implementação, refatoração da organização e documentação de Felipe. O crédito está no card e nos detalhes técnicos.
- [Countries Data Pipeline](https://github.com/felipeft/countries-data-pipeline): diagrama local baseado nas etapas documentadas no repositório; não é screenshot de uma aplicação.
- [Olist](https://github.com/felipeft/Brazillian_e-commerce): `screenshot.png` do aplicativo Streamlit.
- [NBA Stat Predictor](https://github.com/felipeft/nba_stat_predictor): `screenshot.jpg` do dashboard.
- [NILM / TCC](https://github.com/felipeft/tcc_nilm_identification): `reports/figures_tcc/figura_analise_fft_corrigida.png`.

As imagens dos repositórios foram copiadas sem alterações. O logo foi recuperado do ZIP do portfólio original. As cores são inspiradas na referência visual fornecida, sem usar a fotografia como fundo.

Os ícones são do pacote oficial `@phosphor-icons/core` 2.1.1, variante Regular, sob licença MIT. A fonte é IBM Plex Sans, distribuída sob SIL Open Font License. Ambas as licenças estão incluídas no projeto. Os ícones usados na página estão incorporados em um sprite SVG no HTML; adicionar um novo ícone exige inserir seu `<symbol>` e referenciá-lo por `<use>`.

## Publicar no GitHub Pages

1. Copie o conteúdo do projeto para a raiz de `felipeft/felipeft.github.io`.
2. Faça commit e push na branch de publicação.
3. Em **Settings → Pages**, se necessário, escolha **Deploy from a branch**, a branch `main` e `/ (root)`.

O endereço previsto é `https://felipeft.github.io/`. Para outro endereço, atualize a URL canônica, Open Graph e JSON-LD em `index.html`.

Esta pasta é uma cópia local sem um histórico Git utilizável. A refatoração não faz commit, push ou alteração no site publicado.

## Verificação da refatoração

Validados no navegador: filtros (2 projetos de engenharia e 3 de análise/ML), detalhes técnicos, ampliação da capa do warehouse, fechamento por Escape e menu móvel. Layout inspecionado em desktop e celular, sem transbordamento horizontal nas larguras de 320, 390, 768 e 1440 px. Nenhum erro registrado no console durante a verificação. Referências locais, imagens, SVGs e sintaxe do JavaScript também conferidos.

## Tema e idioma

O cabeçalho segue a ordem das seções: Início, Projetos, Sobre, Tecnologias e Experiência. Os botões à direita alternam entre tema escuro/claro e português/inglês britânico. A bandeira representa o idioma atual (Brasil ou Reino Unido); o rótulo acessível informa o idioma de destino. As preferências são salvas no navegador usando `localStorage`, com funcionamento normal mesmo quando o armazenamento está bloqueado. A primeira visita usa português e tema escuro.

Ao editar textos em português no HTML, atualize também as chaves e traduções em `translations.js`. Os textos, descrições de imagens e detalhes técnicos são traduzidos; screenshots originais dos repositórios permanecem inalterados. O diagrama local de países possui uma versão em inglês em `assets/covers/countries-en.svg`.

Verificados os dois idiomas e temas, persistência ao recarregar, filtros ativos durante a troca de idioma, rótulos do visualizador de imagens e menu móvel. Sem transbordamento horizontal nas larguras de 320, 390, 768, 1024 e 1440 px e sem erros de console durante os testes.
