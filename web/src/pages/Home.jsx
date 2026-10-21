// Página inicial do aluno: oferece atalhos aos canais, respostas do FAQ e
// links de contato. Os formulários são acessados pelos atalhos de navegação.
import NavBlockButton from "../components/NavBlockButton";
import Accordion from "../components/Accordion";

import Screen from "../components/Screen";
import image from "../assets/images/main_banner.png";

export default function Home() {
  return (
    <Screen banner={image}>

      {/* Atalhos principais direcionam aos espaços de feedback e relato. */}
      <section className="main-navigation">
        <h1 className="visually-hidden">FalaEtec</h1>
        <nav className="button-box" aria-label="Serviços da escola">
          <NavBlockButton image="FE" page="./sub/feedbackescolar" label="Feedback Escolar" />
          <NavBlockButton image="CS" page="./sub/canalseguro" label="Canal Seguro" />
        </nav>
      </section>

      {/* Dúvidas frequentes são renderizadas como painéis recolhíveis. */}
      <section className="faq">
        <h2 className="title"><span>FAQ</span>Perguntas Frequentes</h2>

        <Accordion title="O que é o Canal Seguro?">
          <p>O Canal Seguro é um espaço para alunos relatarem situações ou acontecimentos que precisam da atenção da escola, de forma segura e confidencial.</p>
        </Accordion>

        <Accordion title="Meu relato ou avaliação é anônimo?">
          <p>Você pode escolher enviar um relato ou avaliação de forma anônima. Nesse caso, professores não terão acesso à sua identidade. Porém, se for necessário para a apuração ou encaminhamento da situação, gestores autorizados poderão identificar o aluno.</p>
        </Accordion>

        <Accordion title="Quem pode visualizar o que eu enviar?">
          <p>As informações são encaminhadas somente aos responsáveis autorizados pela escola. O acesso é restrito para preservar a privacidade e a segurança das informações.</p>
        </Accordion>

        <Accordion title="Posso acompanhar o que aconteceu com meu relato?">
          <p>Sim. Quando essa função estiver disponível, o aplicativo permite acompanhar o andamento do relato e verificar atualizações ou respostas da equipe responsável.</p>
        </Accordion>

        <Accordion title="Posso enviar avaliações e sugestões?">
          <p>Sim! O aplicativo também é um espaço para você avaliar a escola e enviar sugestões sobre estrutura, atividades, atendimento, convivência, segurança e outros aspectos que possam contribuir para melhorar a experiência de todos.</p>
        </Accordion>
        
      </section>

      {/* Artes de contato reaproveitam o componente de botão em bloco. */}
      <section className="contact">
        <h2 className="title">Entre<span>Contato</span></h2>

        <nav className="button-box" aria-label="Redes sociais">
          <NavBlockButton image="WA" label="WhatsApp" />
          <NavBlockButton image="FB" label="Facebook" />
        </nav>

        <nav className="button-box" aria-label="Site da escola">
          <NavBlockButton image="SITE" label="Site da escola" />
        </nav>

      </section>

    </Screen>
  );
}

