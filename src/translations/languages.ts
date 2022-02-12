interface Language {
  value: string;
  iso: string;
  name: string;
  englishName: string;
}

export default [
  { value: 'en', iso: 'us', name: 'English', englishName: 'English' },
  { value: 'es', iso: 'es', name: 'Spanish', englishName: 'Spanish' },
] as Language[];
