import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";

import Paper from "material-ui/Paper";
import { List, ListItem, MakeSelectable } from 'material-ui/List';
import FontIcon from "material-ui/FontIcon";

import * as actions from "actions";

let SelectableList = MakeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      children: React.PropTypes.node.isRequired,
      selectedIndex: React.PropTypes.string.isRequired,
      onSelect: React.PropTypes.func.isRequired
    };

    componentWillMount() {
      this.props.onSelect(this.props.selectedIndex);
    }

    handleRequestChange = (event, index) => {
      this.props.onSelect(index);
    };

    render() {
      return (
        <ComposedComponent value={this.props.selectedIndex} onChange={this.handleRequestChange}>
          {this.props.children}
        </ComposedComponent>
        );
    }
  };
}

SelectableList = wrapState(SelectableList);

export class Lists extends React.Component {

  static propTypes = {
    lists: ImmutablePropTypes.list
  }

  componentDidMount() {
    this.props.actions.fetchLists();
  }

  onSelectList(index) {
    if (index != -1) {
      this.props.router.push(`/lists/${index}` + (index != "_config_" ? "/tasks" : ""));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname.indexOf("config") == -1 && nextProps.params.listId == undefined && nextProps.lists.size > 0) {
      let list = nextProps.lists.find((list) => list.id == this.props.params.list) || nextProps.lists.get(0);
      this.props.router.push(`/lists/${list.id}/tasks`);
    }
  }

  render() {
    let lists;

    if (!this.props.lists.isEmpty()) {
      lists = this.props.lists.map((list) => <ListItem key={list.id} value={String(list.id)} rightIcon={<span style={{ textAlign: "center", lineHeight: "24px" }}>{list.tasks_count}</span>}>
                                               {list.name}
                                             </ListItem>);
    } else {
      lists = <ListItem value="-1" primaryText="Loading..." />;
    }

    return (
      <div>
        <Paper>
          <SelectableList onSelect={::this.onSelectList} selectedIndex={this.props.params.listId}>
            {lists}
            <ListItem value="_config_" primaryText="&nbsp;" leftIcon={<FontIcon className="material-icons">
                                                                        format_list_bulleted
                                                                      </FontIcon>} />
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
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Lists));
