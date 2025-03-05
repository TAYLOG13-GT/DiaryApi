import React, { Component } from 'react';
import { withRouter } from "./withRouter";

class FetchData extends React.Component {
  static displayName = FetchData.name;

  constructor(props) {
      super(props);
      this.state = { forecasts: [], Reference: String, loading: true };
     
  }

  componentDidMount() {
      this.populateWeatherData();
  }

    static renderForecastsTable(forecasts,reference) {
     
        return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
                  <td>{forecast.temperatureF}</td>
                  <td>{forecast.summary + reference}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : FetchData.renderForecastsTable(this.state.forecasts, this.state.Reference);

    return (
      <div>
        <h1 id="tableLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

    async populateWeatherData() {
    
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, Reference: this.props.location.state.reference, loading: false });
  }
}
export default withRouter(FetchData)