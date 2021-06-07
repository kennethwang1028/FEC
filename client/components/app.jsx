import React from 'react';
import axios from 'axios';
import Overview from './Overview/Overview.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import Reviews from './Reviews/Reviews.jsx';
import QA from './QA/QA.jsx';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list:[],
      targetId: 25821,//reveiws testing. we can initialize with a particular ID
      styles: [],
      loaded: false
    };
    this.fetchGET = this.fetchGET.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.fetchEverything = this.fetchEverything.bind(this);
    this.testing = this.testing.bind(this);

  }

  componentDidMount(){
    this.fetchEverything();
  }


  fetchGET(string, endpoint, stateName){
    return (
      axios.get('/get', {params: {endpoint: `${string}/${endpoint}`}})
      .then((response) =>{
        console.log('successful get request', `${string}/${endpoint}`);
        this.setState({
          [stateName]: response.data,
          //has to set state for data.[whatever key we need from data]
        }, () =>this.setState({loaded: true}))
      })
      .catch(err=> console.error(err))
    );
  };

  fetchEverything() {

    this.fetchGET('qa', `questions/?product_id=${this.state.targetId}`, 'questions');
    //this.fetchGET('products', this.state.targetId, 'list');
  }

  testing(){
    if(this.state.targetId === 25821){
      this.setState({
        targetId:25711,
      },() =>{
        this.fetchGET('qa', `questions/?product_id=${this.state.targetId}`, 'questions');
      })
    }else{
      this.setState({
        targetId:25821,
      },() =>{
        this.fetchGET('qa', `questions/?product_id=${this.state.targetId}`, 'questions');
      })
    }
  };

  renderPage() {
    if(this.state.loaded) {
      return (
        <div>
          <Overview id = {this.state.targetId}/>
          <RelatedItems id={this.state.targetId} fetchGET={this.fetchGET} />
          <QA questions={this.state.questions}/>
          <Reviews id ={this.state.targetId}/>
        </div>
      )
    } else {
      return (
        <div>
          Page Loading ...
        </div>
      )
    }
  }

  render(){
    return (
      <div>
        {/* {this.renderPage()} */}
        <button onClick = {this.testing}> TESTING </button>
        <Reviews id ={this.state.targetId}/>
      </div>
    )
  }
}

export default App;

