# サービス名
### デジタル名刺アプリ


# サービスの説明
日常の学習を記録できるアプリになります。  
学習内容と学習時間を記入し、登録ボタンを押すことで学習記録を登録でき、一覧に表示することができます。
編集ボタンで学習内容、学習時間を変更できます。
削除ボタンで学習記録のデータを削除できます。  
学習した時間の合計時間も表示することができます。

# 使用技術  
・TypeScript
・Vite
・React
・react-hook-form
・ChakraUI
・Supabase  
・Firebase  
・Jest  
・React Testing Library  

# 起動の仕方
### 1.プロジェクトをクローンする  
```
$ git clone https://github.com/y-kei-yu/digital-business-card.git
$ cd digital-business-card
```
### 2.パッケージをインストールする  
```
npm i
```

### 3.supabaseのアカウントを作成する。  
### 4.新規プロジェクトを作成する(プロジェクト名はdigital-business-card、データベースパスワードは適当)  
### 5. Table Editorで以下のテーブルを作成する
usersテーブル
| colomn | type | option |
| :--- | :--- | :--- |
| user_id | varchar | non null  |
| name | varchar | non null |
| description | text | non null |
| github_id | varchar | null |
| qiita_id | varchar | null |
| x_id | varchar | null |
| create_at | timestamotz | null |

user_skillテーブル
| colomn | type | option |
| :--- | :--- | :--- |
| id | int8 | non null  |
| user_id | varchar | non null |
| skill_id | varchar | non null |

skillsテーブル
| colomn | type | option |
| :--- | :--- | :--- |
| id | int8 | non null  |
| name| varchar | non null |


### 6.`.env`ファイルを作成する
```
touch .env
```
### 7.`.env`ファイルに以下の内容を設定する  
```
VITE_SUPABASE_URL="SupabaseのProject URL"
VITE_SUPABASE_ANON_KEY="SupabaseのProject API Keys"
```  

### 8.以下のコマンドを実行する
```
npm run dev
```





