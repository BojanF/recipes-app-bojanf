import { connect } from 'react-redux';
import { recipesActionCreators } from './actions';

function mapStateToProps({ recipes }) {
  return {
    recipes,
  };
}

const mapDispatchToProps = recipesActionCreators;

export function connectRecipes(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
