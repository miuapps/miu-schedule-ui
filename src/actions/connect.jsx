import { Connect } from "react-redux";
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user,
    };
  }
  export default Connect(mapStateToProps)(Connect);