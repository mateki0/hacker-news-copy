import React,{Component} from 'react';
import PageListItem from './styled/PageListItem';
import PagesList from './styled/PagesList';
import PaginationContainer from './styled/PaginationContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft,faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
class Pages extends Component{
  state = {
      page:this.props.page,
      totalPages:this.props.totalPages,
      pages: [],
    }
    componentDidMount(){
      this.handlePagesRender();
    }
    handlePagesRender = () => {
      if(this.state.page>1){
        const backward = <PageListItem key="backward" onClick={this.props.decrementPage}> <FontAwesomeIcon icon={faAngleDoubleLeft}/> </PageListItem>
        this.setState(prevState => ({pages:[...prevState.pages, backward]}))
      }
      let howMany = 0;
      let nextPage;
      if (this.state.totalPages === 1){
        nextPage = false;
        howMany = 0;
      } else if(this.state.totalPages > 1 && parseInt(this.state.page)+5 > this.state.totalPages){
        nextPage = true
        howMany = this.state.totalPages - this.state.page;
      } else{
        nextPage = true
        howMany = 5;
      }
      for(var i=1; i<=parseInt(this.state.page)+howMany; i++){
        const page = <PageListItem key={i} isActive={parseInt(this.state.page)===i} onClick={this.props.fetchNewPage}>{i}</PageListItem>
        this.setState(prevState => ({pages:[...prevState.pages, page]}))
          if(i===this.state.totalPages){
            nextPage=false;
          }
      }
      if(nextPage===true){
        const forward = <PageListItem key="forward" onClick={this.props.incrementPage}><FontAwesomeIcon icon={faAngleDoubleRight}/></PageListItem>
        this.setState(prevState => ({pages:[...prevState.pages, forward]}))
      }
    }
  render(){
    return(
      <PaginationContainer>
        <PagesList>
        {this.state.pages}
          
        </PagesList>
      </PaginationContainer>
    )
  }
}
export default Pages;