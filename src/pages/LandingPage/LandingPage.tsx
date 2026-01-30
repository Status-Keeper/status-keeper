
import { Brand } from '../../components/Brand';
import { Button } from '../../components/Button';
import { FeatureCard } from '../../components/FeatureCard';
import { StepCard } from '../../components/StepCard';
import './LandingPage.css';

export function LandingPage() {
  return (
    <div className="lp">
      <header className="lpHeader">
        <div className="container lpHeader__inner">
          <Brand />

          <nav className="lpNav" aria-label="Навигация">
            <a href="#customers">Клиентам</a>
            <a href="#how">Как работает</a>
            <a href="#crews">Бригадам</a>
            <a href="#contact">Контакты</a>
          </nav>

          <div className="lpHeader__cta">
            <Button as="a" href="#lead" variant="primary">
              Написать бригаде
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero__bg" aria-hidden="true" />
          <div className="container hero__inner">
            <div className="hero__left">
              <h1 className="hero__title">
                Statuskeeper покажет,
                <br />
                что происходит на ремонте,
                <br />
                когда вас нет
              </h1>
              <p className="hero__subtitle">
                Платформа для прозрачного ремонта. Будьте в курсе каждого этапа работ в реальном времени.
              </p>

              <div className="hero__actions">
                <Button as="a" href="#lead" variant="accent">
                  Попробовать бесплатно
                </Button>
              </div>
            </div>

            <div className="hero__right" aria-label="Иллюстрация">
              <div className="heroArt">
                <div className="heroArt__phone" aria-hidden="true" />
                <div className="heroArt__worker" aria-hidden="true" />
              </div>
            </div>
          </div>


        </section>

        <section id="customers" className="section">
          <div className="container">
            <h2 className="sectionTitle">За что ценят заказчики</h2>

            <div className="grid3">
              <FeatureCard
                title="Вас держат в курсе, даже если ушли"
                text="Вы получаете обновления по этапам и не переживаете, что «что-то сделали не так»."
              />
              <FeatureCard
                title="Вы видите процесс, в реальном времени"
                text="Фото/видео-отчёты и статусы приходят сразу — без лишних звонков и переписок."
              />
              <FeatureCard
                title="Видите все этапы: от демонтажа до финиша"
                text="Единая картина ремонта: что уже готово, что в работе и что дальше по плану."
              />
            </div>
          </div>
        </section>

        <section id="how" className="section section--soft">
          <div className="container">
            <h2 className="sectionTitle">Как это работает</h2>
            <p className="sectionLead">Простой алгоритм повышения прозрачности ремонта</p>

            <div className="steps">
              <StepCard num={1} title="Бригада выполняет работы" text="Работает по обычному плану, фиксируя этапы." />
              <StepCard
                num={2}
                title="Фото/видеоотчёты загружаются в платформу"
                text="Материалы прикрепляются к этапам ремонта."
              />
              <StepCard
                num={3}
                title="Statuskeeper уведомляет о новых событиях"
                text="Заказчик получает ссылку и видит прогресс."
              />
              <StepCard num={4} title="Заказчик получает честный прогресс ремонта" text="Понимание сроков и фактов, без «когда-нибудь»." />
            </div>
          </div>
        </section>

        <section id="crews" className="section">
          <div className="container">
            <h2 className="sectionTitle">За что ценят бригады</h2>
            <p className="sectionLead">Простой инструмент повышения прозрачности ремонта</p>

            <div className="grid3 grid3--compact">
              <FeatureCard kicker="1" title="Доверие заказчика растёт" text="У заказчика меньше тревоги — у вас меньше спорных ситуаций." />
              <FeatureCard kicker="2" title="Менеджер не отвлекается от дел" text="Ответы на типовые вопросы автоматизируются через статусы и отчёты." />
              <FeatureCard kicker="3" title="Покажите результат быстро" text="Клиент видит прогресс — легче принимать этапы и оплачивать работы." />
            </div>
          </div>
        </section>

        <section id="lead" className="cta">
          <div className="cta__bg" aria-hidden="true" />
          <div className="container cta__inner">
            <h2 className="cta__title">Запишитесь в лидеры прозрачного ремонта</h2>
            <div className="cta__actions">
              <Button as="a" href="#contact" variant="accent">
                Оставить заявку
              </Button>
              <div className="cta__meta">25 бригад уже в системе</div>
            </div>
          </div>

        </section>

        <footer id="contact" className="footer">
          <div className="container footer__inner">
            <Brand small />
            <div className="footer__links">
              <a href="#customers">Заказчикам</a>
              <a href="#crews">Бригадам</a>
              <a href="#how">Как работает</a>
            </div>
            <div className="footer__copy">© {new Date().getFullYear()} Status Keeper</div>
          </div>
        </footer>
      </main>
    </div>
  )
}
