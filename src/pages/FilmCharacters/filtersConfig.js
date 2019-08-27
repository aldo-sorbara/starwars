// En mi opinión, los filtros deberian estar del lado de la API, poder pasarle por queryparams y que traiga la info de los enums para llenar los selects

const filtersConfig = [
  {
    label: 'Eye color',
    name: 'eye_color',
    options: [
      { label: 'Blue', value: 'blue' },
      { label: 'Red', value: 'red' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Brown', value: 'brown' },
      { label: 'Green', value: 'green' },
      { label: 'Golden', value: 'golden' },
      { label: 'Unknown', value: 'unknown' },
      { label: 'N/A', value: 'n/a' }
    ]
  },
  {
    label: 'Gender',
    name: 'gender',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Unknown', value: 'unknown' },
      { label: 'N/A', value: 'n/a' }
    ]
  },
  {
    label: 'Film',
    name: 'films',
    options: [
      { label: 'Episode I', value: 'https://swapi.co/api/films/4/' },
      { label: 'Episode II', value: 'https://swapi.co/api/films/5/' },
      { label: 'Episode III', value: 'https://swapi.co/api/films/6/' },
      { label: 'Episode IV', value: 'https://swapi.co/api/films/1/' },
      { label: 'Episode V', value: 'https://swapi.co/api/films/2/' },
      { label: 'Episode VI', value: 'https://swapi.co/api/films/3/' },
      { label: 'Episode VII', value: 'https://swapi.co/api/films/7/' }
    ]
  }
];

export default filtersConfig;
