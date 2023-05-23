import React from 'react';

import { useParams, Link } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

const PokeApiID = gql`
	  query QueryPokeInfo ($name:String!) {
		pokemon_v2_pokemon( where: { name: { _eq: $name } }){
		  base_experience
		  height
		  weight
		  id
		  name
		  pokemon_species_id
		  order
		  pokemon_v2_pokemonstats {
			base_stat
			pokemon_v2_stat {
			  name
			}
		  }
		  pokemon_v2_pokemontypes {
			pokemon_v2_type {
			  name
			}
		  }
		  pokemon_v2_pokemonmoves(limit: 9) {
			level
			pokemon_v2_move {
			  name
			}
		  }
		  pokemon_v2_pokemonspecy {
			obj1: pokemon_v2_evolutionchain {
			  arr1: pokemon_v2_pokemonspecies {
				name
			  }
			}
		  }
		}

		TotalPoke: pokemon_v2_pokemon_aggregate {
		  aggregate {
			count
		  }
		}
	  }
	`
const PokeDetails = () => {
	const {name} = useParams();
	const { loading, error, data } = useQuery(PokeApiID, {variables: {name}})

	//const navigate = useNavigate();
	const PokeID = (obj) => { 
		return (<Link to={`/pokeDetails/${obj}`}><CatchingPokemonIcon /></Link>)
	}
	const [open, setOpen] = React.useState(false);
	const [open5, setOpen5] = React.useState(false);
	const [open6, setOpen6] = React.useState(false);
	const [open7, setOpen7] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
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

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	console.log(data);
	// data?.pokemon_v2_pokemon?.map(({id ,name, order, base_experience, height, pokemon_v2_pokemonstats, pokemon_v2_pokemontypes}) => (
	return (
		<Grid container
		sx={{
			display:'flex',
			flexDirection:'row',
			justifyContent:'center',
			backgroundColor: 'red'
		}}>
			<Grid item 
				xs={11} md={8} lg={8} 
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
						//backgroundImage: `url(${pokeDetail?.sprites.other.dream_world.front_default})`,
						margin: 'auto',
						width:400,                            
						maxWidth: '100%',
						maxHeight: '100%',
						}}
						image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.pokemon_v2_pokemon[0].id}.png`}
						/>
					<CardContent sx={{textAlign: 'center', alignItems: 'center'}}>
						<Typography gutterBottom variant="h3" component="div">
							{data?.pokemon_v2_pokemon[0].name.charAt().toUpperCase() + data?.pokemon_v2_pokemon[0].name.slice(1)}
						</Typography>
						<Grid color="text.secondary">
							<List component="nav" aria-labelledby="nested-list-subheader">
								<ListItemText>
									Pokedex Index: {data?.pokemon_v2_pokemon[0].order}
								</ListItemText>
								<ListItemText>
									Base Experience: {data?.pokemon_v2_pokemon[0].base_experience}
								</ListItemText>
								<ListItemText>
									Height: {data?.pokemon_v2_pokemon[0].height}
								</ListItemText>
								<ListItemText>
									Weight: {data?.pokemon_v2_pokemon[0].weight}
								</ListItemText>
								<ListItemText onClick={handleClick7}>
									Type: {open7 ? <ExpandMore /> : <ExpandLess />}
								</ListItemText>
								<Collapse in={open7} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItemText>
											{data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map((element,i) => (<ListItemText key={i}>{element.pokemon_v2_type.name}</ListItemText>))}
										</ListItemText>
									</List>
								</Collapse>
								<ListItemText onClick={handleClick6}>
									Basic Stats: {open6 ? <ExpandMore /> : <ExpandLess />}
								</ListItemText>
								<Collapse in={open6} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItemText>
											{data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats.map((element, i) => (<ListItemText key={i}>{element.pokemon_v2_stat.name}:{element.base_stat}</ListItemText>))}
										</ListItemText>
									</List>
								</Collapse>
								<ListItemText onClick={handleClick}>
									First Moves: {open ? <ExpandMore /> : <ExpandLess />}
								</ListItemText>
								<Collapse in={open} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItemText>
											{data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonmoves.map((element, i) => (<ListItemText key={i}>{element.pokemon_v2_move.name} at lvl: {element.level}</ListItemText>
											))}
										</ListItemText>
									</List>
								</Collapse>
									<List  disablePadding>
										<ListItemButton onClick={handleClick5} sx={{justifyContent:'center'}}>
											Evolution Forms: {open5 ? <ExpandMore /> : <ExpandLess />}
										</ListItemButton>
										<Collapse in={open5} timeout="auto" unmountOnExit>
                                            <List disablePadding>
                                            {data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.obj1.arr1.map(item => (
                                            <ListItemText>
                                            {item.name} <br /> {PokeID(item.name)}
                                            </ListItemText>
                                            ))}
                                            </List>
	                                    </Collapse>
									</List>
							</List>
						</Grid>
						<Link to={`/`}>Home</Link>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
		)
};
export default PokeDetails
