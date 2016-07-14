import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";

import Paper from "material-ui/Paper";
import { List, ListItem, MakeSelectable } from 'material-ui/List';

import * as actions from "actions";


let SelectableList = MakeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      children: React.PropTypes.node.isRequired,
      defaultValue: React.PropTypes.number.isRequired,
      onSelect: React.PropTypes.func.isRequired
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue
      });
      this.props.onSelect(this.props.defaultValue);
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });
      this.props.onSelect(index);
    };

    render() {
      return (
        <ComposedComponent value={this.state.selectedIndex} onChange={this.handleRequestChange}>
          {this.props.children}
        </ComposedComponent>
        );
    }
  };
}

SelectableList = wrapState(SelectableList);

export class Lists extends React.Component {

  static propTypes = {
    lists: ImmutablePropTypes.list,
    fetchLists: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchLists();
  }

  onSelectList(index) {
    console.log(index);
    if (index != -1) {
      this.props.router.push(`/lists/${this.props.lists.get(index).id}/tasks`);
    }
  }

  render() {
    let lists;

    if (!this.props.lists.isEmpty()) {
      lists = this.props.lists.map((list, index) => <ListItem key={list.id} value={index} rightIcon={<span>{list.tasks_count}</span>}>
                                                      {list.name}
                                                    </ListItem>);
    } else {
      lists = <ListItem primaryText="Loading..." />;
    }

    return (
      <div>
        <Paper>
          <SelectableList onSelect={::this.onSelectList} defaultValue={-1}>
            {lists}
          </SelectableList>
        </Paper>
        {this.props.children}
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLists: bindActionCreators(actions.fetchLists, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Lists));
