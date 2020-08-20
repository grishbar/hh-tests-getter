import React from 'react';
import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.getTestsData = this.getTestsData.bind(this);
    this.state={testsData: []};
  }

  async getTestsData() {
    const response = await fetch('/api/tests-data');
    const testsData = await response.json();
    this.setState({
      testsData: testsData.tests
    });
  }

  componentDidMount() {
    window.setInterval(this.getTestsData, 5000);
    /* 
    setTimeout(() => {
      fetch('https://hh-tests-getter.herokuapp.com/api/tests-data/add-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({test: ['1 3', '1 4']})
      });
    }, 10000)
    */
  }

  render () {
    return (
      <table className="table table-blur">
        <thead className="table-blur__head">
          <tr>
            <td>номер теста</td>
            <td>тест</td>
          </tr>
        </thead>
        <tbody>
          {this.state.testsData && this.state.testsData.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item.join(',')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}