let { MessageType } = require('@adiwajshing/baileys')
let pajak = 0
let handler = async (m, { conn, text }) => {
  if (!text) throw 'Masukkan jumlah exp yang akan diberi'
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'Tag salah satu lah'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (isNaN(txt)) throw 'Hanya angka'
  let xp = parseInt(txt)
  let exp = xp
  let pjk = Math.ceil(xp * pajak)
  exp += pjk
  if (exp < 1) throw 'Minimal 1'
  let users = global.db.data.users
  users[m.sender].exp = exp
  users[who].exp += xp

  m.reply(`(${-xp} XP) + (${-pjk} XP ) = ( ${-exp} XP)`)
  conn.fakeReply(m.chat, `+${xp} XP`, who, m.text)
}
handler.help = ['givexp @user <amount>']
handler.tags = ['xp']
handler.command = /^givexp$/

handler.rowner = true

module.exports = handler

