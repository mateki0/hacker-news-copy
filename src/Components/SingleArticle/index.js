import React, { Component } from 'react';
import Moment from 'react-moment';
import ArticleWrapper from './styled/ArticleWrapper';
import DefaultSpan from './styled/DefaultSpan';
import PairContainer from './styled/PairContainer';
import Source from './styled/Source';
import Title from './styled/Title';
import TitleWrapper from './styled/TitleWrapper';

class SingleArticle extends Component {
  render() {
    return (
      <ArticleWrapper>
        <TitleWrapper>
          <Source>({this.props.source})</Source>
          <Title href={this.props.link + this.props.id} target="_blank">
            {this.props.title}
          </Title>
        </TitleWrapper>
        <PairContainer>
          <DefaultSpan>{this.props.score} points</DefaultSpan>
          <DefaultSpan>
            <Moment fromNow unix>
              {this.props.time}
            </Moment>
          </DefaultSpan>
        </PairContainer>
        <PairContainer>
          <DefaultSpan>{this.props.comments} comments</DefaultSpan>
          <DefaultSpan>by {this.props.author}</DefaultSpan>
        </PairContainer>
      </ArticleWrapper>
    );
  }
}

export default SingleArticle;
