import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Mail, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Cadastro e Login',
    question: 'Como faço meu cadastro no aplicativo?',
    answer: 'Para se cadastrar, clique em "Cadastrar" na tela inicial, preencha seus dados pessoais, escolha uma sub-sede e finalize o cadastro. Você receberá um e-mail de confirmação.'
  },
  {
    id: '2',
    category: 'Cadastro e Login',
    question: 'Esqueci minha senha. Como recupero?',
    answer: 'Na tela de login, clique em "Esqueceu sua senha" e informe seu e-mail. Você receberá um link para redefinir sua senha.'
  },
  {
    id: '3',
    category: 'Perfil',
    question: 'Como editar minhas informações pessoais?',
    answer: 'Acesse o menu "Configurações" > "Minhas informações" para editar seus dados pessoais, endereço, redes sociais e informações de saúde.'
  },
  {
    id: '4',
    category: 'Perfil',
    question: 'O que é a carteirinha de emergência?',
    answer: 'É uma versão digital da sua carteirinha de sócio com informações médicas importantes e contato de emergência. Acesse pelo botão central na barra inferior.'
  },
  {
    id: '5',
    category: 'Eventos',
    question: 'Como confirmo presença em um evento?',
    answer: 'Na página do evento, clique em "Confirmar Presença". Você receberá uma notificação de confirmação e poderá acompanhar os detalhes.'
  },
  {
    id: '6',
    category: 'Loja',
    question: 'Como comprar produtos na loja?',
    answer: 'Navegue até a seção "Loja", escolha seus produtos, adicione ao carrinho e finalize a compra. Aceitamos various formas de pagamento.'
  },
  {
    id: '7',
    category: 'Loja',
    question: 'Como acompanho meu pedido?',
    answer: 'Após a compra, você receberá o código de rastreamento por e-mail e poderá acompanhar o status do pedido na seção "Meus Pedidos".'
  },
  {
    id: '8',
    category: 'Chat',
    question: 'Como funciona o chat da torcida?',
    answer: 'O chat permite comunicação em tempo real com outros Gaviões. Crie canais temáticos ou participe dos canais existentes para compartilhar informações.'
  },
  {
    id: '9',
    category: 'Pagamentos',
    question: 'Como pagar minha mensalidade de sócio?',
    answer: 'Acesse "Gavião Sócio" > "Pagar" para efetuar o pagamento. Aceitamos cartão de crédito, débito e PIX.'
  },
  {
    id: '10',
    category: 'Notificações',
    question: 'Como gerenciar minhas notificações?',
    answer: 'Acesse a seção de notificações pelo menu para visualizar todas as mensagens. Você pode marcar como lidas e configurar preferências.'
  }
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const groupedFaqs = categories.reduce((acc, category) => {
    acc[category] = filteredFaqs.filter(faq => faq.category === category);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black z-10 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Central de Ajuda</h1>
      </header>

      <main className="p-4 space-y-6">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar ajuda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
          />
        </div>

        {/* Contato Rápido */}
        <div className="grid grid-cols-1 gap-4">
          <Button className="bg-red-600 hover:bg-red-700 text-white h-14 flex items-center justify-center space-x-2">
            <MessageCircle size={20} />
            <span>Chat com Suporte</span>
          </Button>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 h-12">
              <Phone size={18} className="mr-2" />
              Telefone
            </Button>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 h-12">
              <Mail size={18} className="mr-2" />
              E-mail
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Perguntas Frequentes</h2>
          
          {Object.entries(groupedFaqs).map(([category, faqs]) => (
            <div key={category} className="bg-gray-900/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
              >
                <h3 className="font-semibold">{category}</h3>
                {expandedCategory === category ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              
              {expandedCategory === category && (
                <div className="px-4 pb-4 space-y-3">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border-l-2 border-red-600 pl-4">
                      <h4 className="font-medium mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Links Úteis */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Links Úteis</h2>
          <div className="space-y-2">
            <Link to="/estatuto" className="block p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors">
              <h3 className="font-medium">Estatuto do Sócio</h3>
              <p className="text-sm text-gray-400">Leia o estatuto completo da torcida</p>
            </Link>
            
            <Link to="/historia" className="block p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors">
              <h3 className="font-medium">Nossa História</h3>
              <p className="text-sm text-gray-400">Conheça a história dos Gaviões da Fiel</p>
            </Link>
            
            <Link to="/socio" className="block p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors">
              <h3 className="font-medium">Seja Sócio</h3>
              <p className="text-sm text-gray-400">Informações sobre como se associar</p>
            </Link>
          </div>
        </div>

        {/* Contato Direto */}
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-bold">Precisa de ajuda pessoal?</h2>
          <p className="text-gray-300">Nossa equipe está disponível para ajudar:</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-red-500" />
              <span>(11) 3003-XXXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-red-500" />
              <span>suporte@gavioes.com.br</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle size={16} className="text-red-500" />
              <span>Chat disponível 24/7</span>
            </div>
          </div>
          
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
            Falar com Suporte Agora
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;