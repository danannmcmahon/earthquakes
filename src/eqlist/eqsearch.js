import React from 'react';
import { EqDisplay } from './eqdisplay';
import axios from 'axios';
import { Container, Row, Table } from 'react-bootstrap';




export class EqSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        value: 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson', 
        startdate: '', 
        enddate: '', 
        eqs:  { metadata: {count: 0} },
        magop: 'minmagnitude',
        mag: '0',
        long: '0',
        lat: '0',
        rad: '20000',
        sort: 'magnitude',
        magyn: false,
        geo: false,
        submitmag: 'disabled',
        submitgeo: 'disabled',
        setclass: 'ready',
        setclassb: 'load',
    };
    

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMag = this.handleMag.bind(this);
        this.handleGeo = this.handleGeo.bind(this);
        this.handleLoad = this.handleLoad.bind(this);

      }

      handleChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }

      handleMag(event){
          this.setState({magyn: event.target.checked});
        console.log(this.state.magyn);
          if (this.state.magyn !== true){
            this.setState({submitmag: ''});
          }else{
            this.setState({submitmag: 'disabled'});
          }
      }

      handleGeo(event){
        this.setState({geo: event.target.checked});
      console.log(this.state.geo);
        if (this.state.geo !== true){
          this.setState({submitgeo: ''});
        }else{
          this.setState({submitgeo: 'disabled'});
        }
    }
    
    handleLoad(){
        if(this.state.setclass === 'ready'){
            this.setState({setclass: 'load'});
            this.setState({setclassb: 'ready'});
        }else{
            this.setState({setclass: 'ready'});
            this.setState({setclassb: 'load'});
        }
    }

    getEarthquakes(s) {
        // Simple GET request using axios
        axios.get(s)
            .then(res => {

                const eqs = res.data;
                this.setState({ eqs });              
                this.handleLoad();
    }
    
    )};

      handleSubmit(event) {

        if(this.state.startdate >= this.state.enddate || this.state.startdate === ""){
            alert("Please validate dates.");
        }else{
        this.handleLoad();
        const area = "&latitude=" + this.state.lat + "&longitude=" + this.state.long + "&maxradiuskm="+this.state.rad;
        const magn = '&' + this.state.magop + '=' + this.state.mag;
        const sortby = '&orderby=' + this.state.sort;
        var url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime='+ this.state.startdate +'&endtime=' + this.state.enddate + sortby;
        if(this.state.submitmag === ''){
            url += magn;
        }
        if(this.state.submitgeo === ''){
            url += area;
        }
        url+='&limit=20000';
        this.getEarthquakes(url)
        event.preventDefault();
    }
      }
    
      render() {
        return (
            <div>
                <header className="App-header">
                <span className="Header-left">
                    <h3>Earthquake Information</h3>
                    </span>
            <div className="Header-right">
          <form onSubmit={this.handleSubmit}>
              <Container Fluid className="MenuBody">
              <Row>
                
            <label className="col-sm">
                <div className="catHead">Dates:</div>
                From:<input type="date" name="startdate" value={this.state.startdate} onChange={this.handleChange} /><br/>
                To:<input type="date" name="enddate" value={this.state.enddate} onChange={this.handleChange} />
            </label>
            
            <label className="col-sm">
            <div className="catHead">Magnitude: <input type="checkbox" name="magyn" value={this.state.magyn} onChange={this.handleMag}/></div>
                <select value={this.state.magop} name="magop" disabled={this.state.submitmag} onChange={this.handleChange}><option value="minmagnitude">Greater Than</option><option value="maxmagnitude">Less Than</option></select><br/>
                <input type="number" min="-2" max="10" name="mag" disabled={this.state.submitmag} value={this.state.mag} onChange={this.handleChange} />
            </label>
            
            <label className="col-sm">
            <div className="catHead">Geometrics: <input type="checkbox" name="geo" value={this.state.geo} onChange={this.handleGeo}/></div>
                Longitude:<input type="number" min="-180" max="180" name="long" disabled={this.state.submitgeo} value={this.state.long} onChange={this.handleChange} /><br/>
                Latitude:<input type="number" min="-90" max="90" name="lat" disabled={this.state.submitgeo} value={this.state.lat} onChange={this.handleChange} /><br/>
                Radius (km):<input type="number" min="0" max="20001" name="rad" disabled={this.state.submitgeo} value={this.state.rad} onChange={this.handleChange} />
            </label>
            
            <label className="col-sm">
            <div className="catHead">Sort By:</div>
                <select value={this.state.sort} name="sort" onChange={this.handleChange}>
                    <option value="magnitude-asc">Magnitude ASC</option>
                    <option value="magnitude">Magnitude DESC</option>
                    <option value="time-asc">Time ASC</option>
                    <option value="time">Time DESC</option>
                </select>
            </label>
            <br/>
            
            </Row>
            <Row>
            <input className="myButton" type="submit" value="Search" />
            </Row>
            </Container>
          </form>
          </div>
          </header>
          <Container name="results" className="results">
            <p className={this.state.setclassb}>Loading...</p>
          <p className={this.state.setclass}>Number of Results: {this.state.eqs.metadata.count}</p>
          <Table className="tablebody tableresponsive"><tr className="tableHead"><th>Magnitude</th><th>Location</th><th>Longitude</th><th>Latitude</th><th>Depth (km)</th><th>Alert</th><th>More Information</th></tr>
          <EqDisplay earthquakes ={this.state.eqs}></EqDisplay>
          </Table>
          </Container>
          </div>
        );
      }

      
}
