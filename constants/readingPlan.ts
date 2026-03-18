export interface DayReading {
  label: string;
  reference: string;
  apiRef: string; // format for bible-api.com
}

export interface WeekPlan {
  week: number;
  sunday: DayReading;
  monday: DayReading;
  tuesday: DayReading;
  wednesday: DayReading;
  thursday: DayReading;
  friday: DayReading;
  saturday: DayReading;
}

export const DAY_LABELS: Record<string, string> = {
  sunday: 'Epistler',
  monday: 'Loven',
  tuesday: 'Historie',
  wednesday: 'Salmene',
  thursday: 'Poesi',
  friday: 'Profetene',
  saturday: 'Evangelier',
};

export const DAY_COLORS: Record<string, string> = {
  sunday: '#6B4EFF',
  monday: '#FF6B6B',
  tuesday: '#4ECDC4',
  wednesday: '#FFD93D',
  thursday: '#95D44A',
  friday: '#FF8C42',
  saturday: '#4E9FFF',
};

function r(label: string, reference: string): DayReading {
  // Convert "Rom 1-2" -> apiRef for bible-api.com like "romans+1-2"
  const apiRef = toApiRef(reference);
  return { label, reference, apiRef };
}

function toApiRef(ref: string): string {
  const bookMap: Record<string, string> = {
    'Rom': 'romans', '1Cor': '1+corinthians', '2Cor': '2+corinthians',
    'Gal': 'galatians', 'Eph': 'ephesians', 'Phil': 'philippians',
    'Col': 'colossians', '1Thes': '1+thessalonians', '2Thes': '2+thessalonians',
    '1Tim': '1+timothy', '2Tim': '2+timothy', 'Titus': 'titus',
    'Philemon': 'philemon', 'Heb': 'hebrews', 'James': 'james',
    '1Pet': '1+peter', '2Pet': '2+peter', '1John': '1+john',
    '2John': '2+john', '3John': '3+john', 'Jude': 'jude', 'Rev': 'revelation',
    'Gen': 'genesis', 'Ex': 'exodus', 'Lev': 'leviticus', 'Num': 'numbers',
    'Deut': 'deuteronomy', 'Josh': 'joshua', 'Judg': 'judges', 'Ruth': 'ruth',
    '1Sam': '1+samuel', '2Sam': '2+samuel', '1Ki': '1+kings', '2Ki': '2+kings',
    '1Chr': '1+chronicles', '2Chr': '2+chronicles', 'Ezra': 'ezra',
    'Neh': 'nehemiah', 'Esther': 'esther', 'Job': 'job', 'Ps': 'psalms',
    'Prov': 'proverbs', 'Eccl': 'ecclesiastes', 'Song': 'song+of+solomon',
    'Isa': 'isaiah', 'Jer': 'jeremiah', 'Lamentations': 'lamentations',
    'Ezek': 'ezekiel', 'Dan': 'daniel', 'Hosea': 'hosea', 'Joel': 'joel',
    'Amos': 'amos', 'Obadiah': 'obadiah', 'Jonah': 'jonah', 'Micah': 'micah',
    'Nahum': 'nahum', 'Habakkuk': 'habakkuk', 'Zephaniah': 'zephaniah',
    'Haggai': 'haggai', 'Zechariah': 'zechariah', 'Malachi': 'malachi',
    'Matt': 'matthew', 'Mark': 'mark', 'Luke': 'luke', 'John': 'john',
    'Acts': 'acts',
  };

  const parts = ref.trim().split(' ');
  if (parts.length === 1) {
    // Single word like "Ruth", "Lamentations", "Obadiah" etc.
    return bookMap[parts[0]] || parts[0].toLowerCase();
  }
  const book = bookMap[parts[0]] || parts[0].toLowerCase();
  const chapters = parts[1];
  return `${book}+${chapters}`;
}

export const READING_PLAN: WeekPlan[] = [
  { week: 1, sunday: r('Epistler','Rom 1-2'), monday: r('Loven','Gen 1-3'), tuesday: r('Historie','Josh 1-5'), wednesday: r('Salmene','Ps 1-2'), thursday: r('Poesi','Job 1-2'), friday: r('Profetene','Isa 1-6'), saturday: r('Evangelier','Matt 1-2') },
  { week: 2, sunday: r('Epistler','Rom 3-4'), monday: r('Loven','Gen 4-7'), tuesday: r('Historie','Josh 6-10'), wednesday: r('Salmene','Ps 3-5'), thursday: r('Poesi','Job 3-4'), friday: r('Profetene','Isa 7-11'), saturday: r('Evangelier','Matt 3-4') },
  { week: 3, sunday: r('Epistler','Rom 5-6'), monday: r('Loven','Gen 8-11'), tuesday: r('Historie','Josh 11-15'), wednesday: r('Salmene','Ps 6-8'), thursday: r('Poesi','Job 5-6'), friday: r('Profetene','Isa 12-17'), saturday: r('Evangelier','Matt 5-7') },
  { week: 4, sunday: r('Epistler','Rom 7-8'), monday: r('Loven','Gen 12-15'), tuesday: r('Historie','Josh 16-20'), wednesday: r('Salmene','Ps 9-11'), thursday: r('Poesi','Job 7-8'), friday: r('Profetene','Isa 18-22'), saturday: r('Evangelier','Matt 8-10') },
  { week: 5, sunday: r('Epistler','Rom 9-10'), monday: r('Loven','Gen 16-19'), tuesday: r('Historie','Josh 21-24'), wednesday: r('Salmene','Ps 12-14'), thursday: r('Poesi','Job 9-10'), friday: r('Profetene','Isa 23-28'), saturday: r('Evangelier','Matt 11-13') },
  { week: 6, sunday: r('Epistler','Rom 11-12'), monday: r('Loven','Gen 20-23'), tuesday: r('Historie','Judg 1-6'), wednesday: r('Salmene','Ps 15-17'), thursday: r('Poesi','Job 11-12'), friday: r('Profetene','Isa 29-33'), saturday: r('Evangelier','Matt 14-16') },
  { week: 7, sunday: r('Epistler','Rom 13-14'), monday: r('Loven','Gen 24-27'), tuesday: r('Historie','Judg 7-11'), wednesday: r('Salmene','Ps 18-20'), thursday: r('Poesi','Job 13-14'), friday: r('Profetene','Isa 34-39'), saturday: r('Evangelier','Matt 17-19') },
  { week: 8, sunday: r('Epistler','Rom 15-16'), monday: r('Loven','Gen 28-31'), tuesday: r('Historie','Judg 12-16'), wednesday: r('Salmene','Ps 21-23'), thursday: r('Poesi','Job 15-16'), friday: r('Profetene','Isa 40-44'), saturday: r('Evangelier','Matt 20-22') },
  { week: 9, sunday: r('Epistler','1Cor 1-2'), monday: r('Loven','Gen 32-35'), tuesday: r('Historie','Judg 17-21'), wednesday: r('Salmene','Ps 24-26'), thursday: r('Poesi','Job 17-18'), friday: r('Profetene','Isa 45-50'), saturday: r('Evangelier','Matt 23-25') },
  { week: 10, sunday: r('Epistler','1Cor 3-4'), monday: r('Loven','Gen 36-39'), tuesday: r('Historie','Ruth'), wednesday: r('Salmene','Ps 27-29'), thursday: r('Poesi','Job 19-20'), friday: r('Profetene','Isa 51-55'), saturday: r('Evangelier','Matt 26-28') },
  { week: 11, sunday: r('Epistler','1Cor 5-6'), monday: r('Loven','Gen 40-43'), tuesday: r('Historie','1Sam 1-5'), wednesday: r('Salmene','Ps 30-32'), thursday: r('Poesi','Job 21-22'), friday: r('Profetene','Isa 56-61'), saturday: r('Evangelier','Mark 1-2') },
  { week: 12, sunday: r('Epistler','1Cor 7-8'), monday: r('Loven','Gen 44-47'), tuesday: r('Historie','1Sam 6-10'), wednesday: r('Salmene','Ps 33-35'), thursday: r('Poesi','Job 23-24'), friday: r('Profetene','Isa 62-66'), saturday: r('Evangelier','Mark 3-4') },
  { week: 13, sunday: r('Epistler','1Cor 9-10'), monday: r('Loven','Gen 48-50'), tuesday: r('Historie','1Sam 11-15'), wednesday: r('Salmene','Ps 36-38'), thursday: r('Poesi','Job 25-26'), friday: r('Profetene','Jer 1-6'), saturday: r('Evangelier','Mark 5-6') },
  { week: 14, sunday: r('Epistler','1Cor 11-12'), monday: r('Loven','Ex 1-4'), tuesday: r('Historie','1Sam 16-20'), wednesday: r('Salmene','Ps 39-41'), thursday: r('Poesi','Job 27-28'), friday: r('Profetene','Jer 7-11'), saturday: r('Evangelier','Mark 7-8') },
  { week: 15, sunday: r('Epistler','1Cor 13-14'), monday: r('Loven','Ex 5-8'), tuesday: r('Historie','1Sam 21-25'), wednesday: r('Salmene','Ps 42-44'), thursday: r('Poesi','Job 29-30'), friday: r('Profetene','Jer 12-16'), saturday: r('Evangelier','Mark 9-10') },
  { week: 16, sunday: r('Epistler','1Cor 15-16'), monday: r('Loven','Ex 9-12'), tuesday: r('Historie','1Sam 26-31'), wednesday: r('Salmene','Ps 45-47'), thursday: r('Poesi','Job 31-32'), friday: r('Profetene','Jer 17-21'), saturday: r('Evangelier','Mark 11-12') },
  { week: 17, sunday: r('Epistler','2Cor 1-3'), monday: r('Loven','Ex 13-16'), tuesday: r('Historie','2Sam 1-4'), wednesday: r('Salmene','Ps 48-50'), thursday: r('Poesi','Job 33-34'), friday: r('Profetene','Jer 22-26'), saturday: r('Evangelier','Mark 13-14') },
  { week: 18, sunday: r('Epistler','2Cor 4-5'), monday: r('Loven','Ex 17-20'), tuesday: r('Historie','2Sam 5-9'), wednesday: r('Salmene','Ps 51-53'), thursday: r('Poesi','Job 35-36'), friday: r('Profetene','Jer 27-31'), saturday: r('Evangelier','Mark 15-16') },
  { week: 19, sunday: r('Epistler','2Cor 6-8'), monday: r('Loven','Ex 21-24'), tuesday: r('Historie','2Sam 10-14'), wednesday: r('Salmene','Ps 54-56'), thursday: r('Poesi','Job 37-38'), friday: r('Profetene','Jer 32-36'), saturday: r('Evangelier','Luke 1-2') },
  { week: 20, sunday: r('Epistler','2Cor 9-10'), monday: r('Loven','Ex 25-28'), tuesday: r('Historie','2Sam 15-19'), wednesday: r('Salmene','Ps 57-59'), thursday: r('Poesi','Job 39-40'), friday: r('Profetene','Jer 37-41'), saturday: r('Evangelier','Luke 3-4') },
  { week: 21, sunday: r('Epistler','2Cor 11-13'), monday: r('Loven','Ex 29-32'), tuesday: r('Historie','2Sam 20-24'), wednesday: r('Salmene','Ps 60-62'), thursday: r('Poesi','Job 41-42'), friday: r('Profetene','Jer 42-46'), saturday: r('Evangelier','Luke 5-6') },
  { week: 22, sunday: r('Epistler','Gal 1-3'), monday: r('Loven','Ex 33-36'), tuesday: r('Historie','1Ki 1-4'), wednesday: r('Salmene','Ps 63-65'), thursday: r('Poesi','Prov 1'), friday: r('Profetene','Jer 47-52'), saturday: r('Evangelier','Luke 7-8') },
  { week: 23, sunday: r('Epistler','Gal 4-6'), monday: r('Loven','Ex 37-40'), tuesday: r('Historie','1Ki 5-9'), wednesday: r('Salmene','Ps 66-68'), thursday: r('Poesi','Prov 2-3'), friday: r('Profetene','Lamentations'), saturday: r('Evangelier','Luke 9-10') },
  { week: 24, sunday: r('Epistler','Eph 1-3'), monday: r('Loven','Lev 1-3'), tuesday: r('Historie','1Ki 10-13'), wednesday: r('Salmene','Ps 69-71'), thursday: r('Poesi','Prov 4'), friday: r('Profetene','Ezek 1-6'), saturday: r('Evangelier','Luke 11-12') },
  { week: 25, sunday: r('Epistler','Eph 4-6'), monday: r('Loven','Lev 4-6'), tuesday: r('Historie','1Ki 14-18'), wednesday: r('Salmene','Ps 72-74'), thursday: r('Poesi','Prov 5-6'), friday: r('Profetene','Ezek 7-12'), saturday: r('Evangelier','Luke 13-14') },
  { week: 26, sunday: r('Epistler','Phil 1-2'), monday: r('Loven','Lev 7-9'), tuesday: r('Historie','1Ki 19-22'), wednesday: r('Salmene','Ps 75-77'), thursday: r('Poesi','Prov 7'), friday: r('Profetene','Ezek 13-18'), saturday: r('Evangelier','Luke 15-16') },
  { week: 27, sunday: r('Epistler','Phil 3-4'), monday: r('Loven','Lev 10-12'), tuesday: r('Historie','2Ki 1-5'), wednesday: r('Salmene','Ps 78-80'), thursday: r('Poesi','Prov 8-9'), friday: r('Profetene','Ezek 19-24'), saturday: r('Evangelier','Luke 17-18') },
  { week: 28, sunday: r('Epistler','Col 1-2'), monday: r('Loven','Lev 13-15'), tuesday: r('Historie','2Ki 6-10'), wednesday: r('Salmene','Ps 81-83'), thursday: r('Poesi','Prov 10'), friday: r('Profetene','Ezek 25-30'), saturday: r('Evangelier','Luke 19-20') },
  { week: 29, sunday: r('Epistler','Col 3-4'), monday: r('Loven','Lev 16-18'), tuesday: r('Historie','2Ki 11-15'), wednesday: r('Salmene','Ps 84-86'), thursday: r('Poesi','Prov 11-12'), friday: r('Profetene','Ezek 31-36'), saturday: r('Evangelier','Luke 21-22') },
  { week: 30, sunday: r('Epistler','1Thes 1-3'), monday: r('Loven','Lev 19-21'), tuesday: r('Historie','2Ki 16-20'), wednesday: r('Salmene','Ps 87-89'), thursday: r('Poesi','Prov 13'), friday: r('Profetene','Ezek 37-42'), saturday: r('Evangelier','Luke 23-24') },
  { week: 31, sunday: r('Epistler','1Thes 4-5'), monday: r('Loven','Lev 22-24'), tuesday: r('Historie','2Ki 21-25'), wednesday: r('Salmene','Ps 90-92'), thursday: r('Poesi','Prov 14-15'), friday: r('Profetene','Ezek 43-48'), saturday: r('Evangelier','John 1-2') },
  { week: 32, sunday: r('Epistler','2Thes'), monday: r('Loven','Lev 25-27'), tuesday: r('Historie','1Chr 1-4'), wednesday: r('Salmene','Ps 93-95'), thursday: r('Poesi','Prov 16'), friday: r('Profetene','Dan 1-6'), saturday: r('Evangelier','John 3-4') },
  { week: 33, sunday: r('Epistler','1Tim 1-3'), monday: r('Loven','Num 1-4'), tuesday: r('Historie','1Chr 5-9'), wednesday: r('Salmene','Ps 96-98'), thursday: r('Poesi','Prov 17-18'), friday: r('Profetene','Dan 7-12'), saturday: r('Evangelier','John 5-6') },
  { week: 34, sunday: r('Epistler','1Tim 4-6'), monday: r('Loven','Num 5-8'), tuesday: r('Historie','1Chr 10-14'), wednesday: r('Salmene','Ps 99-101'), thursday: r('Poesi','Prov 19'), friday: r('Profetene','Hosea 1-7'), saturday: r('Evangelier','John 7-9') },
  { week: 35, sunday: r('Epistler','2Tim 1-2'), monday: r('Loven','Num 9-12'), tuesday: r('Historie','1Chr 15-19'), wednesday: r('Salmene','Ps 102-104'), thursday: r('Poesi','Prov 20-21'), friday: r('Profetene','Hosea 8-14'), saturday: r('Evangelier','John 10-12') },
  { week: 36, sunday: r('Epistler','2Tim 3-4'), monday: r('Loven','Num 13-16'), tuesday: r('Historie','1Chr 20-24'), wednesday: r('Salmene','Ps 105-107'), thursday: r('Poesi','Prov 22'), friday: r('Profetene','Joel'), saturday: r('Evangelier','John 13-15') },
  { week: 37, sunday: r('Epistler','Titus'), monday: r('Loven','Num 17-20'), tuesday: r('Historie','1Chr 25-29'), wednesday: r('Salmene','Ps 108-110'), thursday: r('Poesi','Prov 23-24'), friday: r('Profetene','Amos 1-4'), saturday: r('Evangelier','John 16-18') },
  { week: 38, sunday: r('Epistler','Philemon'), monday: r('Loven','Num 21-24'), tuesday: r('Historie','2Chr 1-5'), wednesday: r('Salmene','Ps 111-113'), thursday: r('Poesi','Prov 25'), friday: r('Profetene','Amos 5-9'), saturday: r('Evangelier','John 19-21') },
  { week: 39, sunday: r('Epistler','Heb 1-4'), monday: r('Loven','Num 25-28'), tuesday: r('Historie','2Chr 6-10'), wednesday: r('Salmene','Ps 114-116'), thursday: r('Poesi','Prov 26-27'), friday: r('Profetene','Obadiah'), saturday: r('Evangelier','Acts 1-2') },
  { week: 40, sunday: r('Epistler','Heb 5-7'), monday: r('Loven','Num 29-32'), tuesday: r('Historie','2Chr 11-15'), wednesday: r('Salmene','Ps 117-118'), thursday: r('Poesi','Prov 28'), friday: r('Profetene','Jonah'), saturday: r('Evangelier','Acts 3-4') },
  { week: 41, sunday: r('Epistler','Heb 8-10'), monday: r('Loven','Num 33-36'), tuesday: r('Historie','2Chr 16-20'), wednesday: r('Salmene','Ps 119'), thursday: r('Poesi','Prov 29-30'), friday: r('Profetene','Micah'), saturday: r('Evangelier','Acts 5-6') },
  { week: 42, sunday: r('Epistler','Heb 11-13'), monday: r('Loven','Deut 1-3'), tuesday: r('Historie','2Chr 21-24'), wednesday: r('Salmene','Ps 120-121'), thursday: r('Poesi','Prov 31'), friday: r('Profetene','Nahum'), saturday: r('Evangelier','Acts 7-8') },
  { week: 43, sunday: r('Epistler','James 1-3'), monday: r('Loven','Deut 4-6'), tuesday: r('Historie','2Chr 25-28'), wednesday: r('Salmene','Ps 122-124'), thursday: r('Poesi','Eccl 1-2'), friday: r('Profetene','Habakkuk'), saturday: r('Evangelier','Acts 9-10') },
  { week: 44, sunday: r('Epistler','James 4-5'), monday: r('Loven','Deut 7-9'), tuesday: r('Historie','2Chr 29-32'), wednesday: r('Salmene','Ps 125-127'), thursday: r('Poesi','Eccl 3-4'), friday: r('Profetene','Zephaniah'), saturday: r('Evangelier','Acts 11-12') },
  { week: 45, sunday: r('Epistler','1Pet 1-3'), monday: r('Loven','Deut 10-12'), tuesday: r('Historie','2Chr 33-36'), wednesday: r('Salmene','Ps 128-130'), thursday: r('Poesi','Eccl 5-6'), friday: r('Profetene','Haggai'), saturday: r('Evangelier','Acts 13-14') },
  { week: 46, sunday: r('Epistler','1Pet 4-5'), monday: r('Loven','Deut 13-15'), tuesday: r('Historie','Ezra 1-5'), wednesday: r('Salmene','Ps 131-133'), thursday: r('Poesi','Eccl 7-8'), friday: r('Profetene','Zechariah 1-7'), saturday: r('Evangelier','Acts 15-16') },
  { week: 47, sunday: r('Epistler','2Pet'), monday: r('Loven','Deut 16-19'), tuesday: r('Historie','Ezra 6-10'), wednesday: r('Salmene','Ps 134-136'), thursday: r('Poesi','Eccl 9-10'), friday: r('Profetene','Zechariah 8-14'), saturday: r('Evangelier','Acts 17-18') },
  { week: 48, sunday: r('Epistler','1John 1-3'), monday: r('Loven','Deut 20-22'), tuesday: r('Historie','Neh 1-4'), wednesday: r('Salmene','Ps 137-139'), thursday: r('Poesi','Eccl 11-12'), friday: r('Profetene','Malachi'), saturday: r('Evangelier','Acts 19-20') },
  { week: 49, sunday: r('Epistler','1John 4-5'), monday: r('Loven','Deut 23-25'), tuesday: r('Historie','Neh 5-9'), wednesday: r('Salmene','Ps 140-142'), thursday: r('Poesi','Song 1-2'), friday: r('Profetene','Rev 1-6'), saturday: r('Evangelier','Acts 21-22') },
  { week: 50, sunday: r('Epistler','2John'), monday: r('Loven','Deut 26-28'), tuesday: r('Historie','Neh 10-13'), wednesday: r('Salmene','Ps 143-145'), thursday: r('Poesi','Song 3-4'), friday: r('Profetene','Rev 7-11'), saturday: r('Evangelier','Acts 23-24') },
  { week: 51, sunday: r('Epistler','3John'), monday: r('Loven','Deut 29-31'), tuesday: r('Historie','Esther 1-5'), wednesday: r('Salmene','Ps 146-148'), thursday: r('Poesi','Song 5-6'), friday: r('Profetene','Rev 12-17'), saturday: r('Evangelier','Acts 25-26') },
  { week: 52, sunday: r('Epistler','Jude'), monday: r('Loven','Deut 32-34'), tuesday: r('Historie','Esther 6-10'), wednesday: r('Salmene','Ps 149-150'), thursday: r('Poesi','Song 7-8'), friday: r('Profetene','Rev 18-22'), saturday: r('Evangelier','Acts 27-28') },
];

export function getCurrentWeek(): number {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const today = new Date();
  const diff = today.getTime() - startOfYear.getTime();
  const weekNum = Math.ceil((diff / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 7);
  return Math.min(Math.max(weekNum, 1), 52);
}

export function getTodayDayKey(): keyof WeekPlan {
  const days: (keyof WeekPlan)[] = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  return days[new Date().getDay()];
}

export function getProgressPercentage(completed: Record<string, boolean>): number {
  const total = 52 * 7;
  const done = Object.keys(completed).filter(k => completed[k]).length;
  return Math.round((done / total) * 100);
}
