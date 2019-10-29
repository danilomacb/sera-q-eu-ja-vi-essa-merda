import { connect } from "react-redux";

import Watcheds from "../components/Watcheds";

const mapStateToProps = state => {
  return { watcheds: state.reducer.watcheds };
};

const WatchedsContainer = connect(mapStateToProps)(Watcheds);

export default WatchedsContainer;
