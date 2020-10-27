import React, {Component} from 'react';

export class EqDisplay extends Component {

    render() {
    if (this.props.earthquakes.features == null || this.props.earthquakes.features.length === 0) {
    return <tr><h5 className="p-2">No Results</h5></tr>
    }
    
    return this.props.earthquakes.features.map(p => 
    <tr key={p.id}><td>
    { p.properties.mag }
    </td><td>
    { p.properties.place }
    </td><td>
    { p.geometry.coordinates[0].toFixed(2) }
    </td><td>
    { p.geometry.coordinates[1].toFixed(2) }
    </td><td>
    { p.geometry.coordinates[2] }
    </td><td className={'eq'+ p.properties.alert}>
    { p.properties.alert }
    </td><td>
    <a href = {p.properties.url} target="_blank" rel="noreferrer">Alaska Earthquake Centre</a>
    </td></tr>
   
    )
    
    }
}