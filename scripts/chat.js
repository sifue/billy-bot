'use strict';
const Camplog = require('../models/camplog');
Camplog.sync();

module.exports = robot => {

  // "今日のネットキャンプをやりました" か "今日のネットキャンプdone" と言うと登録してくれる
  robot.hear(/今日のネットキャンプをやりました|今日のネットキャンプdone/, msg => {
    const user = msg.message.user;
    let username = msg.message.user.profile.display_name;
    if (!username) {
      username = user.name;
    }

    const today = new Date();
    Camplog.findCreateFind({
      where: {
        userId: user.id,
        date: today
      },
      defaults: {
        userId: user.id,
        date: today,
        userName: username
      }
    }).spread((camplog, isCreated) => {
      Camplog.findAndCountAll({
        where: {
          userId: user.id
        },
      }).then(result => {
        if (isCreated) {
          const message = `${username}、よく頑張ったな！ トータル${result.count}日達成だ。`;
          msg.send(message);
        } else {
          const message = `${username}、もう報告済みだ。 現在はトータル${result.count}日達成だ。`;
          msg.send(message);
        }
      });
    });
  });

  // "何日達成？" か "何日達成?" と聞くと現在の数値を教えてくれる
  robot.hear(/何日達成[？?]/, msg => {
    const user = msg.message.user;
    let username = msg.message.user.profile.display_name;
    if (!username) {
      username = user.name;
    }
    Camplog.findAndCountAll({
      where: {
        userId: user.id
      },
    }).then(result => {
      const message = `${username}、君はトータル${result.count}日達成だ。`;
      msg.send(message);
    });
  });

  // ビリー隊長と呼びかけると答えてくれる
  robot.hear(/ビリー隊長/i, msg => {
    const username = msg.message.user.profile.display_name;
    if (!username) {
      username = user.name;
    }

    const messages = [
      `${username}、習慣が変え、意識を変えるんだ！`,
      `${username}、声をだすのが重要だ！声を出して心のスイッチをいれるんだ！`,
      'この場所へ心が導いてくれた。明日の場所へ心が導いてくれる。',
      '俺をタフな男に変えたのは空手との出会い。肉体だけでなく内面が変わらなければ、本当に強いカラダは手に入らない。',
      '根性あるのみ。途中で諦める人も多い。心のトレーニングも必要ってわけだ。',
      'トレーニングをして満足感を得る人がいるけど、それは長続きしないよ。大切なのは内面を磨くこと。',
      'ブートキャンプをやり遂げて、自信をつかめば必ず変わる！　さあもっと声を！　モア・パワー！　力はあなたの手の中にある！',
      '捨て身になるんだ。きっとやり遂げられる。それが最初の一歩だ！',
      '力はあなたの手の中にある。自分がいま持っているものを信じて。I believe!',
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    msg.send(message);
  });
};
