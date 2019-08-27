// const api = (url, ...params) =>
//   fetch(`${process.env.REACT_APP_API_HOST}${url}`, ...params);

//Mi idea aca era crear una instancia de axios para abstraerlo de las vistas,
//pero habia problema de CORS con la api, ademas queria setear el BASE_URL de la API para no hardcodearla,
//pero la API trae un array de characteres con el 'https://swapi.....' entonces no se podia hacer.

const api = (url, ...params) => fetch(`${url}`, ...params);

export default api;
