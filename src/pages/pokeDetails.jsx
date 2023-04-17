import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getPokeInfo, getPokeSpecies, getEvoChain } from "../apis/apis";

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


const PokeDetails = () => {
    const params = useParams()
    const [pokeDetail, setPokeDatail] = useState();
    const [pokeType, setPokeType] = useState([]);
    const [pokeAbility, setPokeAbility] = useState([]);
    const [pokeMoves, setPokeMoves] = useState([]);
    const [PokeUrlEvo, setPokeUrlEvo] = useState()
    const [pokeFirstEvo, setPokeFirstEvo] = useState()
    const [pokeSecondEvo, setPokeSecondEvo] = useState()
    const [pokeThirdEvo, setPokeThirdEvo] = useState()
    const [pokeFirstEvoName, setPokeFirstEvoName] = useState()
    const [open, setOpen] = React.useState(true);
    const [open2, setOpen2] = React.useState(true);
    const [open3, setOpen3] = React.useState(true);
    const [open4, setOpen4] = React.useState(true);
    const [open5, setOpen5] = React.useState(true);
    const [open6, setOpen6] = React.useState(true);
    const [open7, setOpen7] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getPokeInfo(params.id)
            .then((res) => {
                setPokeDatail(res.data)
                setPokeType(res.data.types)
                setPokeAbility(res.data.abilities)
                setPokeMoves(res.data.moves)
            })

        getPokeSpecies(params.id)
            .then((res) => {
                setPokeUrlEvo(res.data.evolution_chain.url)
                let idUrl = res.data.evolution_chain.url.split('/')[6]
                getEvoChain(parseInt(idUrl))
                    .then((res) => {
                        setPokeFirstEvo(res.data.chain.species.url);
                        setPokeSecondEvo(res.data.chain.evolves_to.map(item => item.species));
                        setPokeThirdEvo(res.data.chain.evolves_to.map(item => item.evolves_to.map(item => item.species)));
                        setPokeFirstEvoName(res.data.chain.species.name);
                    })
            })
            .catch((er) => {
                console.log(er)
            })
    }, [, params.id])

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    const handleClick3 = () => {
        setOpen3(!open3);
    };
    const handleClick4 = () => {
        setOpen4(!open4);
    };
    const handleClick5 = () => {
        setOpen5(!open5);
    };
    const handleClick6 = () => {
        setOpen6(!open6);
    };
    const handleClick7 = () => {
        setOpen7(!open7);
    };
    const firstMoves = pokeMoves.slice(0, 10)

    const getIdPoke = (url) => {
        let idUrl = url.split('/')[6]
        return idUrl
    }
    const getidPoke2 = (item) => {
        let evo2 = item.split('/')[6]
        return evo2
    }

    const getidPoke3 = (item) => {
        let evo3 = item.split('/')[6]
        return evo3
    }

    return (
        <Grid container
        sx={{
			display:'flex',
			flexDirection:'row',
			justifyContent:'center',
			backgroundColor: 'red'
		}}>
            <Grid item 
                xs={6} 
                sx={{
                display: 'flex',
                alignItems:'center',
                alignContent:'center',
                justifyContent:'center',
                textAlign: 'center'}}>

                <Card sx={{
                    bgcolor: 'beige',
                    maxWidth:500,
                    width:'100%'}}>
                    <CardMedia
                        sx={{   
                            height: '300px',
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundImage: `url(${pokeDetail?.sprites.other.dream_world.front_default})`,
                            margin: 'auto',
                            width:400,
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}
                        image={pokeDetail?.sprites.other.dream_world.front_default}
                        title={pokeDetail?.name}/>
                    <CardContent sx={{textAlign: 'center', alignItems: 'center'}}>
                        <Typography gutterBottom variant="h3" component="div">
                            {pokeDetail?.name.charAt(0).toUpperCase() + pokeDetail?.name.slice(1)}
                        </Typography>
                        <Grid variant="body2" color="text.secondary">
                            <List component="nav" aria-labelledby="nested-list-subheader">
                                <ListItemText>
                                    Pokedex Index: {pokeDetail?.id}
                                </ListItemText>
                                <ListItemText>
                                    Base Experience: {pokeDetail?.base_experience}
                                </ListItemText>
                                <ListItemText>
                                    Height: {pokeDetail?.height}
                                </ListItemText>
                                <ListItemText>
                                    Weight: {pokeDetail?.weight}
                                </ListItemText>
                                <ListItemText onClick={handleClick7}>
                                    Type: {open7 ? <ExpandLess /> : <ExpandMore />}
                                </ListItemText>
                                <Collapse in={open7} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemText>
                                            {pokeType?.map((element) => (<ListItemText >{element.type.name}</ListItemText>))}
                                        </ListItemText>
                                    </List>
                                </Collapse>
                                <ListItemText onClick={handleClick6}>
                                    Abilities: {open6 ? <ExpandLess /> : <ExpandMore />}
                                </ListItemText>
                                <Collapse in={open6} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemText>
                                            {pokeAbility?.map((element) => (<ListItemText >{element.ability.name}</ListItemText>))}
                                        </ListItemText>
                                    </List>
                                </Collapse>
                                <ListItemText onClick={handleClick}>
                                    First Moves: {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemText>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemText>
                                            {firstMoves?.map((element) => (<ListItemText >{element.move.name}</ListItemText>))}
                                        </ListItemText>
                                    </List>
                                </Collapse>
                                <ListItemText onClick={handleClick2}>
                                    Evolution Chain: {open2 ? <ExpandLess /> : <ExpandMore />}
                                </ListItemText>
                                <Collapse in={open2} timeout="auto" unmountOnExit>
                                    <List  disablePadding>
                                        <ListItemButton onClick={handleClick5} sx={{justifyContent:'center'}}>
                                            1st Evo Chain: {open5 ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={open5} timeout="auto" unmountOnExit>
                                        <ListItemButton sx={{ pl: 4, justifyContent:'center' }} onClick={() => navigate(`/pokeDetails/${getIdPoke(pokeFirstEvo)}`)}>
                                                {pokeFirstEvoName}
                                        </ListItemButton>
                                        </Collapse>
                                        <ListItemButton onClick={handleClick3} sx={{justifyContent:'center'}}>
                                            2nd Evo Chain : {open3 ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={open3} timeout="auto" unmountOnExit>
                                            {pokeSecondEvo?.length > 1 ?
                                                pokeSecondEvo?.map(item => <ListItemButton sx={{ pl: 4, justifyContent:'center' }} onClick={() => navigate(`/pokeDetails/${getidPoke2(item.url)}`)}>
                                                    {item.name}</ListItemButton>) :
                                                pokeSecondEvo?.map(item => <ListItemButton sx={{ pl: 4, justifyContent:'center' }} onClick={() => navigate(`/pokeDetails/${getidPoke2(item.url)}`)}>
                                                    {item.name}</ListItemButton>)}
                                        </Collapse>
                                        <ListItemButton onClick={handleClick4} sx={{justifyContent:'center'}}>
                                            3rd Evo Chain : {open4 ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={open4} timeout="auto" unmountOnExit>
                                            {pokeThirdEvo !== undefined && pokeThirdEvo[0].length > 0 ? pokeThirdEvo?.map(item => item.map(item => <ListItemButton sx={{ pl: 4, justifyContent:'center'}} onClick={() => navigate(`/pokeDetails/${getidPoke3(item.url)}`)}>
                                                {item.name}</ListItemButton>)) :
                                                pokeThirdEvo?.map(item => item.map(item => <ListItemButton sx={{ pl: 4, justifyContent:'center' }} onClick={() => navigate(`/pokeDetails/${getidPoke3(item.url)}`)}>
                                                    {item.name}</ListItemButton>))}
                                        </Collapse>
                                    </List>
                                </Collapse>
                            </List>
                        </Grid>
                        <Link underline="hover" color="black" href="/">
                            Home
                        </Link>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};
export default PokeDetails
