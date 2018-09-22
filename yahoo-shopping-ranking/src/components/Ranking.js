import React from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends React.Component {
  
  // マウント直前に呼ばれる
  componentWillMount() {
    this.props.onMount(this.props.categoryId);
  }
  
  // propsを受け取る直前に呼ばれる
  componentWillReceiveProps(nextProps) {
    // この比較は必要？
    if (this.props.categoryId !== nextProps.categoryId) {
      // props.categoryIdに変化があるので、ページ遷移が発生している
      this.props.onUpdate(nextProps.categoryId);
    }
  }
  
  render() {
    const { category, ranking, error } = this.props;
    console.log(this.props);
    return (
      <div>
        {/* ランキングのタイトル */}
        <h2>{
          typeof category !== 'undefined'
            ? `${category.name}のランキング`
            : ''
        }</h2>
        
        {
           (() => {
             if (error) {
               // エラー表示
               return <p>エラーが発生しました。リロードしてください。</p>;
             } else if (typeof ranking === 'undefined') {
               // リクエスト完了前
               return <p>読み込み中...</p>;
             } else {
               // ランキング表示
               return (
                 <ol>
                   {ranking.map(item => (
                     <li key={`ranking-item-${item.code}`}>
                       <img alt={item.name} src={item.imageUrl} />
                       <a href={item.url} target="_blank">{item.name}</a>
                     </li>
                   ))}
                 </ol>
               );
             }
           })()
        }
      </div>
    );
  }
}
Ranking.propTypes = {
  categoryId: PropTypes.string,
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  
  ranking: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  ),
  
  error: PropTypes.bool.isRequired
};
Ranking.defaultProps = {
  // categoryId=1は総合ランキング
  categoryId: '1'
};