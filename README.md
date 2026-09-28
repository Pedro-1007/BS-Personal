# BS Personal — MVP

Aplicativo mobile demonstrativo para personal trainers montarem fichas e acompanharem a evolução dos alunos.

## Executar

1. Instale as dependências: `npm install`
2. Inicie o Expo: `npm start`
3. Leia o QR code pelo Expo Go ou use `npm run android` / `npm run ios`.

Para abrir no navegador, use `npm run web`. Para verificar o TypeScript, use `npm run typecheck`.

## O que está incluído

- Dois modos simulados: aluno e personal trainer.
- Treino interativo com registro de séries e carga.
- Histórico/evolução e celebração ao completar um treino.
- Painel do personal, lista e detalhe de alunos, fichas e biblioteca de exercícios.
- Portal profissional separado, com indicadores financeiros, atividade da carteira e relatórios de alunos.
- Cadastro individual do aluno com resumo, avaliação inicial, ficha atual e planejamento semanal no mesmo espaço.
- Montador de fichas dentro do cadastro, com biblioteca local de exercícios e publicação de treinos personalizados.
- Cadastro de exercícios com seleção de foto ou vídeo da galeria.
- Inativação de alunos preservando o cadastro e mensalidade individual refletida no painel financeiro.
- Duração da ficha em semanas e indicador de revisão nos sete dias anteriores ao vencimento.
- Identidade visual própria em branco, cinza-claro e laranja.
- Navegação e hierarquia inspiradas nos padrões consolidados do projeto Chama Aí.
- Dados simulados separados da interface para facilitar a futura integração com uma API.

## Estrutura

- `App.tsx`: navegação principal e estados globais do protótipo.
- `src/theme.ts`: cores, superfícies e sombras da identidade BS Personal.
- `src/data.ts`: alunos, fichas e exercícios simulados.
- `src/components/UI.tsx`: componentes compartilhados, cabeçalho e navegação.
- `src/screens/AuthScreens.tsx`: seleção de acesso e login.
- `src/screens/StudentScreens.tsx`: jornada completa do aluno, incluindo a visualização do plano semanal.
- `src/screens/TrainerScreens.tsx`: gestão do personal, incluindo a edição do calendário de ciclo.

## Limites do protótipo

Os acessos são simulados e os dados são fictícios. Alterações de cadastros, fichas e mídias ficam em memória durante a sessão e são reiniciadas ao recarregar o app. Os arquivos selecionados da galeria ainda não são enviados para um servidor nem compartilhados entre aparelhos. Parte dos indicadores e relatórios permanece demonstrativa.

## Próximos passos

Adicionar autenticação e perfis reais, banco de dados, vídeos hospedados, notificações push e uma camada de API (por exemplo, Supabase ou Firebase). Dados de saúde devem ser tratados segundo a LGPD, com consentimento e controles de acesso.
