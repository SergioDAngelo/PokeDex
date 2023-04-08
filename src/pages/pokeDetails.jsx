import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getPokeInfo, getPokeSpecies, getEvoChain } from "../apis/apis";


import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';


import Button from '@mui/material/Button';

const PokeDetails = () => {
    const params = useParams()
    const [pokeDetail, setPokeDatail] = useState();
    const navigate = useNavigate();
    const [pokeType, setPokeType] = useState([]);
    const [pokeAbility, setPokeAbility] = useState([]);
    const[pokeMoves, setPokeMoves] = useState([]);

    const[PokeUrlEvo, setPokeUrlEvo]= useState()

    const[pokeFirstEvo, setPokeFirstEvo]= useState()
    const[pokeSecondEvo, setPokeSecondEvo]= useState()
    const[pokeThirdEvo, setPokeThirdEvo]= useState()



    useEffect(() => {
        getPokeInfo(params.id)
            .then((res) => {
                setPokeDatail(res.data)
                setPokeType(res.data.types)
                setPokeAbility(res.data.abilities)
                setPokeMoves(res.data.moves)
            })
        getPokeSpecies(params.id)
            .then((res)=>{
                setPokeUrlEvo(res.data.evolution_chain.url)
                let idUrl = res.data.evolution_chain.url.split('/')[6]
                getEvoChain(parseInt(idUrl))
                    .then((res)=>{
                        setPokeFirstEvo(res.data.chain.species.url)
                        setPokeSecondEvo(res.data.chain.evolves_to.map(item=>item.species.url))
                        setPokeThirdEvo(res.data.chain.evolves_to.map(item=>item.evolves_to.map(item=>item.species.url))) 
                        })
            })
            .catch((er) => {
                console.log(er)
            })
    }, [,params.id])
    


    const firstMoves = pokeMoves.slice(0, 10) 
    
    console.log('PRIMERA EVO',pokeFirstEvo)
    console.log('SEGUNDA EVO',pokeSecondEvo)
    console.log('TERCERA EVO',pokeThirdEvo)

    const getIdPoke = (url)=>{
        let idUrl = url.split('/')[6]
        return idUrl
        }
    
    const getidPoke2 = (array)=>{
    //     const aaa = array.map(item=>if(item.url.lenght<=1){
    //         let evo2 = array.map(item=>
    //             item.split('/')[6])
    //             return evo2
    // })
        
        }
            
    const getidPoke3 = (array)=>{
        let evo3 = array.map(item=>item.map(item=>item.split('/')[6]))
        return evo3
    }
           
    return (
        <Card sx={{ }}> 
            <CardMedia
                sx={{ height: 140 }}
                image={pokeDetail?.sprites.other.dream_world.front_default}
                title={pokeDetail?.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                    {pokeDetail?.name}
                </Typography>
                <Grid variant="body2" color="text.secondary">
                    <Typography>Pokedex Index: {pokeDetail?.id}</Typography>          
                    <Typography>Base Experience: {pokeDetail?.base_experience}</Typography>
                    <Typography>Height: {pokeDetail?.height}</Typography>
                    <Typography>Weight: {pokeDetail?.weight}</Typography>
                    <Box sx={{display: 'row', gap:'5px'}}>
                        <Typography>Type: </Typography>
                        <Typography>
                            {pokeType?.map((element)=>(`${element.type.name} `))}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'row', gap:'5px'}}>
                        <Typography>Abilities: </Typography>
                        <Typography>
                            {pokeAbility?.map((element)=>(`${element.ability.name} `))}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap:'5px'}}>
                        <Typography>First Moves: </Typography>
                        <Typography>
                            {firstMoves?.map((element)=>(`${element.move.name} `))}
                            {firstMoves?.map((element)=>(`${element.version_group_details[0].level_learned_at} `))}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'row', gap:'5px'}}>
                        <Typography>Evolution Chain: </Typography>
                        <Button onClick={()=>navigate(`/pokeDetails/${getIdPoke(pokeFirstEvo)}`)}>First Evolve Chain</Button>
                        <Button onClick={()=>navigate(`/pokeDetails/${getidPoke2(pokeSecondEvo)}`)}>Second Evolve Chain</Button>
                        <Button onClick={()=>navigate(`/pokeDetails/${getidPoke3(pokeThirdEvo)}`)}>Thrid Evolve Chain</Button>
                        {/* {pokeThirdEvo[0].lenght>0?<Button onClick={()=>navigate(`/pokeDetails/${getidPoke3(pokeThirdEvo)}`)}>Thrid Evolve Chain</Button>:null} */}
                    </Box>
                </Grid>
            </CardContent>

            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
            </Breadcrumbs>
        </Card>)
    };
export default PokeDetails

/* // uso el params.id y tendre el id del pokemon que fue seleccionado */
        /* <Link underline="hover" color="inherit" to={`/moreDetails/${params.id}*/