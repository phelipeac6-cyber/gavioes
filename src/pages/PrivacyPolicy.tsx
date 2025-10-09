import { PageLayout } from "@/components/PageLayout";

const PrivacyPolicy = () => {
  return (
    <PageLayout title="Política de Privacidade">
      <div className="prose prose-invert max-w-none text-gray-300">
        <h1>Política de Privacidade</h1>
        <p>Última atualização: 15 de Julho de 2024</p>
        <p>
          A Gaviões da Fiel ("nós", "nosso" ou "nos") opera o aplicativo móvel Gaviões da Fiel (o "Serviço").
        </p>
        <p>
          Esta página informa sobre nossas políticas relativas à coleta, uso e divulgação de dados pessoais quando você usa nosso Serviço e as escolhas que você associou a esses dados.
        </p>
        <h2>Coleta e Uso de Informações</h2>
        <p>
          Coletamos vários tipos diferentes de informações para várias finalidades, para fornecer e melhorar nosso Serviço para você.
        </p>
        <h2>Tipos de Dados Coletados</h2>
        <h3>Dados Pessoais</h3>
        <p>
          Ao usar nosso Serviço, podemos solicitar que você nos forneça algumas informações de identificação pessoal que podem ser usadas para contatá-lo ou identificá-lo ("Dados Pessoais"). As informações de identificação pessoal podem incluir, mas não se limitam a:
        </p>
        <ul>
          <li>Endereço de e-mail</li>
          <li>Nome e sobrenome</li>
          <li>Número de telefone</li>
          <li>Endereço, Estado, Província, CEP/Código Postal, Cidade</li>
        </ul>
        <h2>Segurança dos Dados</h2>
        <p>
          A segurança dos seus dados é importante para nós, mas lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus Dados Pessoais, não podemos garantir sua segurança absoluta.
        </p>
        <h2>Contate-Nos</h2>
        <p>
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:
        </p>
        <ul>
          <li>Por e-mail: contato@gavioes.com.br</li>
        </ul>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;