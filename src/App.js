import React, { Component } from 'react';
import axios from './apis/apis';

import { CardList } from './components/CardList/CardList.jsx';
import SearchBox from './components/SearchBox/SearchBox.jsx'

class App extends Component {
  state = {
    monsters: [],
    searchField: '',
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/users');
      this.setState({ monsters: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));

    return (
      <div className='App'>
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder='search monsters'
          handleChange={ this.handleChange }
        />
        <CardList monsters={ filteredMonsters } />
      </div>
    )
  }
}

export default App;
