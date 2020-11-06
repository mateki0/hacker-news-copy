import React,{Component} from 'react';
import PageListItem from './styled/PageListItem';
import PagesList from './styled/PagesList';
import PaginationContainer from './styled/PaginationContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft,faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
class Pages extends Component{
  render(){
    
    let pages = [];
    const page= this.props.page;
    const totalPages = this.props.totalPages;
      if(page>1){
        pages.push(<PageListItem key="backward" onClick={this.props.decrementPage}> <FontAwesomeIcon icon={faAngleDoubleLeft}/> </PageListItem>)
      }
      let howMany = 0;
      let nextPage;
      if (totalPages === 1){
        nextPage = false;
        howMany = 0;
      } else if(totalPages > 1 && parseInt(page)+5 > totalPages){
        nextPage = true
        howMany = totalPages - page;
      } else{
        nextPage = true
        howMany = 5;
      }

      for(var i=1; i<=parseInt(page)+howMany; i++){
        pages.push(<PageListItem key={i}  onClick={this.props.fetchNewPage}>{i}</PageListItem>)
          if(i===totalPages){
            nextPage=false;
          }
      }
      if(nextPage===true){
        pages.push(<PageListItem key="forward" onClick={this.props.incrementPage}><FontAwesomeIcon icon={faAngleDoubleRight}/></PageListItem>)
      }
    return(
<PaginationContainer>
  <PagesList>
  {pages}
    
  </PagesList>
</PaginationContainer>
    )
  }
}
export default Pages;