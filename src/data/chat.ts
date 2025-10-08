import gavioesLogo from "@/assets/gavioes-logo.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";

export const channels = [
  { id: 1, name: 'Diretoria', avatar: gavioesLogo, lastMessage: '0:14', timestamp: '11/15/19', type: 'audio' as const },
  { id: 2, name: 'Geral', avatar: gavioesLogo, lastMessage: 'O objetivo é chegar ao gol e atirar...', timestamp: '11/15/19', type: 'text' as const, read: true },
  { id: 3, name: 'Presidente', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400', lastMessage: '0:14', timestamp: '11/15/19', type: 'audio' as const },
  { id: 4, name: 'Esporte da Sorte', avatar: esportesDaSorteLogo, lastMessage: 'Cupom na area Galera', timestamp: '11/15/19', type: 'text' as const, read: true },
];

export const messages = [
    { type: 'date', content: '6 Outubro 2025' },
    { id: 1, sender: 'Diretoria', content: 'Oi', time: '9:13 pm', sentByMe: false },
    { id: 2, sender: 'Diretoria', content: 'Tudo bem com vcs?', time: '9:13 pm', sentByMe: false },
    { id: 3, sender: 'Você', content: 'Tudo Otimo e vc ??', time: '9:13 pm', sentByMe: true },
    { id: 4, sender: 'Marcos', content: 'Bom dia, onde vamos encontrar pro jogo?', time: '9:22 pm', sentByMe: false },
    { id: 5, sender: 'Marcos', content: '????', time: '9:22 pm', sentByMe: false },
    { id: 6, sender: 'Você', content: 'Tbm quero saber onde vamos noc consentrar para o jogo de hoje, e o horario para a concentração', time: '5:02 am', sentByMe: true },
    { id: 7, sender: 'Gabriel', content: 'Na frente da Neo?', time: '5:27 am', sentByMe: false },
    { id: 8, sender: 'Gabriel', content: 'Me avisem', time: '5:27 am', sentByMe: false },
];