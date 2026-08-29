import NavBlockButton from "../components/NavBlockButton";
import Accordion from "../components/Accordion";

import Screen from "../components/Screen";
import image from "../assets/images/main_banner.png";

export default function Home() {
  return (
    <Screen banner={image}>

      <section className="main-navigation">
        <nav className="button-box">
          <NavBlockButton image="FE" page="./sub/feedbackescolar" />
          <NavBlockButton image="CS" page="./sub/canalseguro" />
        </nav>
      </section>

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

      <section className="contact">
        <h2 className="title">Entre<span>Contato</span></h2>

        <nav className="button-box">
          <NavBlockButton image="WA" />
          <NavBlockButton image="FB" />
        </nav>

        <nav className="button-box">
          <NavBlockButton image="SITE" />
        </nav>

      </section>

    </Screen>
  );
}

