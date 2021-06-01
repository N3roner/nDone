import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
      this.state = {
          dogadjaji: [], loading: true, editing: false, new: false
      };

      this.incrementCounter = this.incrementCounter.bind(this);

      fetch('/Dogadjaji')
          .then(response => response.json())
          .then(data => {
              this.setState({ dogadjaji: data, loading: false });              
          });            
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
    }

    static renderDogadjajiTable(dogadjaji) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Naizv</th>                        
                    </tr>
                </thead>
                <tbody>
                    {dogadjaji.map(dogadjaj => (
                        <tr key={dogadjaj.id}>
                            <td>{dogadjaj.naziv}</td>                                                       
                        </tr>
                    ))}
                </tbody>
            </table>
        );

    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Counter.renderDogadjajiTable(this.state.dogadjaji);

    return (
      <div>
            <h1>Counter</h1>

            {contents}
         

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
      </div>
    );
  }
}



/*

import React, { Component } from 'react';

export class Counter extends Component {
    static displayName = Counter.name;

    constructor(props) {
        super(props);
        this.state = { currentCount: 0 };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

                <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
            </div>
        );
    }
}
*/
