import baseURL from './baseUrl'

const getAllPokeData = () =>  baseURL.get('/pokemon/?limit=1279')

const getPokeInfo = (id) =>  baseURL.get(`/pokemon/${id}/`)
const getPokeSpecies = (id) => baseURL.get(`/pokemon-species/${id}`)

const getEvoChain = (idUrl) => baseURL.get(`/evolution-chain/${idUrl}`)


export { getAllPokeData, getPokeInfo, getPokeSpecies, getEvoChain}