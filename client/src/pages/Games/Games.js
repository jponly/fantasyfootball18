import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Table } from 'reactstrap';


class Games extends Component {
  state = {
    games: [],
    user: "",
    team: "",
    players: [],
    selectionTable: {},
    points: 0
  };

  componentDidMount() {
    this.loadGames();
    this.loadPlayer();
    
  }

  pointConversion = (player) => {
    var points = 0
      if (player.passingYards >= 25) {
        points += Math.floor(player.passingYards / 25);
      }
      if (player.passingTouchdowns >= 1) {
        points += Math.floor(player.passingTouchdowns / 1);

      }
      if (player.rushingYards >= 10) {
        points += Math.floor(player.rushingYards / 10);
 
      }
      if (player.rushingTouchdowns >= 1) {
        points += Math.floor(player.rushingTouchdowns / 1);

      }
      if (player.receivingYards >= 10) {
        points += Math.floor(player.receivingYards / 10);

      }
      if (player.receivingTouchdowns >= 1) {
        points += Math.floor(player.receivingTouchdowns / 1);
      }
      return points;
  }

  loadPlayer = () => {
    var teamArray = [13320, 16802, 18877, 3807, 11056, 18983];
    var players = this.state.players;

<<<<<<< HEAD
    var teamArray = [13320, 16802, 18877, 3807, 11056, 18983];
  
        for(var i = 0; i<teamArray.length; i++) {
=======
    for (var i = 0; i < teamArray.length; i++) {

      API.getPlayer(this.props.match.params.week_id, teamArray[i])
        .then(res => {
          var player = res.data;
          player.points = this.pointConversion(player);
          players.push(player);
          this.setState({ players })
        })
        .catch(err => console.log(err));
    }
  };


  /*
  function to convert pass/rec/rush yards and TD's to points
  function has for loop which goes through player data
  yards and tds... determines how many yards and td's were made
  comares this to what was set (yards and td's equal x amount of points)
  each row is added up to equal total points
  total points end up in each player's row's points box

  25 pass yards= 1pt
  pass TD= 4pts
  -----
   10 rush yards = 1pt
  Rush TD = 6pts
  -----
  10 receiving yards= 1pt
  Receiving TD = 6pts  
>>>>>>> 3e5c142b5a66d27fe4415eeeeab4274a5c94a0b7
  
  page is refreshed every two minutes ( 120000 ) to update the game
  */
  


  loadGames = () => {
    API.getGames()
      .then(res => {
        this.setState({ games: res.data, user: "", team: "" })

      })
      .catch(err => console.log(err));
  };

  deleteGame = id => {
    API.deleteGame(id)
      .then(res => this.loadGames())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.user && this.state.team) {
      API.saveGame({
        user: this.state.user,
        team: this.state.team,
        players: this.state.players
      })
        .then(res => this.loadGames())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <br></br>
            <br></br>
            <form>
              <Input
                value={this.state.User}
                onChange={this.handleInputChange}
                name="user"
                placeholder="User (required)"
              />
              <Input
                value={this.state.Team}
                onChange={this.handleInputChange}
                name="team"
                placeholder="Team (required)"
              />
<<<<<<< HEAD
              
      <Table hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Player Name</th>
                        <th>Player Position</th>
                      </tr>
                    </thead>
                    <tbody>

        {this.state.players.map(player => (

          <tr>
            <th scope="row">{player.id}</th> 
            <td>Name: {player.name}</td>
            <td>Position: {player.position}</td>
            <td>PasYrds: {player.passingYards}</td>
            <td>PasTD: {player.passingTouchdowns}</td>
            <td>RusYrds: {player.rushingYards}</td>
            <td>RusTD: {player.rushingTouchdowns}</td>
            <td>RecYrds: {player.receivingYards}</td>
            <td>RecTD: {player.receivingTouchdowns}</td>
            </tr>
        ))}              
                    </tbody>
                  </Table>
=======

              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player Name</th>
                    <th>Player Position</th>
                    <th>Pass Yards</th>
                    <th>Pass Touchdowns</th>
                    <th>Rush Yards</th>
                    <th>Rush Touchdowns</th>
                    <th>Receiving Yards</th>
                    <th>Receiving Touchdowns</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>

                  {this.state.players.map(player => (
                    <tr key={player.id}>
                      <th scope="row">{player.id}</th>
                      <td> {player.name}</td>
                      <td> {player.position}</td>
                      <td> {player.passingYards}</td>
                      <td> {player.passingTouchdowns}</td>
                      <td> {player.rushingYards}</td>
                      <td> {player.rushingTouchdowns}</td>
                      <td> {player.receivingYards}</td>
                      <td> {player.receivingTouchdowns}</td>
                      <td> {player.points}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
>>>>>>> 3e5c142b5a66d27fe4415eeeeab4274a5c94a0b7

              <FormBtn
                disabled={!(this.state.team && this.state.user)}
                onClick={this.handleFormSubmit}
              >
                Submit Team
              </FormBtn> 
            </form>
          </Col>
          <Col size="md-6 sm-12">
            {this.state.games.length ? (
              <List>
                {this.state.games.map(game => (
                  <ListItem key={game._id}>
                    <Link to={"/games/" + game._id}>
                      <strong>
                        {game.user}'s Team is {game.team}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteGame(game._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3></h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Games;
