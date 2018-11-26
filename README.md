# React Native ActionSheet

## 使い方

- react-native-router-flux を使う
- LiteBoxでコンポーネント読み込み
- obj渡して表示

## 値の渡し方
```
Actions.ActionSheet({
  title: 'タイトル',
  options: [
    {
      value: 'オプション１',
      action: () => {console.log("アクション")}
      close: false,               // actionの後にActionSheetを閉じるか
      style: {color: '#ce4844'},  // オプション毎にスタイルを当てられる。文字色とか便利
      hide: false                 // 表示するかどうか
    }
  ]
```
