import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Nav from '../components/Nav';

// コンポーネント側にstateを渡したいときはmapStateToProps
const mapStateToProps = state => ({
  // state.shopping.categoiresをprops.categoriesに紐付け
  categories: state.shopping.categories
});

// コンポーネント側に関数を渡したいときはmapDispatchToProps
const mapDispatchToProps = dispatch => ({
  onClick(path) {
    // onClick時にreact-router-reduxのpushでページ遷移を発生させる
    dispatch(push(path));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);