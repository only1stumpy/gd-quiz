# GDQuiz

> Интерактивный квиз для фанатов Geometry Dash — ранжируй сложнейшие уровни через drag-and-drop и сравнивай свой результат с официальным Demon List.

**[▶ Играть на gdquiz.com](https://gdquiz.com)** · [GitHub](https://github.com/only1stumpy/gd-quiz)

---

## О проекте

GDQuiz предлагает игрокам посмотреть YouTube-шоукейсы легендарных уровней и выстроить их по сложности от самого сложного к самому лёгкому. После отправки топа — сравни своё ранжирование с официальным рейтингом и узнай сумму ошибок.

Проект вырос до **15 000+ уникальных пользователей** за год органически, через Discord- и Telegram-сообщества Geometry Dash.

---

## Возможности

- **1 700+ уровней** из официального Geometry Dash Demon List
- **5 режимов игры** — Easy, Normal, Hard, Custom и Friend
- **Drag & Drop** — интуитивное перетаскивание уровней в топе, включая поддержку touch на мобильных
- **YouTube-интеграция** — просмотр шоукейсов прямо на странице квиза
- **Шаринг квизов** — уникальные seed-ссылки, которыми можно поделиться с друзьями
- **Bilingual** — полная поддержка английского и русского языков
- **Адаптивный дизайн** — корректная работа на десктопе и мобильных устройствах

---

## Стек

| Слой | Технологии |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Drag & Drop | @dnd-kit |
| Database | PostgreSQL + Prisma ORM + Prisma Accelerate |
| Validation | Zod |
| Deployment | Vercel |
| Analytics | Vercel Analytics & Speed Insights |

---

## Архитектура

Проект построен на принципах **SOLID** и **Separation of Concerns** с чётким разделением на слои:

```
src/
├── app/               # Next.js App Router — только роутинг и thin-компоненты
│   └── api/           # API Routes: /levels, /seed, /seed/get
├── hooks/             # Вся бизнес-логика: useQuiz, useMode, useResults, useLevels...
├── store/             # Zustand: useQuizStore + useAllLevelsStore
├── components/ui/     # Переиспользуемые UI-компоненты
├── lib/               # API-слой и Prisma-клиент
├── functions/         # Чистые утилиты: shuffle, getVideoId, safeLocalStorage
├── locales/           # i18n: en.json, ru.json
└── types/             # TypeScript-типы
```

Page-компоненты остаются «тонкими» — получают данные из хука и рендерят JSX. Вся логика инкапсулирована в кастомных хуках.

---

## Установка и запуск

### Требования

- Node.js 18+ или [Bun](https://bun.sh)
- PostgreSQL (или Vercel Postgres)

### Шаги

```bash
# 1. Клонировать репозиторий
git clone https://github.com/only1stumpy/gd-quiz.git
cd gd-quiz

# 2. Установить зависимости
bun install

# 3. Настроить переменные окружения
cp .env.example .env
```

Заполнить `.env`:

```env
DATABASE_URL="postgresql://..."
PRISMA_DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/..."
NEXT_PUBLIC_SITE_URL="https://gdquiz.com"  # в проде
```

```bash
# 4. Сгенерировать Prisma Client
bunx prisma generate

# 5. Запустить dev-сервер
bun dev
```

Открыть [http://localhost:3000](http://localhost:3000).

---

## API

| Метод | Эндпоинт | Описание |
|---|---|---|
| `GET` | `/api/levels` | Получить все уровни с проверенной embeddability YouTube-видео. ISR-кэш 1 час |
| `POST` | `/api/seed` | Сохранить квиз-сессию (уровни + режим) по seed |
| `GET` | `/api/seed/get?seed=&mode=` | Получить квиз по seed и режиму |

---

## Деплой на Vercel

```bash
# Добавить переменные окружения в Vercel Dashboard
# Settings → Environment Variables

DATABASE_URL
PRISMA_DATABASE_URL
NEXT_PUBLIC_SITE_URL
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/only1stumpy/gd-quiz)

---

## Сообщество

- [Discord](https://discord.gg/H4EU4KvSkR)
- [Telegram](https://t.me/only1stumpyy)

---

## Лицензия

MIT © [only1stumpy](https://github.com/only1stumpy)