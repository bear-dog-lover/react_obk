import Nightmare from 'nightmare'
import assert  from 'assert'


describe('じゃんけんアプリ', () => {
  const nightmare = Nightmare({ show: false })
  const URL = 'http://localhost:8080/'

  it('グーをクリックすると対戦が行われ、対戦結果が表示される', (done) => {
    nightmare
    .goto(URL)
    .click('#btn-guu')
    .getTexts('tbody td')
    .then((texts) => {
      const [time, human, computer, judgment] = texts
      assert.equal(human, 'グー')
      assert.ok(computer.match(/^(グー|チョキ|パー)$/))
      assert.ok(judgment.match(/^(勝ち|引き分け|負け)$/))
      done()
    })
  })

  it('グーをクリックした後に対戦成績をクリックすると、対戦成績が表示される', (done) => {
    nightmare
    .goto(URL)
    .click('#btn-guu')
    .click('#tab-status')
    .getTexts('tbody td')
    .then((texts) => {
      const [win, lose, draw] = texts.map((e) => Number(e))
      assert.ok(win >= 0 && win <= 1)
      assert.ok(lose >= 0 && lose <= 1)
      assert.ok(draw >= 0 && draw <= 1)
      assert.equal(win + lose + draw, 1)
      done()
    })
  })

  it('2回クリックすると、対戦結果が2行表示される', (done) => {
    nightmare
    .goto(URL)
    .click('#btn-guu')
    .click('#btn-guu')
    .getTexts('tbody tr')
    .then((texts) => {
      assert.equal(texts.length, 2)
      done()
    })
  })

})