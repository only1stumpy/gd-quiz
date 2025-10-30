"use client";
import useLanguageStore from "@/store/useLanguageStore";

export default function PrivacyPage() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: October 30, 2025",
      intro1:
        "This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.",
      intro2:
        "We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.",
      sections: {
        interpretation: {
          title: "Interpretation and Definitions",
          interpretation: {
            title: "Interpretation",
            text: "The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
          },
          definitions: {
            title: "Definitions",
            intro: "For the purposes of this Privacy Policy:",
            items: [
              {
                term: "Company",
                text: '(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to GDQuiz.',
              },
              {
                term: "Cookies",
                text: "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.",
              },
              {
                term: "Country",
                text: "refers to: Moldova",
              },
              {
                term: "Device",
                text: "means any device that can access the Service such as a computer, a cell phone or a digital tablet.",
              },
              {
                term: "Personal Data",
                text: "is any information that relates to an identified or identifiable individual.",
              },
              {
                term: "Service",
                text: "refers to the Website.",
              },
              {
                term: "Website",
                text: "refers to GDQuiz, accessible from https://gd-quiz.vercel.app/",
              },
              {
                term: "You",
                text: "means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.",
              },
            ],
          },
        },
        collecting: {
          title: "Collecting and Using Your Personal Data",
          types: {
            title: "Types of Data Collected",
            personal: {
              title: "Personal Data",
              text: "While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to Usage Data.",
            },
            usage: {
              title: "Usage Data",
              text1: "Usage Data is collected automatically when using the Service.",
              text2:
                "Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.",
            },
            cookies: {
              title: "Tracking Technologies and Cookies",
              text: "We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. We use both Session and Persistent Cookies for essential website functionality.",
            },
          },
          use: {
            title: "Use of Your Personal Data",
            text: "The Company may use Personal Data to provide and maintain our Service, monitor usage, and improve user experience.",
          },
          retention: {
            title: "Retention of Your Personal Data",
            text: "The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy.",
          },
          security: {
            title: "Security of Your Personal Data",
            text: "The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.",
          },
        },
        children: {
          title: "Children's Privacy",
          text: "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.",
        },
        changes: {
          title: "Changes to this Privacy Policy",
          text: 'We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.',
        },
        contact: {
          title: "Contact Us",
          text: "If you have any questions about this Privacy Policy, You can contact us:",
          email: "By email: rei228322@gmail.com",
        },
      },
    },
    ru: {
      title: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление: 30 октября 2025",
      intro1:
        "Эта Политика конфиденциальности описывает наши правила и процедуры сбора, использования и раскрытия вашей информации при использовании Сервиса, а также информирует вас о ваших правах на конфиденциальность и о том, как закон защищает вас.",
      intro2:
        "Мы используем ваши Персональные данные для предоставления и улучшения Сервиса. Используя Сервис, вы соглашаетесь на сбор и использование информации в соответствии с настоящей Политикой конфиденциальности.",
      sections: {
        interpretation: {
          title: "Толкование и определения",
          interpretation: {
            title: "Толкование",
            text: "Слова, первые буквы которых написаны с заглавной буквы, имеют значения, определенные в следующих условиях. Следующие определения имеют одинаковое значение независимо от того, встречаются ли они в единственном или множественном числе.",
          },
          definitions: {
            title: "Определения",
            intro: "Для целей настоящей Политики конфиденциальности:",
            items: [
              {
                term: "Компания",
                text: '(именуемая как "Компания", "Мы", "Нас" или "Наш" в настоящем Соглашении) относится к GDQuiz.',
              },
              {
                term: "Cookies (куки)",
                text: "это небольшие файлы, которые размещаются на вашем компьютере, мобильном устройстве или любом другом устройстве веб-сайтом, содержащие детали вашей истории просмотров на этом веб-сайте среди множества других целей.",
              },
              {
                term: "Страна",
                text: "относится к: Молдова",
              },
              {
                term: "Устройство",
                text: "означает любое устройство, которое может получить доступ к Сервису, такое как компьютер, мобильный телефон или планшет.",
              },
              {
                term: "Персональные данные",
                text: "это любая информация, которая относится к идентифицированному или идентифицируемому лицу.",
              },
              {
                term: "Сервис",
                text: "относится к Веб-сайту.",
              },
              {
                term: "Веб-сайт",
                text: "относится к GDQuiz, доступному по адресу https://gd-quiz.vercel.app/",
              },
              {
                term: "Вы",
                text: "означает лицо, получающее доступ или использующее Сервис, или компанию, или другое юридическое лицо, от имени которого такое лицо получает доступ или использует Сервис, в зависимости от обстоятельств.",
              },
            ],
          },
        },
        collecting: {
          title: "Сбор и использование ваших персональных данных",
          types: {
            title: "Типы собираемых данных",
            personal: {
              title: "Персональные данные",
              text: "При использовании нашего Сервиса мы можем попросить вас предоставить нам определенную личную информацию, которая может быть использована для связи с вами или вашей идентификации. Личная информация может включать в себя, помимо прочего, Данные об использовании.",
            },
            usage: {
              title: "Данные об использовании",
              text1:
                "Данные об использовании собираются автоматически при использовании Сервиса.",
              text2:
                "Данные об использовании могут включать такую информацию, как IP-адрес вашего устройства, тип браузера, версию браузера, страницы нашего Сервиса, которые вы посещаете, время и дату вашего визита, время, проведенное на этих страницах, уникальные идентификаторы устройств и другие диагностические данные.",
            },
            cookies: {
              title: "Технологии отслеживания и куки",
              text: "Мы используем куки и аналогичные технологии отслеживания для отслеживания активности в нашем Сервисе и хранения определенной информации. Мы используем как сеансовые, так и постоянные куки для обеспечения базовой функциональности веб-сайта.",
            },
          },
          use: {
            title: "Использование ваших персональных данных",
            text: "Компания может использовать Персональные данные для предоставления и поддержания нашего Сервиса, мониторинга использования и улучшения пользовательского опыта.",
          },
          retention: {
            title: "Хранение ваших персональных данных",
            text: "Компания будет хранить ваши Персональные данные только в течение времени, необходимого для целей, изложенных в настоящей Политике конфиденциальности.",
          },
          security: {
            title: "Безопасность ваших персональных данных",
            text: "Безопасность ваших Персональных данных важна для нас, но помните, что ни один метод передачи через Интернет не является на 100% безопасным. Хотя мы стремимся использовать коммерчески приемлемые средства для защиты ваших Персональных данных, мы не можем гарантировать их абсолютную безопасность.",
          },
        },
        children: {
          title: "Конфиденциальность детей",
          text: "Наш Сервис не предназначен для лиц младше 13 лет. Мы сознательно не собираем личную информацию от лиц младше 13 лет.",
        },
        changes: {
          title: "Изменения в настоящей Политике конфиденциальности",
          text: 'Мы можем время от времени обновлять нашу Политику конфиденциальности. Мы уведомим вас о любых изменениях, разместив новую Политику конфиденциальности на этой странице и обновив дату "Последнее обновление".',
        },
        contact: {
          title: "Свяжитесь с нами",
          text: "Если у вас есть какие-либо вопросы по поводу этой Политики конфиденциальности, вы можете связаться с нами:",
          email: "По электронной почте: rei228322@gmail.com",
        },
      },
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-[slideUp_0.6s_ease-out]">
          <h1 className="text-5xl md:text-6xl font-black font-[orbitron] bg-linear-45 from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-green)] bg-clip-text text-transparent mb-4">
            {t.title}
          </h1>
          <p className="text-sm opacity-70">{t.lastUpdated}</p>
        </div>

        {/* Content Container */}
        <div className="bg-[var(--card-bg)] backdrop-blur-md border border-[var(--card-border)] rounded-3xl p-8 md:p-12 animate-[slideUp_0.8s_ease-out]">
          {/* Introduction */}
          <div className="mb-10">
            <p className="mb-4 text-base leading-relaxed opacity-90">{t.intro1}</p>
            <p className="text-base leading-relaxed opacity-90">{t.intro2}</p>
          </div>

          {/* Interpretation and Definitions */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[var(--neon-blue)] mb-6 font-[orbitron]">
              {t.sections.interpretation.title}
            </h2>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-[var(--neon-purple)] mb-3">
                {t.sections.interpretation.interpretation.title}
              </h3>
              <p className="text-base leading-relaxed opacity-90">
                {t.sections.interpretation.interpretation.text}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-[var(--neon-purple)] mb-3">
                {t.sections.interpretation.definitions.title}
              </h3>
              <p className="mb-4 text-base opacity-90">
                {t.sections.interpretation.definitions.intro}
              </p>
              <ul className="space-y-3">
                {t.sections.interpretation.definitions.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-[var(--bg-dark)]/30 rounded-xl p-4 border border-[var(--card-border)]/50"
                  >
                    <strong className="text-[var(--neon-green)]">{item.term}:</strong>{" "}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Collecting and Using Data */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[var(--neon-blue)] mb-6 font-[orbitron]">
              {t.sections.collecting.title}
            </h2>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-[var(--neon-purple)] mb-4">
                {t.sections.collecting.types.title}
              </h3>

              <div className="space-y-6">
                <div className="bg-[var(--bg-dark)]/30 rounded-xl p-6 border border-[var(--card-border)]/50">
                  <h4 className="text-xl font-semibold text-[var(--neon-green)] mb-2">
                    {t.sections.collecting.types.personal.title}
                  </h4>
                  <p className="opacity-90">{t.sections.collecting.types.personal.text}</p>
                </div>

                <div className="bg-[var(--bg-dark)]/30 rounded-xl p-6 border border-[var(--card-border)]/50">
                  <h4 className="text-xl font-semibold text-[var(--neon-green)] mb-2">
                    {t.sections.collecting.types.usage.title}
                  </h4>
                  <p className="mb-3 opacity-90">{t.sections.collecting.types.usage.text1}</p>
                  <p className="opacity-90">{t.sections.collecting.types.usage.text2}</p>
                </div>

                <div className="bg-[var(--bg-dark)]/30 rounded-xl p-6 border border-[var(--card-border)]/50">
                  <h4 className="text-xl font-semibold text-[var(--neon-green)] mb-2">
                    {t.sections.collecting.types.cookies.title}
                  </h4>
                  <p className="opacity-90">{t.sections.collecting.types.cookies.text}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--bg-dark)]/30 rounded-xl p-6 border border-[var(--card-border)]/50">
                <h4 className="text-xl font-semibold text-[var(--neon-green)] mb-2">
                  {t.sections.collecting.use.title}
                </h4>
                <p className="opacity-90">{t.sections.collecting.use.text}</p>
              </div>

              <div className="bg-[var(--bg-dark)]/30 rounded-xl p-6 border border-[var(--card-border)]/50">
                <h4 className="text-xl font-semibold text-[var(--neon-green)] mb-2">
                  {t.sections.collecting.retention.title}
                </h4>
                <p className="opacity-90">{t.sections.collecting.retention.text}</p>
              </div>

              <div className="bg-[var(--bg-dark)]/30 rounded-xl p-6 border border-[var(--card-border)]/50">
                <h4 className="text-xl font-semibold text-[var(--neon-green)] mb-2">
                  {t.sections.collecting.security.title}
                </h4>
                <p className="opacity-90">{t.sections.collecting.security.text}</p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[var(--neon-blue)] mb-4 font-[orbitron]">
              {t.sections.children.title}
            </h2>
            <p className="text-base leading-relaxed opacity-90">{t.sections.children.text}</p>
          </section>

          {/* Changes */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[var(--neon-blue)] mb-4 font-[orbitron]">
              {t.sections.changes.title}
            </h2>
            <p className="text-base leading-relaxed opacity-90">{t.sections.changes.text}</p>
          </section>

          {/* Contact */}
          <section className="bg-linear-45 from-[var(--neon-blue)]/10 to-[var(--neon-purple)]/10 rounded-2xl p-8 border border-[var(--neon-blue)]/30">
            <h2 className="text-3xl font-bold text-[var(--neon-blue)] mb-4 font-[orbitron]">
              {t.sections.contact.title}
            </h2>
            <p className="mb-3 text-base opacity-90">{t.sections.contact.text}</p>
            <a
              href="mailto:rei228322@gmail.com"
              className="text-[var(--neon-green)] hover:text-[var(--neon-blue)] transition-colors duration-300 font-semibold"
            >
              {t.sections.contact.email}
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
