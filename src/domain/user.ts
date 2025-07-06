export class User {
  constructor(
    public user_id: string,
    public name: string,
    public description: string,
    public skill: string,
    public qiita_url: string,
    public github_url: string,
    public x_url: string
  ) {}

  //IDだけの生データ」を使って、「URLつきの User オブジェクトを作って返す」関数
  static createWithLinks(
    user_id: string,
    name: string,
    description: string,
    skill: string,
    qiita_id: string,
    github_id: string,
    x_id: string
  ): User {
    return new User(
      user_id,
      name,
      description,
      skill,
      qiita_id ? `https://qiita.com/${qiita_id}` : "",
      github_id ? `https://github.com/${github_id}` : "",
      x_id ? `https://x.com/${x_id}` : ""
    );
  }
}
