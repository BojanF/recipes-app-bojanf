import { connect } from 'react-redux';
import { ingredientsActionCreators } from './actions';

function mapStateToProps({ ingredients }) {
  return {
    ingredients,
  };
}

const mapDispatchToProps = ingredientsActionCreators;

export function connectIngredients(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
