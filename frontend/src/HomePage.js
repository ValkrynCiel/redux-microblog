import React, { Component } from 'react';
import BlogCard from './BlogCard';
import { connect } from 'react-redux';
import { getPostTitlesFromApi, updateVoteToApi } from './actions';
// import './HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  /**
   * populate redux state with posts array from api call
   */

  async componentDidMount() {
    await this.props.getPostTitlesFromApi();
    this.setState({ isLoading: false });
  }

  renderPosts() {
    const titles = [...this.props.titles];
    titles.sort((a, b) => b.votes - a.votes);
    return titles.map( ({ id, title, description, votes }) =>
      <BlogCard key={ id }
                id={ id }
                title={ title }
                description={ description }
                votes={ votes }
                updateVote={ this.props.updateVoteToApi }/>
      )
  }

  render() {
    const titles = this.renderPosts();
    return (
      <div className="HomePage col-8">
        { this.state.isLoading
        ? 'loading...'
        : titles
        }
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return { titles: reduxState.titles };
}

const mapDispatchToProps = {
  getPostTitlesFromApi,
  updateVoteToApi,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);