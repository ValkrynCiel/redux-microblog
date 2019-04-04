import React, { Component } from 'react';
import BlogCard from './BlogCard';
import { connect } from 'react-redux';
import { getPostTitlesFromApi } from './actions';
// import './HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    await this.props.getPostTitlesFromApi();
    this.setState({ isLoading: false });
  }

  renderPosts() {
    return this.props.titles.map( t =>
      <BlogCard key={t.id}
                id={t.id}
                title={t.title}
                description={ t.description }/>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);