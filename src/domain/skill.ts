export class Skill {
  constructor(public id: string, public name: string) {}

  //userクラスの名前と被るのでスキルのデータをわかるように画面ように変換
  get skill_id(): string {
    return this.id;
  }
  get skill_name(): string {
    return this.name;
  }
}
