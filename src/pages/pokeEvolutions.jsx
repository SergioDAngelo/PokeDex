 import React, { useEffect, useState} from 'react';
 import { useParams } from "react-router-dom";
 import { getEvoChain, getPokeInfo } from "../apis/apis";

const PokeEvolutions = () =>{
    const [pokeEvolves, setPokeEvolves] = useState()
     
     //     const [pokeDetail, setPokeDatail] = useState();
     //     const [pokeType, setPokeType] = useState([]);
     //     const [pokeAbility, setPokeAbility] = useState([]);
     //     const[pokeMoves, setPokeMoves] = useState([]);

    const params = useParams()
    useEffect(()=>{
        getEvoChain(params.id)
            .then((res)=>{
                 setPokeEvolves(res.chain.evolves_to)
            })
//         getPokeInfo(params.id)
//             .then((res=>{
//                 setPokeDatail(res.data)
//                 setPokeType(res.data.types)
//                 setPokeAbility(res.data.abilities)
//                 setPokeMoves(res.data.moves)
//             }))
             .catch((er) => {
                 console.log(er)
             })
     },[])
     console.log('EVOLUTIONS ',pokeEvolves)
     return ( <div> " Its working "</div>
//         <Card sx={{ }}> 
//         <CardMedia
//         sx={{ height: 140 }}
//         image={pokeDetail?.sprites.other.dream_world.front_default}
//         title={pokeDetail?.name}
//         />
//         <CardContent>
//         <Typography gutterBottom variant="h3" component="div">
//         {pokeDetail?.name}
//         </Typography>

//         <Grid variant="body2" color="text.secondary">
//             <Typography>Pokedex Index: {pokeDetail?.id}</Typography>          
//             <Typography>Base Experience: {pokeDetail?.base_experience}</Typography>
//             <Typography>Height: {pokeDetail?.height}</Typography>
//             <Typography>Weight: {pokeDetail?.weight}</Typography>
//             <Box sx={{display: 'row', gap:'5px'}}>
//                 <Typography>Type: </Typography>
//                 <Typography>
//                     {pokeType?.map((element)=>(`${element.type.name} `))}
//                 </Typography>
//             </Box>
//             <Box sx={{display: 'row', gap:'5px'}}>
//                 <Typography>Abilities: </Typography>
//                 <Typography>
//                     {pokeAbility?.map((element)=>(`${element.ability.name} `))}
//                 </Typography>
//             </Box>
//             <Box sx={{display: 'flex', gap:'5px'}}>
//                 <Typography>First Moves: </Typography>
//                 <Typography>
//                     {firstMoves?.map((element)=>(`${element.move.name} `))}
//                     {firstMoves?.map((element)=>(`${element.version_group_details[0].level_learned_at} `))}
//                 </Typography>
//             </Box>
//         </Grid>
//       </CardContent>

//       <Breadcrumbs aria-label="breadcrumb">
//         <Link underline="hover" color="inherit" href="/">
//           Home
//         </Link>
//         {/* redireccionar cada evolucion a la vista de poke Details */}
//         <Link underline="hover" color="inherit" to={`/pokeDetails/${params.id}`}>
//           More Details
//         </Link>
//       </Breadcrumbs>
//         </Card>
         ) }

export default PokeEvolutions