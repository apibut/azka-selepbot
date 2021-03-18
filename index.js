const {
    WAConnection,
    Mimetype,
    Presence,
    MessageType,
    GroupSettingChange,
    waMessageKey,
    Browsers
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { color, processTime, sleep, getGroupAdmins, getRandom, hilih } = require('./utils/index')
const { fetchJson, getBuffer, fetchText, uploadImages } = require('./utils/fetcher')
const { custom, random } = require('./utils/meme')
// const { fisheye } = require('./utils/fisheye')
const { exec, spawn } = require('child_process')
const translate = require('./utils/translate')
const moment = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')
const fetch = require('node-fetch')
const figlet = require('figlet')
const lolcatjs = require('lolcatjs')
const phoneNum = require('awesome-phonenumber')
const { menuId } = require('./teks')
const { nsfw } = require('./lib/nsfw')
const apikey = "azka"

prefix = '.'
fake = '𝐒𝐄𝐋𝐅𝐁𝐎𝐓'
numbernya = '0'
let gambar64 = "" || fs.readFileSync('./media/images/me.jpg')

function kyun(seconds){
    function pad(s){
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
  
    //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
    return `-[ 𝙍𝙐𝙉𝙏𝙄𝙈𝙀 ]-\n${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S`
}
/*********** LOAD FILE ***********/

const antilink = JSON.parse(fs.readFileSync('./lib/antilink.json'))

/*********** END LOAD ***********/

async function starts() {
    const client = new WAConnection()

    client.logger.level = 'warn'
    client.browserDescription=Browsers.ubuntu("Chrome")

    client.on('qr', () => {
        console.log('[', color('!', 'red') ,']', 'Please, scan the QR code!')
    })

    fs.existsSync('./Midnight.json') && client.loadAuthInfo('./Midnight.json')
    client.on('connecting', () => {
        console.log(color('Connecting to WhatsApp...', 'green'))
    })
    client.on('open', () => {
        console.log(color('Connected', 'green'))
        lolcatjs.fromString(figlet.textSync('Welcome', 'Larry 3D'))
    })
    await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Midnight.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

    client.on('chat-update', async (mek) => {
        try {
            if (!mek.hasNewMessage) return
            mek = JSON.parse(JSON.stringify(mek)).messages[0]
            if (!mek.message) return
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            global.prefix
            const content = JSON.stringify(mek.message)
            const from = mek.key.remoteJid
            const type = Object.keys(mek.message)[0]
            const { text, extendedText, liveLocation, contact, contactsArray, location, image, video, sticker, document, audio, product } = MessageType
            const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
            budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
            const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
            const arg = body.substring(body.indexOf(' ') + 1)
            const args = body.trim().split(/ +/).slice(1)
            const isCmd = body.startsWith(prefix)
            var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
            const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
            const totalchat = await client.chats.all()

            const botNumber = client.user.jid
            const ownerNumber = ["6281215524272@s.whatsapp.net"] // Replace with your number
            const isGroup = from.endsWith('@g.us')
            const sender = isGroup ? mek.participant : mek.key.remoteJid
            const sender1 = sender === undefined ? botNumber : sender
            const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isGroupAdmins = groupAdmins.includes(sender) || false
            const isOwner = ownerNumber.includes(sender)
            const isAntiLink = isGroup ? antilink.includes(from) : false
            pushname2 = client.contacts[sender1] != undefined ? client.contacts[sender1].vname || client.contacts[sender1].notify : undefined
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
            }
 //function antilink 
				if (messagesC.includes("://chat.whatsapp.com/")){
					if (!isGroup) return
					if (!isAntiLink) return
					if (isGroupAdmins) return reply('UNTUNG KAMU ADMIN GROUP :V ')
					client.updatePresence(from, Presence.composing)
					var kic = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Link Group Terdeteksi `)
						client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}
 mess = {
			wait: 'LOADING...',
			success: 'Berhasil!'
			}	       
            const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
            const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
            if (!isGroup && !isCmd) console.log(color(`[${time}]`, 'yellow'), color("[ PRIVATE ]", "aqua"), 'message from', color(sender1.split("@")[0]))
            if (isGroup && !isCmd) console.log(color(`[${time}]`, 'yellow'), color('[ GROUP ]', 'aqua'), 'message from', color(sender1.split("@")[0]), 'in', color(groupName))
            if (!mek.key.fromMe && isGroup && isCmd) console.log(color(`[${time}]`, 'yellow'), color('[ GROUP ]', 'aqua'), 'message from', color(sender1.split("@")[0]), 'in', color(groupName))
            if (isGroup && isCmd) console.log(color(`[${time}]`, 'yellow'), color('[ EXEC ]'), 'from', color(sender1.split("@")[0]), 'in', color(groupName))
            if (!isGroup && isCmd) console.log(color(`[${time}]`, 'yellow'), color("[ EXEC ]"), 'from', color(sender1.split("@")[0]))
            
            if (mek.key.fromMe) {
                switch(command) {
                    case 'ping':
                        case 'speed':
                            reply(`Pong, *${processTime(mek.messageTimestamp, moment())} _Seconds_*`)
                            break
                    case 'help': {
                        const teks = {
                            text: menuId.Help(prefix),
                            contextInfo: {
                                participant: `0@s.whatsapp.net`,
                                remoteJid: "status@broadcast",
                                quotedMessage: {
                                    productMessage: {
                                        product: {
                                            currencyCode: "USD",
                                            description: fake,
                                            title: fake,
                                            priceAmount1000: "999999999",
                                            productImageCount: 1,
                                            productImage: {
                                                mimetype: "image/png",
                                                jpegThumbnail: gambar64
                                            }
                                        },
                                        businessOwnerJid: "0@s.whatsapp.net"
                                    }
                                }
                            }
                        }
                        client.sendMessage(from, teks, text)
                    }
                    break
               case 'antilink':
					if (args.length < 1) return reply('enable or disable ')
					if ((args[0]) === 'enable' ) {
						antilink.push(from)
						fs.writeFileSync('./lib/antilink.json', JSON.stringify(antilink))
						reply('ANTILINK ACTIVE ✔️')
					} else if ((args[0]) === 'disable' ) {
						antilink.splice(from, 1)
						fs.writeFileSync('./lib/antilink.json', JSON.stringify(antilink))
						reply('ANTILINK NONAKTIF ✔️')
					} else {
						reply('enable untuk mengaktifkan, disable untuk menonaktifkan')
					}
					break
                    case 'h':
                    case 'hidetag':
                        var value = args.join(" ")
                        var grup = await client.groupMetadata(from)
                        var member = grup['participants']
                        var mem = []
                        member.map( async adm => {
                            mem.push(adm.jid)
                        })
                        var options = {
                            text: value,
                            contextInfo: {
                                mentionedJid: mem
                            }
                        }
                        client.sendMessage(from, options, text)
                        break
                    case 'f':
                    case 'fake':
                        var value = args.join(" ")
                        var options = {
                            text: value,
                            contextInfo: {
                                participant: '0@s.whatsapp.net',
                                remoteJid: 'status@broadcast',
                                isForwarded: true,
                                forwardingScore: 300,
                                quotedMessage: {
                                    documentMessage: {
                                        fileName: fake,
                                        jpegThumbnail: gambar64,
                                        mimetype: 'application/pdf',
                                        pageCount: 200
                                    }
                                }
                            }
                        }
                        client.sendMessage(from, options, text)
                        break
                    case '.':
                    let code = args.join(" ")
                try {

                if (!code) return client.reply(from, 'No JavaScript Code', id)
                let evaled;

                if (code.includes("--silent") && code.includes("--async")) {
                code = code.replace("--async", "").replace("--silent", "");

                return await eval(`(async () => { ${code} })()`)
                } else if (code.includes("--async")) {
                code = code.replace("--async", "");
        
                evaled = await eval(`(async () => { ${code} })()`);
                } else if (code.includes("--silent")) {
                code = code.replace("--silent", "");
        
                return await eval(code);
                } else evaled = await eval(code);

              if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled, { depth: 0 });
  
            let output = clean(evaled);
            var options = {
                contextInfo: {
                    participant: '0@s.whatsapp.net',
                    quotedMessage: {
                        extendedTextMessage: {
                            text: "𝐄𝐗𝐄𝐂𝐔𝐓𝐎𝐑"
                        }
                    }
                }
            }
            client.sendMessage(from, `${output}`, text, options)
            } catch(err) {
            console.error(err)
            reply(err)
            }
            function clean(text) {
            if (typeof text === "string")
              return text
                .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                .replace(/@/g, `@${String.fromCharCode(8203)}`);
            // eslint-disable-line prefer-template
            else return text;
            }
            break
            case 'setprefix':
                if (args.length < 1) return
                prefix = args[0]
                reply(`*Prefix berhasil diubah ke ${prefix}*`)
                break
            case 'setnomor':
                if (args.length < 1) return
                numbernya = args[0]
                reply(`*Berhasil ubah nomor ke ${numbernya}*`)
                break
            case 'setpesan':
                if (args.length < 1) return
                fake = args.join(" ")
                reply(`*Berhasil mengubah pesan reply ke: ${fake}*`)
                break
            case 'runtime':
                runtime = process.uptime()
                teks = `${kyun(runtime)}`
                const rtime = {
                    contextInfo: {
                        participant: `${numbernya}@s.whatsapp.net`,
                        remoteJid: 'status@broadcast',
                        quotedMessage: {
                            extendedTextMessage: {
                                text: "-[ 𝙎𝙏𝘼𝙏𝙐𝙎 ]-"
                            }
                        }
                    }
                }
                client.sendMessage(from, `${teks}`, text, rtime)
                break
            case 'toimg':
                if ((isQuotedSticker && mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === false)) {
                    encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.png')
                    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return reply('ada yang error')
                        buffer = fs.readFileSync(ran)
                        client.sendMessage(from, buffer, image, {quoted:mek, caption: "nih dah jadi"})
                        fs.unlinkSync(ran)
                    })
                } else if ((isQuotedSticker && mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated)) {
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.gif')
                    ranw = getRandom('.mp4')
                    spawn('./webp2gif', [
                        media,
                        ran
                    ]).on('error', (err) => {
                        reply(`Error: ${err}`).then(() => {
                            console.log(err)
                        })
                        fs.unlinkSync(media)
                    }).on('close', () => {
                        fs.unlinkSync(media)
                        exec(`ffmpeg -i ${ran} -pix_fmt yuv420p ${ranw}`, (err) => {
                            if (err) return reply('error')
                            client.sendMessage(from, fs.readFileSync(ranw), video, {quoted:mek, mimetype: 'video/gif'})
                            fs.unlinkSync(ran)
                            fs.unlinkSync(ranw)
                        })
                    })
                } else {
                    reply('reply stickernya bang')
                }
                break
                case 's':
                case 'stiker':
                case 'sticker':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        await ffmpeg(`./${media}`)
                            .input(media)
                            .on('start', function (cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                reply(mess.error.stick)
                            })
                            .on('end', function () {
                                console.log('Finish')
                                client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
                                fs.unlinkSync(media)
                                fs.unlinkSync(ran)
                            })
                            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
						} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                            const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                            const media = await client.downloadAndSaveMediaMessage(encmedia)
                            ran = getRandom('.webp')
                            reply('LOADING OM')
                            await ffmpeg(`./${media}`)
                            .inputFormat(media.split('.')[1])
                            .on('start', function (cmd) {
                                console.log(`Started: ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error: ${err}`)
                                fs.unlinkSync(media)
                                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                                reply(`Gagal mengkonversi ${tipe} menjadi sticker`)
                            })
                            .on('end', function () {
                                console.log('Finish')
                                client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
                                fs.unlinkSync(media)
                                fs.unlinkSync(ran)
                            })
                            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                        } else {
                            reply('Tidak ada video/gif/gambar yang akan dijadikan stiker!')
                        }
                break
                case 'meme':
                    reply('Bentar om, lagi nyari...')
                    var { author, title, postLink, url } = await random()
                    var buffer = await getBuffer(url)
                    var options = {
                        caption: '-[ 𝙈𝙀𝙈𝙀𝙂𝙀𝙉 ]-',
                        contextInfo: {
                            participant: `${numbernya}@s.whatsapp.net`,
                            quotedMessage: {
                                extendedTextMessage: {
                                    text: `*Author: ${author}*\n*Title: ${title}*\n*Link: ${postLink}*`
                                }
                            }
                        }
                    }
                    client.sendMessage(from, buffer, image, options)
                    break
                case 'memeimg':
                    case 'memeimage':
                            if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length > 2) {
                                const top = arg.split('|')[0]
                                const bottom = arg.split('|')[1]
                                const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
                                const media = await client.downloadMediaMessage(encmedia, 'buffer')
                                const getUrl = await uploadImages(media, false)
                                const memeRes = await custom(getUrl, top, bottom)
                                client.sendMessage(from, memeRes, image, {quoted: mek, caption: 'dah jadi nih bang.'})
                            }
                            break
                case 'imgtourl':
                    if ((isMedia && !mek.videoMessage || isQuotedImage) && args.length == 0) {
                        reply('*Bentar...*')
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadMediaMessage(encmedia, 'buffer')
                        const getUrl = await uploadImages(media, false)
                        sendMess(from, `${getUrl}`)
                    }
                    break
                case 'wait':
                    case 'whatanime':
                        if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
                            const media = await client.downloadMediaMessage(encmedia, 'buffer')
                            const img64 = `data:image/jpeg;base64,${media.toString('base64')}`
                            fetch('https://trace.moe/api/search', {
                                method: 'POST',
                                body: JSON.stringify({ image: img64 }),
                                headers: { "Content-Type": "application/json" }
                            })
                            .then(respon => respon.json())
                            .then(async (resolt) => {
                                if (resolt.docs && resolt.docs.length <= 0) {
                                    reply('Gak tau anime apaan!')
                                }
                                const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                                var teksnime = ''
                                if (similarity < 0.92) {
                                    teksnime += '*Saya memiliki keyakinan rendah dengan request ini*\n\n'
                                }
                                teksnime += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                                teksnime += `➸ *Ecchi* : ${is_adult}\n`
                                teksnime += `➸ *Eps* : ${episode.toString()}\n`
                                teksnime += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                                var imek = `https://media.trace.moe/image/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                                var buffer = await getBuffer(imek)
                                
                                client.sendMessage(from, buffer, image, { quoted: mek, caption: teksnime })
                            })
                            .catch(err => console.log('[',color('!', 'red'),']', color(err, 'red')))
                        }
                        break
                case 'tga':
                case 'tagall':
                    members_id = []
                    teks = args.join(" ")
                    teks += "\n\n"
                    for (let mem of groupMembers) {
                        teks += `# @${mem.jid.split("@")[0]}\n`
                        members_id.push(mem.jid)
                    }
                    mentions(teks, members_id)
                    break
                case 'tga2':
                case 'tagall2':
                    members_id = []
                    teks = "*Tagall v2*"
                    teks += "\n\n"
                    for (let mem of groupMembers) {
                        teks += `~> @${mem.jid.split("@")[0]}\n`
                        members_id.push(mem.jid)
                    }
                    client.sendMessage(from, teks, text, {quoted:mek, contextInfo: { "mentionedJid": members_id}})
                    break
                case 'tga3':
                case 'tagall3':
                    members_id = []
                    teks = "*Tagall v3*"
                    teks += "\n\n"
                    for (let mem of groupMembers) {
                        teks += `<#> https://wa.me/${mem.jid.split("@")[0]}\n`
                        members_id.push(mem.jid)
                    }
                    client.sendMessage(from, teks, text, {contextInfo: {"mentionedJid": members_id }})
                    break
                case 'setnick':
                    entah = args.join(" ")
                    client.updateProfileName(entah).then(() => {
                        reply(`Sukses mengubah ke ${entah}`)
                    }).catch((err) => { reply(`Error: ${err}`) })
                    break
                case 'setpict':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadMediaMessage(encmedia, 'buffer')
                        client.updateProfilePicture(botNumber, media).then(() => {
                            reply('Sukses update profile picture')
                        }).catch((err) => {
                            reply(`Error: ${err}`)
                        })
                    } else {
                        reply('bukan gambar')
                    }
                    break
                case 'del':
                    case 'delete':
                        if (args[0] === 'priv' || args[0] === 'private') {
                            memew = client.chats.array.filter(v => v.jid.endsWith("@s.whatsapp.net") || v.jid.endsWith("@c.us")).map(v => v.jid)
                            for (let ids of memew) client.modifyChat(ids, 'delete')
                            reply(`Sukses menghapus *${memew.length}* personal chat`)
                        } else {
                            reply("*Masukan type chat yang ingin dibersihkan*\n1. private -> Personal Chat")
                        }
                        break
                         case 'd':
                                        client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
                                        break
                case 'hilih':
                    entah = args.join(" ")
                    imni = hilih(entah)
                    reply(imni)
                    break
                case 'gr':
                    case 'gr':
                        if (!isGroup) return
                        if (args.length == 0) return reply('Masukan parameter _<setting>_ | _<yes/no>_')
                        if (args[0] === 'pesan' && arg.split('|')[1] === 'yes') {
                            client.groupSettingChange(from, GroupSettingChange.messageSend, true)
                            reply('*Berhasil*')
                        } else if ((args[0] === 'egrup' || args[0] === 'egroup') && arg.split('|')[1] === 'yes') {
                            client.groupSettingChange(from, GroupSettingChange.settingsChange, true)
                            reply('*Berhasil*')
                        } else if (args[0] === 'pesan' && arg.split('|')[1] === 'no') {
                            client.groupSettingChange(from, GroupSettingChange.messageSend, false)
                            reply('*Berhasil*')
                        } else if ((args[0] === 'egrup' || args[0] === 'egroup') && arg.split('|')[1] === 'no') {
                            client.groupSettingChange(from, GroupSettingChange.settingsChange, false)
                            reply('*Berhasil*')
                        } else {
                            reply('_*Parameter Setting*_\n1. pesan\n2. egrup')
                        }
                        break
                case 'kontag':
                    entah = args[0]
                    if (isNaN(entah)) return reply('Invalid phone number');
                    members_ids = []
                    for (let mem of groupMembers) {
                        members_ids.push(mem.jid)
                    }
                    vcard = 'BEGIN:VCARD\n'
                              + 'VERSION:3.0\n'
                              + 'FN:Kontag Boss\n'
                              + `TEL;type=CELL;type=VOICE;waid=${entah}:${phoneNum('+' + entah).getNumber('internasional')}\n`
                              + 'END:VCARD'.trim()
                        client.sendMessage(from, {displayName: 'Kontag', vcard: vcard}, contact, {contextInfo: {"mentionedJid": members_ids}})
                        break
                case 'kontak':
                    entah = args[0]
                    disname = args[1]
                    if (isNaN(entah)) return reply('Invalid phone number'.toUpperCase());
                    vcard = 'BEGIN:VCARD\n'
                              + 'VERSION:3.0\n'
                              + `FN:${disname}\n`
                              + `TEL;type=CELL;type=VOICE;waid=${entah}:${phoneNum('+' + entah).getNumber('internasional')}\n`
                              + 'END:VCARD'.trim()
                        client.sendMessage(from, {displayName: disname, vcard: vcard}, contact)
                        break
                case 'tr':
                    case 'translate':
                        if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) {
                            tolang = args[0]
                            entah = body.slice(args[0].length+1)
                            translate(entah, tolang)
                            .then((res) => { reply(`${res}`) })
                        } else {
                            tolang = args[0]
                            entah = mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation
                            translate(entah, tolang)
                            .then((res) => { reply(`${res}`) })
                        }
                        break
                case 'tomp3':
                    if ((isMedia && mek.message.videoMessage.seconds <= 30 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds <= 30)) {
                        const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia, "video")
                        exec(`ffmpeg -y -i ${media} -b:a 192K -ar 44100 -vn -f mp3 tomp3.mp3`, function(err) {
                            fs.unlinkSync(media)
                            if (err) return reply("error om")
                            client.sendMessage(from, fs.readFileSync('./tomp3.mp3'), audio, {mimetype: 'audio/ogg', quoted: mek})
                            fs.unlinkSync('./tomp3.mp3')
                        })
                    }
                    break
             case 'chatlist':
			case 'cekchat':
				client.updatePresence(from, Presence.composing)
				var itsme = `0@s.whatsapp.net`
				var split = `𝘾𝙀𝙆 𝘼𝙇𝙇-𝘾𝙃𝘼𝙏`
				var selepbot =         {
					contextInfo:   {
					participant: itsme,
					quotedMessage: {
					extendedTextMessage: {
					text: split,
				}
				}
				}
				}
				teks = `Total : ${totalchat.length}`
				client.sendMessage(from, teks, MessageType.text, selepbot)
				break
            //group
         case 'group':
case 'grup':
					if (args[0] === 'open') {
					    reply(`*BERHASIL MEMBUKA GROUP*`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'close') {
						reply(`*BERHASIL MENUTUP GROUP`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
				break
case 'grouplink':
case 'link':
				    linkgc = await client.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				    client.sendMessage(from, yeh, text, {quoted: mek})
					break
case 'gcname':
case 'name':
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, 'Succes, Ganti Nama Grup', text, {quoted: mek})
					break
            case 'gcdesc':
            case 'desk':
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, 'Succes, Ganti Deskripsi Grup', text, {quoted: mek})
					break
case 'demote':
case 'dm':
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('TAG ADMIN YANG INGIN DITURUNKAN JABATANNYA !')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `*yah kasihan* :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`𝘆𝗮𝗵𝗵 @${mentioned[0].split('@')[0]}  CIE JADI MEMBER `, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'promote':
				case 'pm':
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag member yang ingin dinaikkan jabatannya !')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝗦𝗲𝗹𝗮𝗺𝗮𝘁:\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`@${mentioned[0].split('@')[0]} 𝗦𝗲𝗹𝗮𝗺𝗮𝘁 *YAA*`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break	
			     	case 'kick':
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('TAG TARGET YANG INGIN DITENDANG !')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += ` siap-siap menendang beban group !  :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`MAAF @${mentioned[0].split('@')[0]} KAMU BEBAN .`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
					case 'add':
					if (args.length < 1) return reply('Mau add siapa senpai !')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan target, mungkin karena di private')
					}
				break 
	case 'ownergrup':
                 case 'ownergroup':
                 case 'ownergc':
               client.updatePresence(from, Presence.composing)
              options = {
          text: `Hai owner group : @${from.split("-")[0]}`,
          contextInfo: { mentionedJid: [from] }
           }
           client.sendMessage(from, options, text, { quoted: mek } )            
                   break
case 'clearall':
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply(ind.clears())
				break
          //media
         case 'mp3':
						if (args.length == 0) return reply(`Usage: ${prefix + command} link yt\nExample: ${prefix + command} https://youtu.be..`)
                    ini_link = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytaudio?apikey=${apikey}&url=${ini_link}`)
                    get_result = get_result.result
                    txt = `Title : ${get_result.title}\n`
                    txt += `Uploader : ${get_result.uploader}\n`
                    txt += `Duration : ${get_result.duration}\n`
                    txt += `View : ${get_result.view}\n`
                    txt += `Like : ${get_result.like}\n`
                    txt += `Dislike : ${get_result.dislike}\n`
                    txt += `Description :\n ${get_result.description}`
                    buffer = await getBuffer(get_result.thumbnail)
                    client.sendMessage(from, buffer, image, { quoted: mek, caption: txt })
                    get_audio = await getBuffer(get_result.link[3].link)
                    client.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.title}.mp3`, quoted: mek })
                    break
                case 'mp4':
						if (args.length < 1) return reply('link youtube nya mana senpai ?')
                    ini_link = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytvideo?apikey=${apikey}&url=${ini_link}`)
                    get_result = get_result.result
                    txt = `Title : ${get_result.title}\n`
                    txt += `Uploader : ${get_result.uploader}\n`
                    txt += `Duration : ${get_result.duration}\n`
                    txt += `View : ${get_result.view}\n`
                    txt += `Like : ${get_result.like}\n`
                    txt += `Dislike : ${get_result.dislike}\n`
                    txt += `Description :\n ${get_result.description}`
                    buffer = await getBuffer(get_result.thumbnail)
                    client.sendMessage(from, buffer, image, { quoted: mek, caption: txt })
                    get_audio = await getBuffer(get_result.link[0].link)
                    client.sendMessage(from, get_audio, video, { mimetype: 'video/mp4', filename: `${get_result.title}.mp4`, quoted: mek })
                    break
           case 'joox':
						if (args.length < 1) return reply('teks ?')
                    query = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jooxplay?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    get_info = get_result.info
                    txt = `Singer : ${get_info.singer}\n`
                    txt += `Song : ${get_info.song}\n`
                    txt += `Album : ${get_info.album}\n`
                    txt += `Date : ${get_info.date}\n`
                    txt += `Duration : ${get_info.duration}\n`
                    buffer = await getBuffer(get_result.image)
                    client.sendMessage(from, buffer, image, { quoted: mek, caption: txt })
                    get_audio = await getBuffer(get_result.audio[1].link)
                    client.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_info.title}.mp3`, quoted: mek })
                    break
           case 'play':
						if (args.length < 1) return reply('teks ?')
                    query = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytplay?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    get_info = get_result.info
                    txt = `Title : ${get_info.title}\n`
                    txt += `Uploader : ${get_info.uploader}\n`
                    txt += `Duration : ${get_info.duration}\n`
                    txt += `View : ${get_info.view}\n`
                    txt += `Like : ${get_info.like}\n`
                    txt += `Dislike : ${get_info.dislike}\n`
                    txt += `Description :\n ${get_info.description}\n`
                    buffer = await getBuffer(get_info.thumbnail)
                    client.sendMessage(from, buffer, image, { quoted: mek, caption: txt })
                    get_audio = await getBuffer(get_result.audio[3].link)
                    client.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_info.title}.mp3`, quoted: mek })
                    break
            case 'fordward1':
	   client.sendMessage(from, `${body.slice(10)}`, MessageType.text, {contextInfo: { forwardingScore: 508, isForwarded: true }})
           break
            case 'fordward':
           client.sendMessage(from, `${body.slice(11)}`, MessageType.text, {contextInfo: { forwardingScore: 2, isForwarded: true }})
           break
case 'toptt':
     if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal mengkonversi audio ke ptt')
						topt = fs.readFileSync(ran)
						client.sendMessage(from, topt, audio, {mimetype: 'audio/mp4', quoted: mek, ptt:true})
						})
						break
		case 'igstalk':
					hmm = await fetchJson(`https://api.zeks.xyz/api/igstalk?username=${body.slice(9)}&apikey=apivinz`)
					buffer = await getBuffer(hmm.profile_pic)
					hasil = `Fullname : ${hmm.fullname}\nPengikut : ${hmm.follower}\nMengikuti : ${hmm.following}\nPrivate : ${hmm.is_private}\nVerified : ${hmm.is_verified}\nbio : ${hmm.bio}`
					client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
					break
case 'ig':
                if (args.length < 1) return reply('url ?')
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/instagram?apikey=${apikey}&url=${ini_url}`)
                    ini_url = ini_url.result
                    ini_type = image
                    if (ini_url.includes(".mp4")) ini_type = video
                    buffer = await getBuffer(ini_url)
                    client.sendMessage(from, buffer, ini_type, { quoted: mek })
                    break
                case 'fb':
                if (args.length < 1) return reply('url nya ?')
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/facebook?apikey=${apikey}&url=${ini_url}`)
                    ini_url = ini_url.result[0].link
                    buffer = await getBuffer(ini_url)
                    client.sendMessage(from, buffer, video, { quoted: mek })
                    break
           case 'tiktoknowm':
           case 'tnowm':
                    ini_link = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/tiktok?apikey=${apikey}&url=${ini_link}`)
                    get_result = get_result.result
                    get_audio = await getBuffer(get_result.link)
                    client.sendMessage(from, get_audio, video, { mimetype: 'video/mp4', filename: `${get_result.title}.mp4`, quoted: mek })
                    break
           case 'tiktokwm':
           case 'twm':
                    query = args[0]
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/tiktokwm?apikey=${apikey}&url=${query}`)
                    client.sendMessage(from, buffer, video, { quoted: mek })
                    break  
          case 'tiktokmusic':
          case 'tmusic':
                    query = args[0]
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/tiktokmusic?apikey=${apikey}&url=${query}`)
                    client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek })
                    break    
         case 'googlesearch':
         case 'gsearch':
         if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} cara hack wifi :v`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/gsearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    txt = ""
                    for (var x in get_result) {
                        txt += `Title : ${get_result[x].title}\n`
                        txt += `Link : ${get_result[x].link}\n`
                        txt += `Description : ${get_result[x].desc}\n\n➖➖➖➖➖➖➖➖➖\n\n`
                    }
                    reply(txt)
                    break
                case 'asupan':
                var itsme = `${numbernya}@s.whatsapp.net`
				var split = `𝐀𝐒𝐔𝐏𝐀𝐍`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/asupan?apikey=${apikey}`)
                    buffer = await getBuffer(get_result.result)
                    client.sendMessage(from, buffer, video, { quoted: mek, mimetype: Mimetype.mp4, filename: "asupan.mp4" })
                    break
           case 'pinterest':
if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} loli kawai`)
var itsme = `${numbernya}@s.whatsapp.net`
				var split = `𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
                    query = args.join(" ")
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/pinterest?apikey=${apikey}&query=${query}`)
                    ini_url = ini_url.result
                    buffer = await getBuffer(ini_url)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
                case 'pixiv':
if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} loli kawai`)
var itsme = `${numbernya}@s.whatsapp.net`
				var split = `𝐏𝐈𝐗𝐈𝐕`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
                    query = args[0]
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/pixiv?apikey=${apikey}&query=${query}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'fitnah':
                 if (args.length < 1) return reply(`Usage :\n${prefix}fitnah [@tag|pesan|balasanbot]]\n\nEx : \n${prefix}fitnah @tagmember teks|teks`)
				var gh = body.slice(8)
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("|")[0];
					var target = gh.split("|")[1];
					var bot = gh.split("|")[2];
					client.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}})
					break
case 'bitly':
if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} https://...`)
               client.updatePresence(from, Presence.composing) 
                data = await fetchJson(`https://tobz-api.herokuapp.com/api/bitly?url=${args[0]}&apikey=BotWeA`)
                hasil = `link : ${args[0]}\n\nOutput : ${data.result}`
                reply(hasil)
                break
case 'shortlink':
if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} https://...`)
				query = args.join(" ")
				client.updatePresence(from, Presence.composing) 
				data = await fetchJson(`http://lolhuman.herokuapp.com/api/shortlink2?url=${query}&apikey=${apikey}`)
				hasil = `link : ${query}\n\nOutput : ${data.result}`
				reply(hasil)
				break
 case 'ssweb':
 if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} https://...`)
				query = args.join(" ")
                    buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/ssweb?apikey=${apikey}&url=${query}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
case 'sswebfull':
				query = args.join(" ")
                    buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/sswebfull?apikey=${apikey}&url=${query}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
	case 'spamcall':
	if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} 08303030303030`)
	var itsme = `${numbernya}@s.whatsapp.net`
				var split = `𝐒𝐏𝐀𝐌𝐂𝐀𝐋𝐋`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
			call = `${body.slice(11)}`
			anu = await fetchJson(`https://videfikri.com/api/call/?nohp=${call}`, {method: 'get'})
			client.sendMessage(from, `${anu.result.logs}`, text, {quoted: mek })
			break  
case 'spamsms':
                    if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} 08303030303030`)
                    var itsme = `${numbernya}@s.whatsapp.net`
				var split = `𝐒𝐏𝐀𝐌𝐒𝐌𝐒`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
                    nomor = args[0]
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam1?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam2?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam3?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam4?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam5?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam6?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam7?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam8?apikey=${apikey}&nomor=${nomor}`)
                    reply("Success")
                    break
        //audio sett
          case 'nightcore':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:false, quoted: mek,duration:99999999999999999999999})
						fs.unlinkSync(ran)
					   })
				       break 
				case 'slow':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JStw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./media/images/me.jpg')} }} })
						fs.unlinkSync(ran)
					    })
				        break
				case 'tupai':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot _", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JStw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./media/images/me.jpg')} }} })
						fs.unlinkSync(ran)
					    })
				       break
				case 'blub':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.9,asetrate=95100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JStw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./media/images/me.jpg')} }} })
						fs.unlinkSync(ran)
					    })
				        break
				case 'gemuk':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JStw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./media/images/me.jpg')} }} })
						fs.unlinkSync(ran)
					    })
				        break
				case 'ghost':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=3486" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JStw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./media/images/me.jpg')} }} })
						fs.unlinkSync(ran)
					    })
				       break
		       case 'bass':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=64:width_type=o:width=2:g=56 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true,  quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./media/images/me.jpg')} } } })
						fs.unlinkSync(ran)
					   })
				       break
             //textmaker
         case 'ttp2':
						if (args.length < 1) return reply('teks ?')
						var itsme = `${numbernya}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
                    txt = args.join(" ")
                    buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/ttp?apikey=${apikey}&text=${txt}`)
                    client.sendMessage(from, buffer, sticker, { quoted: mek })
                    break
              case 'ttp':
						if (args.length < 1) return reply('teks ?')
						var itsme = `${numbernya}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
                    txt = args.join(" ")
                    buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/ttp2?apikey=${apikey}&text=${txt}`)
                    client.sendMessage(from, buffer, sticker, { quoted: mek })
                    break
              case 'tahta':
						if (args.length < 1) return reply(' teks ?')
						var itsme = `${numbernya}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
                    txt = args.join(" ")
                    buffer = await getBuffer(`https://api.zeks.xyz/api/hartatahta?text=${txt}&apikey=apivinz`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
               case 'nulis':
						if (args.length < 1) return reply('teks ?')
						var itsme = `${numbernya}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
						txt = args.join(" ")
                    buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/nulis?apikey=${apikey}&text=${txt}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
case 'memegen':
						if (args.length < 1) return reply('teks ?')
                    txt = args.join(" ")
                    kk1 = txt.split("|")[0];
               	 kk2 = txt.split("|")[1];
                    buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/memegen?apikey=${apikey}&texttop=${kk1}&textbottom=${kk2}&img=https://static.wikia.nocookie.net/dogelore/images/9/97/Doge.jpg/revision/latest/top-crop/width/360/height/450?cb=20190205113053`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'meme1':
                    txt = args.join(" ")
                    kk1 = txt.split("|")[0];
               	 kk2 = txt.split("|")[1];
                    kk3 = txt.split("|")[2];
                    buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/memegen?apikey=${apikey}&texttop=${kk1}&textbottom=${kk2}&img=${kk3}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
	case 'amongus':
	var itsme = `${numbernya}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
                    txt = args.join(" ")
                    buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/amongus?apikey=azka25&text=${txt}`)
                    client.sendMessage(from, buffer, sticker, { quoted: mek })
                    break 
              //random
           case 'loli':
           var itsme = `${numbernya}@s.whatsapp.net`
				var split = `𝐋𝐎𝐋𝐈`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=loli`, {method: 'get'})
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
	case 'waifu':
	var itsme = `${numbernya}@s.whatsapp.net`
				var split = `𝐖𝐀𝐈𝐅𝐔`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				client.sendMessage(from, mess.wait, MessageType.text, selepbot)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=waifu`, {method: 'get'})
					var n = JSON.parse(JSON.stringify(anu));
					var nmek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nmek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
		//nsfw menu
		case 'nsfw':
                                        client.sendMessage(from, nsfw(), text)
                                        break
		             case 'nhcode':
				if (args.length < 1) return reply('kode nuklir nya mana senpai ?')
                    henid = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentai/${henid}?apikey=${apikey}`)
                    get_result = get_result.result
                    txt = `Title Romaji : ${get_result.title_romaji}\n`
                    txt += `Title Native : ${get_result.title_native}\n`
                    txt += `Read Online : ${get_result.read}\n`
                    get_info = get_result.info
                    txt += `Parodies : ${get_info.parodies}\n`
                    txt += `Character : ${get_info.characters}\n`
                    txt += `Tags : ${get_info.tags}\n`
                    txt += `Artist : ${get_info.artists}\n`
                    txt += `Group : ${get_info.groups}\n`
                    txt += `Languager : ${get_info.languages}\n`
                    txt += `Categories : ${get_info.categories}\n`
                    txt += `Pages : ${get_info.pages}\n`
                    txt += `Uploaded : ${get_info.uploaded}\n`
                    reply(txt)
                    break
           case 'nhentaipdf':
				if (args.length < 1) return reply('kode nuklir nya mana senpai ?')
                    henid = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentaipdf/${henid}?apikey=${apikey}`)
                    get_result = get_result.result
                    buffer = await getBuffer(get_result)
                    client.sendMessage(from, buffer, document, { quoted: mek, mimetype: Mimetype.pdf, filename: `${henid}  by Azkabot.pdf` })
                    break
         case 'nhentai':
                if (args.length < 1) return reply('kode nuklir nya mana senpai ?')
                    henid = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentaipdf/${henid}?apikey=azka25`)
                    get_result = get_result.result
                    buffer = await getBuffer(get_result)
                    client.sendMessage(from, buffer, document, { quoted: mek, mimetype: Mimetype.pdf, filename: `${henid} by Azkabot.pdf` })
                    break
                case 'nhsearch':
				if (args.length < 1) return reply('kode nuklir nya mana senpai ?')
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentaisearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    txt = ""
                    for (var x in get_result) {
                        txt += `Code : ${get_result[x].id}\n`
                        txt += `Title English : ${get_result[x].title_english}\n`
                        txt += `Title Japanese : ${get_result[x].title_japanese}\n`
                        txt += `Title Native : ${get_result[x].title_native}\n`
                        txt += `Date Upload : ${get_result[x].date_upload}\n`
                        txt += `Page : ${get_result[x].page}\n`
                        txt += `Favourite : ${get_result[x].favourite}\n\n➖➖➖➖➖➖➖➖➖\n\n`
                    }
                    reply(txt)
                    break
               case 'nekopoi':
                    if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} https://nekopoi.care/isekai-harem-monogatari-episode-4-subtitle-indonesia/`)
                    ini_url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nekopoi?apikey=${apikey}&url=${ini_url}`)
                    get_result = get_result.result
                    console.log(get_result)
                    txt = `Title : ${get_result.anime}\n`
                    txt += `Porducers : ${get_result.producers}\n`
                    txt += `Duration : ${get_result.duration}\n`
                    txt += `Size : ${get_result.size}\n`
                    txt += `Sinopsis : ${get_result.sinopsis}\n`
                    link = get_result.link
                    for (var x in link) {
                        txt += `\n${link[x].name}\n`
                        link_dl = link[x].link
                        for (var y in link_dl) {
                            txt += `${y} - ${link_dl[y]}\n`
                        }
                    }
                    buffer = await getBuffer(get_result.thumb)
                    client.sendMessage(from, buffer, image, { quoted: mek, caption: txt })
                    break
               case 'nekosearch':
				    query = args.join(" ")
                    get_result = await fetchJson(`https://lolhuman.herokuapp.com/api/nekopoisearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    txt = ""
                    txt  += `    NEKOPOI SEARCH \n\n`
                    for (var x in get_result) {
                        txt += `JUDUL : ${get_result[x].title}\n`
                        txt += `LINK : ${get_result[x].link}\n\n➖➖➖➖➖➖➖➖➖\n\n`
                        }
                         thumbnail = await getBuffer(get_result[1].thumbnail)
                    client.sendMessage(from, thumbnail, image, { quoted: mek, caption: txt })
                    break 
              case 'doudesu':
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/doujindesu?apikey=${apikey}&url=${query}`)
                    get_result = get_result.result
                    txt  = `Judul : ${get_result.title}\n`
                    txt += `Link Download PDF : ${get_result.link_dl}\n`
                    reply(txt)
                    break
                case 'xnxxsearch':
				if (args.length < 1) return reply('teks nya mana senpai ?')
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/xnxxsearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    txt = ""
                    for (var x in get_result) {
                        txt += `Title : ${get_result[x].title}\n`
                        txt += `Views : ${get_result[x].views}\n`
                        txt += `Duration : ${get_result[x].duration}\n`
                        txt += `Uploader : ${get_result[x].uploader}\n`
                        txt += `Link : ${get_result[x].link}\n`
                        txt += `Thumbnail : ${get_result[x].thumbnail}\n\n`
                    }
                    reply(txt)
                    break
                case 'xnxx':
                   if (args.length < 1) return reply('teks nya mana senpai ?')
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/xnxx?apikey=${apikey}&url=${query}`)
                    get_result = get_result.result
                    txt  = `Title : ${get_result.title}\n`
                    txt += `Duration : ${get_result.duration}\n`
                    txt += `View : ${get_result.title}\n`
                    txt += `Rating : ${get_result.rating}\n`
                    txt += `Like : ${get_result.like}\n`
                    txt += `Dislike : ${get_result.dislike}\n`
                    txt += `Comment : ${get_result.comment}\n`
                    txt += `Tag : ${get_result.tag.join(", ")}\n`
                    txt += `Description : ${get_result.description}\n`
                    txt += "Link : \n"
                    link = get_result.link
                    for (var x in link) {
                        txt += `${link[x].type} - ${link[x].link}\n\n`
                    }
                    thumbnail = await getBuffer(get_result.thumbnail)
                    client.sendMessage(from, thumbnail, image, { quoted: mek, caption: txt })
                    break
                 case 'Pornhubsearch':
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/pornhubsearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    txt = ""
                    for (var x in get_result) {
                        txt += `Title : ${get_result[x].title}\n`
                        txt += `Rating : ${get_result[x].rating}\n`
                        txt += `Views : ${get_result[x].views}\n`
                        txt += `Duration : ${get_result[x].duration}\n`
                        txt += `Uploader : ${get_result[x].uploader}\n`
                        txt += `Added : ${get_result[x].added}\n`
                        txt += `Link : ${get_result[x].link}\n`
                        txt += `Thumbnail : ${get_result[x].thumbnail}\n\n`
                    }
                    reply(txt)
                    break
           case 'pornhub':
                    if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} Japanese`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/pornhub?apikey=${apikey}&url=${query}`)
                    get_result = get_result.result
                    txt  = `Title : ${get_result.title}\n`
                    txt += `Duration : ${get_result.duration}\n`
                    txt += `View : ${get_result.views}\n`
                    txt += `Geo : ${get_result.geo}\n`
                    txt += `Like : ${get_result.like}\n`
                    txt += `Dislike : ${get_result.dislike}\n`
                    txt += `Upload : ${get_result.uploader}\n`
                    txt += `Media : ${get_result.media}\n`
                    thumbnail = await getBuffer(get_result.thumb)
                    client.sendMessage(from, thumbnail, image, { quoted: mek, caption: txt })
                    break
                case 'feet':
                case 'yuri':
                case 'trap':
                case 'lewd':
                case 'eron':
                case 'solo':
                case 'gasm':
                case 'anal':
                case 'tits':
                case 'ero':
                case 'cum':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random2/${command}?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
                     case 'futanari': 
				    try {
						res = await fetchJson(`https://nekos.life/api/v2/img/futanari`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'RANDOM FUTANARI '})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('𝗘𝗥𝗥𝗢𝗥')
					}
					break
  case 'trap2': 
				    try {
						res = await fetchJson(`https://nekos.life/api/v2/img/trap`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hmm... bau-bau Gheyyy ! '})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('𝗘𝗥𝗥𝗢𝗥')
					}
					break
					  case 'solog': 
				    try {
						res = await fetchJson(`https://nekos.life/api/v2/img/solog`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'RANDOM solog'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('𝗘𝗥𝗥𝗢𝗥')
					}
					break
					  case 'randomhentai':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/hentai?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwloli':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/loli?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwneko':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/neko?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwwaifu':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/waifu?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwtrap':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/trap?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwyaoi':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/yaoi?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwblowjob':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/blowjob?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwhentai':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/hentai?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwneko2':
				    try{
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'RANDOM NSFW NEKO'})
                                                await limitAdd(sender)
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('âŒ *ERROR* âŒ')
					}
					break
		case 'nsfwpanties':
                    buffer = await getBuffer(`https://api.xteam.xyz/randomimage/panties?APIKEY=f0253c3792f12d4d`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
 case 'nsfwuniform':
                    buffer = await getBuffer(`https://api.xteam.xyz/randomimage/uniform?APIKEY=f0253c3792f12d4d`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
 case 'nsfwtentacles':
                    buffer = await getBuffer(`https://api.xteam.xyz/randomimage/tentacles?APIKEY=f0253c3792f12d4d`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'ahegao':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/ahegao?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'femdom':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/hentaifemdom?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'lewd':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/lewdanimegirls?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'hololewd':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/hololewd?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
              case 'sideoppai':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/sideoppai?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwbooty':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/animebooty?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwthight':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/animethighss?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwarmpits':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/animearmpits?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
             case 'nsfwfeets':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/animefeets?apikey=${apikey}`)
                    client.sendMessage(from, buffer, image, { quoted: mek })
                    break
            default:
                if ((mek.key.fromMe && budy != undefined) && budy === 'cek') {
                    var options = {
                        contextInfo: {
                            participant: `0@s.whatsapp.net`,
                            remoteJid: "status@broadcast",
                            quotedMessage: {
                                productMessage: {
                                    product: {
                                        currencyCode: "USD",
                                        description: fake,
                                        title: fake,
                                        priceAmount1000: "999999999",
                                        productImageCount: 1,
                                        productImage: {
                                            mimetype: "image/png",
                                            jpegThumbnail: gambar64
                                        }
                                    },
                                    businessOwnerJid: "0@s.whatsapp.net"
                                }
                            }
                        }
                    }
                    client.sendMessage(from, `Prefix : ${prefix}\nReply : ${fake}\nNumber : ${numbernya}\nPing : *${processTime(mek.messageTimestamp, moment())} _seconds_*`, text, options)
                } else if ((mek.key.fromMe && budy != undefined) && budy === 'yamete' || budy === 'ah') {
                    ran = getRandom('.webp')
                    ffmpeg('./media/images/ahegao.jpeg')
                    .input('./media/images/ahegao.jpeg')
                    .on('start', function (cmd) {
                        console.log(`Started: ${cmd}`)
                    })
                    .on('end', function() {
                        console.log('Finish')
                        client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
                        fs.unlinkSync(ran)
                    })
                    .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                    .toFormat('webp')
                    .save(ran)
                }
                }
            }
        } catch(err) {
            console.log('[',color('!', 'red'),']', color(err, 'red'))
        }
    })
}

starts()
