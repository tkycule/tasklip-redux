import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, ListGroup } from "react-bootstrap";
import Form from "formsy-react-components/release/form";
import { Input } from "formsy-react-components";

import List from "models/List";
import ListItem from "components/ListItem";
import * as actions from "actions";

@connect(
  state => ({
    lists: state.lists,
  }),

  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  })
)
export default class ConfigLists extends React.Component {
  static propTypes = {
    actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    lists: ImmutablePropTypes.list.isRequired,
  }

  constructor(props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
  }

  onSubmit(data, resetForm) {
    this.props.actions.addList({
      list: new List(data),
      onSuccess: resetForm,
    });
  }

  render() {
    return (
      <div>
        <Form layout="elementOnly" onSubmit={this.onSubmit} style={{ marginBottom: "10px" }}>
          <Input
            name="name"
            type="text"
            value=""
            required
            placeholder="New List"
            autoComplete="off"
            buttonAfter={<Button type="submit">
                           <i className="fa fa-plus" />
                         </Button>} />
        </Form>
        <ListGroup>
          {this.props.lists.map(list => <ListItem
                                          list={list}
                                          key={list.id}
                                          destroyList={this.props.actions.destroyList}
                                          updateList={this.props.actions.updateList} />)}
        </ListGroup>
      </div>
      );
  }
}
