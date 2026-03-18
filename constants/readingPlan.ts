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
  sunday: 'Epistles',
  monday: 'The Law',
  tuesday: 'History',
  wednesday: 'Psalms',
  thursday: 'Poetry',
  friday: 'Prophecy',
  saturday: 'Gospels',
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
  { week: 1, sunday: r('Epistles','Rom 1-2'), monday: r('The Law','Gen 1-3'), tuesday: r('History','Josh 1-5'), wednesday: r('Psalms','Ps 1-2'), thursday: r('Poetry','Job 1-2'), friday: r('Prophecy','Isa 1-6'), saturday: r('Gospels','Matt 1-2') },
  { week: 2, sunday: r('Epistles','Rom 3-4'), monday: r('The Law','Gen 4-7'), tuesday: r('History','Josh 6-10'), wednesday: r('Psalms','Ps 3-5'), thursday: r('Poetry','Job 3-4'), friday: r('Prophecy','Isa 7-11'), saturday: r('Gospels','Matt 3-4') },
  { week: 3, sunday: r('Epistles','Rom 5-6'), monday: r('The Law','Gen 8-11'), tuesday: r('History','Josh 11-15'), wednesday: r('Psalms','Ps 6-8'), thursday: r('Poetry','Job 5-6'), friday: r('Prophecy','Isa 12-17'), saturday: r('Gospels','Matt 5-7') },
  { week: 4, sunday: r('Epistles','Rom 7-8'), monday: r('The Law','Gen 12-15'), tuesday: r('History','Josh 16-20'), wednesday: r('Psalms','Ps 9-11'), thursday: r('Poetry','Job 7-8'), friday: r('Prophecy','Isa 18-22'), saturday: r('Gospels','Matt 8-10') },
  { week: 5, sunday: r('Epistles','Rom 9-10'), monday: r('The Law','Gen 16-19'), tuesday: r('History','Josh 21-24'), wednesday: r('Psalms','Ps 12-14'), thursday: r('Poetry','Job 9-10'), friday: r('Prophecy','Isa 23-28'), saturday: r('Gospels','Matt 11-13') },
  { week: 6, sunday: r('Epistles','Rom 11-12'), monday: r('The Law','Gen 20-23'), tuesday: r('History','Judg 1-6'), wednesday: r('Psalms','Ps 15-17'), thursday: r('Poetry','Job 11-12'), friday: r('Prophecy','Isa 29-33'), saturday: r('Gospels','Matt 14-16') },
  { week: 7, sunday: r('Epistles','Rom 13-14'), monday: r('The Law','Gen 24-27'), tuesday: r('History','Judg 7-11'), wednesday: r('Psalms','Ps 18-20'), thursday: r('Poetry','Job 13-14'), friday: r('Prophecy','Isa 34-39'), saturday: r('Gospels','Matt 17-19') },
  { week: 8, sunday: r('Epistles','Rom 15-16'), monday: r('The Law','Gen 28-31'), tuesday: r('History','Judg 12-16'), wednesday: r('Psalms','Ps 21-23'), thursday: r('Poetry','Job 15-16'), friday: r('Prophecy','Isa 40-44'), saturday: r('Gospels','Matt 20-22') },
  { week: 9, sunday: r('Epistles','1Cor 1-2'), monday: r('The Law','Gen 32-35'), tuesday: r('History','Judg 17-21'), wednesday: r('Psalms','Ps 24-26'), thursday: r('Poetry','Job 17-18'), friday: r('Prophecy','Isa 45-50'), saturday: r('Gospels','Matt 23-25') },
  { week: 10, sunday: r('Epistles','1Cor 3-4'), monday: r('The Law','Gen 36-39'), tuesday: r('History','Ruth'), wednesday: r('Psalms','Ps 27-29'), thursday: r('Poetry','Job 19-20'), friday: r('Prophecy','Isa 51-55'), saturday: r('Gospels','Matt 26-28') },
  { week: 11, sunday: r('Epistles','1Cor 5-6'), monday: r('The Law','Gen 40-43'), tuesday: r('History','1Sam 1-5'), wednesday: r('Psalms','Ps 30-32'), thursday: r('Poetry','Job 21-22'), friday: r('Prophecy','Isa 56-61'), saturday: r('Gospels','Mark 1-2') },
  { week: 12, sunday: r('Epistles','1Cor 7-8'), monday: r('The Law','Gen 44-47'), tuesday: r('History','1Sam 6-10'), wednesday: r('Psalms','Ps 33-35'), thursday: r('Poetry','Job 23-24'), friday: r('Prophecy','Isa 62-66'), saturday: r('Gospels','Mark 3-4') },
  { week: 13, sunday: r('Epistles','1Cor 9-10'), monday: r('The Law','Gen 48-50'), tuesday: r('History','1Sam 11-15'), wednesday: r('Psalms','Ps 36-38'), thursday: r('Poetry','Job 25-26'), friday: r('Prophecy','Jer 1-6'), saturday: r('Gospels','Mark 5-6') },
  { week: 14, sunday: r('Epistles','1Cor 11-12'), monday: r('The Law','Ex 1-4'), tuesday: r('History','1Sam 16-20'), wednesday: r('Psalms','Ps 39-41'), thursday: r('Poetry','Job 27-28'), friday: r('Prophecy','Jer 7-11'), saturday: r('Gospels','Mark 7-8') },
  { week: 15, sunday: r('Epistles','1Cor 13-14'), monday: r('The Law','Ex 5-8'), tuesday: r('History','1Sam 21-25'), wednesday: r('Psalms','Ps 42-44'), thursday: r('Poetry','Job 29-30'), friday: r('Prophecy','Jer 12-16'), saturday: r('Gospels','Mark 9-10') },
  { week: 16, sunday: r('Epistles','1Cor 15-16'), monday: r('The Law','Ex 9-12'), tuesday: r('History','1Sam 26-31'), wednesday: r('Psalms','Ps 45-47'), thursday: r('Poetry','Job 31-32'), friday: r('Prophecy','Jer 17-21'), saturday: r('Gospels','Mark 11-12') },
  { week: 17, sunday: r('Epistles','2Cor 1-3'), monday: r('The Law','Ex 13-16'), tuesday: r('History','2Sam 1-4'), wednesday: r('Psalms','Ps 48-50'), thursday: r('Poetry','Job 33-34'), friday: r('Prophecy','Jer 22-26'), saturday: r('Gospels','Mark 13-14') },
  { week: 18, sunday: r('Epistles','2Cor 4-5'), monday: r('The Law','Ex 17-20'), tuesday: r('History','2Sam 5-9'), wednesday: r('Psalms','Ps 51-53'), thursday: r('Poetry','Job 35-36'), friday: r('Prophecy','Jer 27-31'), saturday: r('Gospels','Mark 15-16') },
  { week: 19, sunday: r('Epistles','2Cor 6-8'), monday: r('The Law','Ex 21-24'), tuesday: r('History','2Sam 10-14'), wednesday: r('Psalms','Ps 54-56'), thursday: r('Poetry','Job 37-38'), friday: r('Prophecy','Jer 32-36'), saturday: r('Gospels','Luke 1-2') },
  { week: 20, sunday: r('Epistles','2Cor 9-10'), monday: r('The Law','Ex 25-28'), tuesday: r('History','2Sam 15-19'), wednesday: r('Psalms','Ps 57-59'), thursday: r('Poetry','Job 39-40'), friday: r('Prophecy','Jer 37-41'), saturday: r('Gospels','Luke 3-4') },
  { week: 21, sunday: r('Epistles','2Cor 11-13'), monday: r('The Law','Ex 29-32'), tuesday: r('History','2Sam 20-24'), wednesday: r('Psalms','Ps 60-62'), thursday: r('Poetry','Job 41-42'), friday: r('Prophecy','Jer 42-46'), saturday: r('Gospels','Luke 5-6') },
  { week: 22, sunday: r('Epistles','Gal 1-3'), monday: r('The Law','Ex 33-36'), tuesday: r('History','1Ki 1-4'), wednesday: r('Psalms','Ps 63-65'), thursday: r('Poetry','Prov 1'), friday: r('Prophecy','Jer 47-52'), saturday: r('Gospels','Luke 7-8') },
  { week: 23, sunday: r('Epistles','Gal 4-6'), monday: r('The Law','Ex 37-40'), tuesday: r('History','1Ki 5-9'), wednesday: r('Psalms','Ps 66-68'), thursday: r('Poetry','Prov 2-3'), friday: r('Prophecy','Lamentations'), saturday: r('Gospels','Luke 9-10') },
  { week: 24, sunday: r('Epistles','Eph 1-3'), monday: r('The Law','Lev 1-3'), tuesday: r('History','1Ki 10-13'), wednesday: r('Psalms','Ps 69-71'), thursday: r('Poetry','Prov 4'), friday: r('Prophecy','Ezek 1-6'), saturday: r('Gospels','Luke 11-12') },
  { week: 25, sunday: r('Epistles','Eph 4-6'), monday: r('The Law','Lev 4-6'), tuesday: r('History','1Ki 14-18'), wednesday: r('Psalms','Ps 72-74'), thursday: r('Poetry','Prov 5-6'), friday: r('Prophecy','Ezek 7-12'), saturday: r('Gospels','Luke 13-14') },
  { week: 26, sunday: r('Epistles','Phil 1-2'), monday: r('The Law','Lev 7-9'), tuesday: r('History','1Ki 19-22'), wednesday: r('Psalms','Ps 75-77'), thursday: r('Poetry','Prov 7'), friday: r('Prophecy','Ezek 13-18'), saturday: r('Gospels','Luke 15-16') },
  { week: 27, sunday: r('Epistles','Phil 3-4'), monday: r('The Law','Lev 10-12'), tuesday: r('History','2Ki 1-5'), wednesday: r('Psalms','Ps 78-80'), thursday: r('Poetry','Prov 8-9'), friday: r('Prophecy','Ezek 19-24'), saturday: r('Gospels','Luke 17-18') },
  { week: 28, sunday: r('Epistles','Col 1-2'), monday: r('The Law','Lev 13-15'), tuesday: r('History','2Ki 6-10'), wednesday: r('Psalms','Ps 81-83'), thursday: r('Poetry','Prov 10'), friday: r('Prophecy','Ezek 25-30'), saturday: r('Gospels','Luke 19-20') },
  { week: 29, sunday: r('Epistles','Col 3-4'), monday: r('The Law','Lev 16-18'), tuesday: r('History','2Ki 11-15'), wednesday: r('Psalms','Ps 84-86'), thursday: r('Poetry','Prov 11-12'), friday: r('Prophecy','Ezek 31-36'), saturday: r('Gospels','Luke 21-22') },
  { week: 30, sunday: r('Epistles','1Thes 1-3'), monday: r('The Law','Lev 19-21'), tuesday: r('History','2Ki 16-20'), wednesday: r('Psalms','Ps 87-89'), thursday: r('Poetry','Prov 13'), friday: r('Prophecy','Ezek 37-42'), saturday: r('Gospels','Luke 23-24') },
  { week: 31, sunday: r('Epistles','1Thes 4-5'), monday: r('The Law','Lev 22-24'), tuesday: r('History','2Ki 21-25'), wednesday: r('Psalms','Ps 90-92'), thursday: r('Poetry','Prov 14-15'), friday: r('Prophecy','Ezek 43-48'), saturday: r('Gospels','John 1-2') },
  { week: 32, sunday: r('Epistles','2Thes'), monday: r('The Law','Lev 25-27'), tuesday: r('History','1Chr 1-4'), wednesday: r('Psalms','Ps 93-95'), thursday: r('Poetry','Prov 16'), friday: r('Prophecy','Dan 1-6'), saturday: r('Gospels','John 3-4') },
  { week: 33, sunday: r('Epistles','1Tim 1-3'), monday: r('The Law','Num 1-4'), tuesday: r('History','1Chr 5-9'), wednesday: r('Psalms','Ps 96-98'), thursday: r('Poetry','Prov 17-18'), friday: r('Prophecy','Dan 7-12'), saturday: r('Gospels','John 5-6') },
  { week: 34, sunday: r('Epistles','1Tim 4-6'), monday: r('The Law','Num 5-8'), tuesday: r('History','1Chr 10-14'), wednesday: r('Psalms','Ps 99-101'), thursday: r('Poetry','Prov 19'), friday: r('Prophecy','Hosea 1-7'), saturday: r('Gospels','John 7-9') },
  { week: 35, sunday: r('Epistles','2Tim 1-2'), monday: r('The Law','Num 9-12'), tuesday: r('History','1Chr 15-19'), wednesday: r('Psalms','Ps 102-104'), thursday: r('Poetry','Prov 20-21'), friday: r('Prophecy','Hosea 8-14'), saturday: r('Gospels','John 10-12') },
  { week: 36, sunday: r('Epistles','2Tim 3-4'), monday: r('The Law','Num 13-16'), tuesday: r('History','1Chr 20-24'), wednesday: r('Psalms','Ps 105-107'), thursday: r('Poetry','Prov 22'), friday: r('Prophecy','Joel'), saturday: r('Gospels','John 13-15') },
  { week: 37, sunday: r('Epistles','Titus'), monday: r('The Law','Num 17-20'), tuesday: r('History','1Chr 25-29'), wednesday: r('Psalms','Ps 108-110'), thursday: r('Poetry','Prov 23-24'), friday: r('Prophecy','Amos 1-4'), saturday: r('Gospels','John 16-18') },
  { week: 38, sunday: r('Epistles','Philemon'), monday: r('The Law','Num 21-24'), tuesday: r('History','2Chr 1-5'), wednesday: r('Psalms','Ps 111-113'), thursday: r('Poetry','Prov 25'), friday: r('Prophecy','Amos 5-9'), saturday: r('Gospels','John 19-21') },
  { week: 39, sunday: r('Epistles','Heb 1-4'), monday: r('The Law','Num 25-28'), tuesday: r('History','2Chr 6-10'), wednesday: r('Psalms','Ps 114-116'), thursday: r('Poetry','Prov 26-27'), friday: r('Prophecy','Obadiah'), saturday: r('Gospels','Acts 1-2') },
  { week: 40, sunday: r('Epistles','Heb 5-7'), monday: r('The Law','Num 29-32'), tuesday: r('History','2Chr 11-15'), wednesday: r('Psalms','Ps 117-118'), thursday: r('Poetry','Prov 28'), friday: r('Prophecy','Jonah'), saturday: r('Gospels','Acts 3-4') },
  { week: 41, sunday: r('Epistles','Heb 8-10'), monday: r('The Law','Num 33-36'), tuesday: r('History','2Chr 16-20'), wednesday: r('Psalms','Ps 119'), thursday: r('Poetry','Prov 29-30'), friday: r('Prophecy','Micah'), saturday: r('Gospels','Acts 5-6') },
  { week: 42, sunday: r('Epistles','Heb 11-13'), monday: r('The Law','Deut 1-3'), tuesday: r('History','2Chr 21-24'), wednesday: r('Psalms','Ps 120-121'), thursday: r('Poetry','Prov 31'), friday: r('Prophecy','Nahum'), saturday: r('Gospels','Acts 7-8') },
  { week: 43, sunday: r('Epistles','James 1-3'), monday: r('The Law','Deut 4-6'), tuesday: r('History','2Chr 25-28'), wednesday: r('Psalms','Ps 122-124'), thursday: r('Poetry','Eccl 1-2'), friday: r('Prophecy','Habakkuk'), saturday: r('Gospels','Acts 9-10') },
  { week: 44, sunday: r('Epistles','James 4-5'), monday: r('The Law','Deut 7-9'), tuesday: r('History','2Chr 29-32'), wednesday: r('Psalms','Ps 125-127'), thursday: r('Poetry','Eccl 3-4'), friday: r('Prophecy','Zephaniah'), saturday: r('Gospels','Acts 11-12') },
  { week: 45, sunday: r('Epistles','1Pet 1-3'), monday: r('The Law','Deut 10-12'), tuesday: r('History','2Chr 33-36'), wednesday: r('Psalms','Ps 128-130'), thursday: r('Poetry','Eccl 5-6'), friday: r('Prophecy','Haggai'), saturday: r('Gospels','Acts 13-14') },
  { week: 46, sunday: r('Epistles','1Pet 4-5'), monday: r('The Law','Deut 13-15'), tuesday: r('History','Ezra 1-5'), wednesday: r('Psalms','Ps 131-133'), thursday: r('Poetry','Eccl 7-8'), friday: r('Prophecy','Zechariah 1-7'), saturday: r('Gospels','Acts 15-16') },
  { week: 47, sunday: r('Epistles','2Pet'), monday: r('The Law','Deut 16-19'), tuesday: r('History','Ezra 6-10'), wednesday: r('Psalms','Ps 134-136'), thursday: r('Poetry','Eccl 9-10'), friday: r('Prophecy','Zechariah 8-14'), saturday: r('Gospels','Acts 17-18') },
  { week: 48, sunday: r('Epistles','1John 1-3'), monday: r('The Law','Deut 20-22'), tuesday: r('History','Neh 1-4'), wednesday: r('Psalms','Ps 137-139'), thursday: r('Poetry','Eccl 11-12'), friday: r('Prophecy','Malachi'), saturday: r('Gospels','Acts 19-20') },
  { week: 49, sunday: r('Epistles','1John 4-5'), monday: r('The Law','Deut 23-25'), tuesday: r('History','Neh 5-9'), wednesday: r('Psalms','Ps 140-142'), thursday: r('Poetry','Song 1-2'), friday: r('Prophecy','Rev 1-6'), saturday: r('Gospels','Acts 21-22') },
  { week: 50, sunday: r('Epistles','2John'), monday: r('The Law','Deut 26-28'), tuesday: r('History','Neh 10-13'), wednesday: r('Psalms','Ps 143-145'), thursday: r('Poetry','Song 3-4'), friday: r('Prophecy','Rev 7-11'), saturday: r('Gospels','Acts 23-24') },
  { week: 51, sunday: r('Epistles','3John'), monday: r('The Law','Deut 29-31'), tuesday: r('History','Esther 1-5'), wednesday: r('Psalms','Ps 146-148'), thursday: r('Poetry','Song 5-6'), friday: r('Prophecy','Rev 12-17'), saturday: r('Gospels','Acts 25-26') },
  { week: 52, sunday: r('Epistles','Jude'), monday: r('The Law','Deut 32-34'), tuesday: r('History','Esther 6-10'), wednesday: r('Psalms','Ps 149-150'), thursday: r('Poetry','Song 7-8'), friday: r('Prophecy','Rev 18-22'), saturday: r('Gospels','Acts 27-28') },
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
