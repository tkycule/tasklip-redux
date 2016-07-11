import { Map } from "immutable";

let initialState = Map({
  session: null,
  lists: []
});

export default function reducer(state = initialState, action) {
  return state;
}
