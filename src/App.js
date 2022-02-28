import React from "react";
import './App.css';
import Pokedex from "pokedex-promise-v2";

function App() {
  const max = 898;
  const min = 1;
  const [myName, setMyName] = React.useState("");
  const [myImage, setMyImage] = React.useState("");
  const [myHp, setMyHp] = React.useState("");
  const [myAttack, setMyAttack] = React.useState("");
  const [myDefense, setMyDefense] = React.useState("");
  const [myType, setMyType] = React.useState("");
  const [mySeed, setMySeed] = React.useState(Math.floor(Math.random() * (max - min + 1)) + min);
  const [lastSeed, setLastSeed] = React.useState(1);

  const P = new Pokedex();

  const handleClickAsync = (event) => {
    (async () => {
      // with Async/Await
      try {
        const pokemonSpecial = await P.getPokemonByName(
          mySeed,
          (response, error) => {
            // with callback
            if (!error) {
              console.log(response);
              console.log(response.name);

              setMyName(response.name);
              setMyImage(response.sprites.front_default);
              setMyHp(response.stats[0].base_stat);
              setMyAttack(response.stats[1].base_stat);
              setMyDefense(response.stats[2].base_stat);
              var types = response.types.map((t) => t.type.name);
              setMyType(types.toString());
              // var moves = response.moves.map((v) => v.move.name);
              // setMyMoves(moves.toString());
            } else {
              console.log(error);
            }
          }
        );

      } catch (error) {
        throw error;
      }
    })();
  };

  const handleGenerateSeed = (event) => {    
    handleClickAsync();
    setLastSeed(mySeed);
    setMySeed(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  if (myName == ""){
return(
  <div className="App">
    <div className="outerBlock">
          <div className="innerBlock">
            <h3>Welcome to the </h3>
      <h1>Pokedex</h1>
      <button  className="btn btn-sm btn-primary" onClick={handleGenerateSeed}>Get a Pokemon </button> <br />
    </div>
    </div>
  </div>
)
  }
  else {
    return (

      <div className="App">
        <div className="outerBlock">
          <div className="innerBlock">
        <h1>{myName}</h1>
        <img className="pokeImage" alt="Unrendered Image" src={myImage} /> <br />
        Hp: {myHp} <br />
        Attack: {myAttack} <br />
        Defense: {myDefense} <br />
        Type: {myType} <br />
        {/* Moves: {myMoves} <br /> */}
        <br />
        Pokemon Number: <span>{lastSeed}</span> / 898 <br /><br />
        <button className="btn btn-sm btn-primary" onClick={handleGenerateSeed}>Get Another Pokemon </button> <br />
        {/* <button onClick={handleClickAsync}>Test Async</button> <br /> */}
        </div>
        </div>
      </div>
      
    );
  }
  
}

export default App;
