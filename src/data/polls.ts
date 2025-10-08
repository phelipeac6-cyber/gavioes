import { Poll } from "@/types";

export const polls: Poll[] = [
  {
    id: 1,
    question: "Qual deve ser o tema do nosso próximo bandeirão?",
    options: [
      { id: 1, text: "Homenagem ao Sócrates", votes: 150 },
      { id: 2, text: "A Fiel é a nossa força", votes: 320 },
      { id: 3, text: "Raça e Tradição", votes: 210 },
    ],
    totalVotes: 680,
  },
  {
    id: 2,
    question: "Qual a sua música preferida da arquibancada?",
    options: [
      { id: 1, text: "Eu nunca vou te abandonar", votes: 450 },
      { id: 2, text: "Aqui tem um bando de louco", votes: 280 },
      { id: 3, text: "Coringão, Coringão!", votes: 150 },
    ],
    totalVotes: 880,
  },
  {
    id: 3,
    question: "Qual jogador histórico você gostaria de ver homenageado na sede?",
    options: [
      { id: 1, text: "Marcelinho Carioca", votes: 550 },
      { id: 2, text: "Neto", votes: 310 },
      { id: 3, text: "Ronaldo Fenômeno", votes: 420 },
      { id: 4, text: "Cássio", votes: 610 },
    ],
    totalVotes: 1890,
  },
];