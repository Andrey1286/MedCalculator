var CATALOG = [
  // Общие
  {
    id: 'bmi',
    title: 'ИМТ',
    description: 'Индекс массы тела. Вес / Рост²',
    category: 'Общие',
    file: 'calculators/general/bmi.html',
    comingSoon: false
  },
  {
    id: 'whtr',
    title: 'ОТ/Рост',
    description: 'Отношение окружности талии к росту. Маркер висцерального ожирения',
    category: 'Общие',
    file: 'calculators/general/whtr.html',
    comingSoon: false
  },
  {
    id: 'whr',
    title: 'ОТ/ОБ',
    description: 'Отношение талии к бёдрам. Показатель распределения жировой ткани',
    category: 'Общие',
    file: 'calculators/general/whr.html',
    comingSoon: false
  },

  // Эндокринология
  {
  id: 'ft',
  title: 'Свободный тестостерон',
  description: 'Расчёт по уравнению Vermeulen',
  category: 'Эндокринология',
  file: 'calculators/endocrinology/free-testosterone.html',
  comingSoon: false
  },
  {
  id: 'ca',
  title: 'Кальций',
  description: 'Коррекция по альбумину',
  category: 'Эндокринология',
  file: 'calculators/endocrinology/calcium.html',
  comingSoon: false
  },
  {
  id: 'osmo-blood',
  title: 'Осмоляльность крови',
  description: 'Расчётная осмоляльность плазмы',
  category: 'Эндокринология',
  file: 'calculators/endocrinology/osmo-blood.html',
  comingSoon: false
  },
 {
  id: 'osmo-urine',
  title: 'Осмоляльность мочи',
  description: 'Оценка концентрационной способности почек',
  category: 'Эндокринология',
  file: 'calculators/endocrinology/osmo-urine.html',
  comingSoon: false
  },
  {
  id: 'a1c',
  title: 'HbA1c → eAG',
  description: 'Перевод гликированного гемоглобина в среднюю глюкозу',
  category: 'Эндокринология',
  file: 'calculators/endocrinology/hba1c.html',
  comingSoon: false
  },
  {
  id: 'target-a1c',
  title: 'Целевой HbA1c',
  description: 'Индивидуальная цель по гликированному гемоглобину',
  category: 'Эндокринология',
  file: 'calculators/endocrinology/target-a1c.html',
  comingSoon: false
  },
  {
  id: 'vitd',
  title: 'Витамин D',
  description: 'Статус и ориентировочные дозы',
  category: 'Эндокринология',
  file: 'calculators/endocrinology/vitamin-d.html',
  comingSoon: false
  },
  {
  id: 'insulin',
  title: 'Инсулин',
  description: 'Корректирующая доза по правилу 1800/1500',
  category: 'Эндокринология',
  file: 'calculators/endocrinology/insulin.html',
  comingSoon: false
  },
  {
  id: 'findrisc',
  title: 'FINDRISC',
  description: 'Риск сахарного диабета 2 типа',
  category: 'Эндокринология',
  file: 'calculators/endocrinology/findrisc.html',
  comingSoon: false
  },
  {
  id: 'score2dm',
  title: 'SCORE2-Diabetes',
  description: '10-летний риск ССЗ у пациентов с диабетом 2 типа',
  category: 'Эндокринология',
  file: 'calculators/endocrinology/score2-diabetes.html',
  comingSoon: false
  },

  // Кардиология
  {
  id: 'score2',
  title: 'SCORE2',
  description: '10-летний риск сердечно-сосудистой смерти',
  category: 'Кардиология',
  file: 'calculators/cardiology/score2.html',
  comingSoon: false
  },
 {
  id: 'htn-stage',
  title: 'Стадия АГ',
  description: 'Определение стадии гипертонической болезни',
  category: 'Кардиология',
  file: 'calculators/cardiology/htn-stage.html',
  comingSoon: false
  },
  {
  id: 'chads',
  title: 'CHA₂DS₂-VASc',
  description: 'Риск инсульта при фибрилляции предсердий',
  category: 'Кардиология',
  file: 'calculators/cardiology/chads.html',
  comingSoon: false
  },
  {
  id: 'hasbled',
  title: 'HAS-BLED',
  description: 'Риск кровотечения на антикоагулянтах',
  category: 'Кардиология',
  file: 'calculators/cardiology/hasbled.html',
  comingSoon: false
  },
  {
    id: 'qt',
    title: 'QTc',
    description: 'Корригированный интервал QT по Базетту',
    category: 'Кардиология',
    file: '',
    comingSoon: true
  },

  // Нефрология
  {
    id: 'ckd',
    title: 'СКФ (креатинин)',
    description: 'CKD-EPI 2021 · Кокрофт-Голт',
    category: 'Нефрология',
    file: '',
    comingSoon: true
  },
  {
    id: 'ckd-cys',
    title: 'СКФ (цистатин C)',
    description: 'CKD-EPI 2012 по цистатину C',
    category: 'Нефрология',
    file: '',
    comingSoon: true
  },

  // Гепатология
  {
    id: 'fib4',
    title: 'FIB-4',
    description: 'Неинвазивный индекс фиброза печени',
    category: 'Гепатология',
    file: '',
    comingSoon: true
  },

  // Гематология
  {
    id: 'iron',
    title: 'Железо в/в',
    description: 'Расчёт дозы внутривенного железа по формуле Ганзони',
    category: 'Гематология',
    file: '',
    comingSoon: true
  },
  {
    id: 'mentzer',
    title: 'Индекс Ментцера',
    description: 'Дифференциальная диагностика микроцитарной анемии',
    category: 'Гематология',
    file: '',
    comingSoon: true
  },

  // Пульмонология / неотложка
  {
    id: 'curb',
    title: 'CURB-65',
    description: 'Тяжесть внебольничной пневмонии',
    category: 'Пульмонология / неотложка',
    file: '',
    comingSoon: true
  },
  {
    id: 'wells',
    title: 'Wells',
    description: 'Клиническая вероятность ТЭЛА',
    category: 'Пульмонология / неотложка',
    file: '',
    comingSoon: true
  },

  // Диетология
  {
    id: 'calories',
    title: 'Калории/БЖУ',
    description: 'Норма калорий и макронутриентов по Миффлину–Сан Жеору',
    category: 'Диетология',
    file: '',
    comingSoon: true
  },

  // Антикоагулянты
  {
    id: 'noac',
    title: 'НОАК',
    description: 'Новые оральные антикоагулянты',
    category: 'Антикоагулянты',
    file: '',
    comingSoon: true
  },
  {
    id: 'lmwh',
    title: 'НМГ',
    description: 'Низкомолекулярные гепарины',
    category: 'Антикоагулянты',
    file: '',
    comingSoon: true
  },
  {
    id: 'warfarin',
    title: 'Варфарин',
    description: 'Стартовая доза и коррекция',
    category: 'Антикоагулянты',
    file: '',
    comingSoon: true
  },
  {
    id: 'heparin-iv',
    title: 'В/в гепарин',
    description: 'Внутривенный нефракционированный гепарин',
    category: 'Антикоагулянты',
    file: '',
    comingSoon: true
  }
];
