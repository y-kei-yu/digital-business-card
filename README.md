# サービス名
### デジタル名刺アプリ


# サービスの説明
このサービスでは、名刺情報の登録・確認ができます。
「新規登録はこちら」のリンクから、新しい名刺情報を登録できます。
<br/>
登録した名刺では、以下の情報を確認できます。<br/>
	•	好きな英単語 <br/>
	•	名前 <br/>
	•	自己紹介（HTMLタグ使用可） <br/>
	•	好きな技術<br/>
	•	GitHubアカウント<br/>
	•	Qiitaアカウント<br/>
	•	X（Twitter）アカウント<br/>
<br/>
また、毎朝6時に、前日に作成された名刺情報を削除するバッチ処理が自動で実行されます。

# 使用技術  
・TypeScript <br/>
・Vite<br/>
・React<br/>
・react-hook-form <br/>
・ChakraUI <br/>
・Supabase  <br/>
・Firebase  <br/>
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





