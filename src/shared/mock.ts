export type TimelineStatus = 'done' | 'active' | 'todo'

export type TimelineItem = {
  id: string
  title: string
  subtitle: string
  status: TimelineStatus
  photos?: string[]
  rightLabel?: string
}

export const mockStatus = {
  projectSubtitle: 'Квартира заказчика',
  progress: 45,
  currentStage: {
    id: 'plumbing_rough',
    title: 'Сантехника (черновая)',
    eta: '28 мая',
    badgeText: 'Идут работы',
  },
  timeline: [
    {
      id: 'prep',
      title: 'Подготовка и замеры',
      subtitle: 'Завершено 11 апреля',
      status: 'done',
      rightLabel: ' ',
    },
    {
      id: 'demo',
      title: 'Демонтаж',
      subtitle: 'Завершено 14 апреля',
      status: 'done',
      rightLabel: ' ',
      photos: ['p1', 'p2', 'p3'],
    },
    {
      id: 'walls',
      title: 'Возведение перегородок',
      subtitle: 'Завершено 18 апреля',
      status: 'done',
      rightLabel: ' ',
    },
    {
      id: 'electric',
      title: 'Электромонтаж',
      subtitle: 'Завершено 11 апреля',
      status: 'done',
      rightLabel: ' ',
    },
    {
      id: 'plumbing_rough',
      title: 'Сантехника (черновая)',
      subtitle: 'Примерно до 28 мая',
      status: 'active',
      rightLabel: 'В работе',
    },
    {
      id: 'rough',
      title: 'Черновые работы',
      subtitle: 'Примерно до x июня',
      status: 'todo',
    },
    {
      id: 'finish',
      title: 'Чистовая отделка',
      subtitle: 'Примерно до x июня',
      status: 'todo',
    },
    {
      id: 'doors',
      title: 'Установка дверей и мебели',
      subtitle: 'Примерно до x июня',
      status: 'todo',
    },
  ] as const,
}
