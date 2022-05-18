//@ts-check

const { EmbedBuilder, Util } = require("discord.js");
const prefix = "p!";
const { readFileSync, writeFileSync, appendFile, existsSync } = require("fs");
const moment = require("moment");
const cooldown = new Set();

module.exports = async(client, message) => {
  if(!message.guild || message.author.bot) return;
  const file = JSON.parse(readFileSync("./Bdd/Levels/users.json").toString());
  const ticketFile = JSON.parse(readFileSync("./Bdd/Tickets/tickets.json").toString());
  
  //#region clientMention
  if(new RegExp(`^<@!?${client.user.id}>$`).test(message.content)) {
    const embed = new EmbedBuilder()
    .setColor(Util.resolveColor("Random"))
    .setDescription("Exécutez la commande `/help` pour obtenir la liste de mes commandes !")
    .setTimestamp()

    return message.channel.send({ embeds: [embed] }).then(m => setTimeout(function() { if(m.deletable) m.delete(); }, 5000));
  };
  //#endregion clientMention

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmdName = args.shift().toLowerCase();
  const cmd = client.commands.get(cmdName);

  if(cmd) {
    const abc = new cmd(client);
    if(abc.slash) return;
    if(abc?.owner && message.author.id !== "636658002010832927") return;
    
    try { abc?.run?.(message, args); }
    catch(e) { message.channel.send(e); };
  };

  //#region bump
  let k = 0;
  if(message.author.id === "302050872383242240" && message.embeds[0]?.description === "Bump effectué !") {
    k += 1;
    return message.channel.send(`${k}`);
  };
  //#endregion bump

  //#region xp
  const schemaXp = { xp: 0 };
  const badChannelsId = ["906201583983939674"];

  if(badChannelsId.includes(message.channel.id)) return;
  if(!file[message.author.id]) file[message.author.id] = schemaXp;
  if(!file[message.author.id].level) file[message.author.id].level = 0;

  if(!cooldown.has(message.author.id) && !ticketFile[message.channelId]) {
    file[message.author.id].xp += Math.floor(Math.random() * 29 + 1);
    writeFileSync("./Bdd/Levels/users.json", JSON.stringify(file, null, 4));

    cooldown.add(message.author.id);

    setTimeout(function() {
      cooldown.delete(message.author.id);
    }, 6e4) 
  }; 

  //#region level
  const fileInfos = JSON.parse(readFileSync("./Bdd/infos.json").toString());
  const xp = file[message.author.id].xp;
  const lvl = file[message.author.id].level;

  const roles = {
    "niveau 5": "930934956702724147",
    "niveau 10": "930934510332285019",
    "niveau 20": "930934635465146448",
    "niveau 30": "930934671548772403",
    "niveau 40": "930934719556759552",
    "niveau 50+": "976148432068706406"
  };

  function level(lvlf) { 
    file[message.author.id].level += 1;

    switch(lvlf) {
      case 5: roleAdd(roles["niveau 5"]); break;
      case 10: roleAdd(roles["niveau 10"]); break;
      case 20: roleAdd(roles["niveau 20"]); break;
      case 30: roleAdd(roles["niveau 30"]); break;
      case 40: roleAdd(roles["niveau 40"]); break;
      case 50: roleAdd(roles["niveau 50"]); break;
      default: return message.channel.send(`Félicitations ${message.author}, vous venez de passer **niveau ${lvlf}** !`); break;
    };
  };

  function roleAdd(levelf) {
    const vk = Object.entries(roles).find(([k, v]) => v === levelf)?.[0];
    return message.member.roles.add(levelf)
    .then(() => message.channel.send(`Félicitation ${message.author}, vous venez de passer **${vk}** et obtenez le rôle : **${vk[0].toUpperCase() + vk.slice(1)}**`))
    .catch(e => message.channel.send(`Une erreur c'est produite : ${e}`))
  };

  for(let i = 0; i < Object.keys(fileInfos.systemLevels.xp).length; i++) if(xp >= fileInfos.systemLevels.xp[i] && lvl < i) level(i); 

  writeFileSync("./Bdd/Levels/users.json", JSON.stringify(file, null, 4));

  //#endregion level
  //#endregion xp

  //#region ticketLogs
  if(ticketFile[message.channel.id] && existsSync("./Bdd/Tickets/TicketsLogs/" + `${ticketFile[message.channel.id].reason}.md`)) {
    const pathLogs = "./Bdd/Tickets/TicketsLogs/" + `${ticketFile[message.channel.id].reason}.md`;

    appendFile(pathLogs, `\n${moment(Date.now()).format("DD/MM/YYYY à HH:mm:ss")}, ${message.attachments.first() ? "screen" : ""} ; ${message.author.tag} => ${message.content}`, function(err) {
      if(err) throw err;
    });
  };
  //#endregion ticketLogs

  //#region antiFile
  const fileAttachement = message.attachments.first()?.name;

  if(fileAttachement && !message.member.roles.cache.filter(r => r.id === "867695416837013512")) {
    if(new RegExp(/.(7z|ade|adp|arj|apk|application|appx|appxbundle|asx|bas|bat|cab|cer|chm|cmd|cnt|cpl|crt|csh|deb|der|diagcab|dll|dmg|docm|dotm|ex|ex_|exe|fxp|gadget|grp|hlp|hpj|hta|htc|inf|ins|iso|isp|its|jar|jnlp|jse|ksh|lib|lnk|mad|maf|mag|mam|maq|mar|mas|mat|mau|mav|maw|mcf|mda|mdb|mde|mdt|mdw|mdz|msc|msh|msh1|msh1xml|msh2|msh2xml|mshxml|msi|msix|msixbundle|msp|mst|msu|nsh|ops|osd|pcd|pif|pkg|pl|plg|potm|ppam|ppsm|pptm|prf|prg|printerexport|ps1|ps1xml|ps2|ps2xml|psc1|psc2|psd1|psdm1|pst|py|pyc|pyo|pyw|pyz|pyzw|rar|reg|rpm|scf|scr|sct|shb|shs|sldm|sys|tar.gz|theme|tmp|url|vb|vbe|vbp|vbs|vhd|vhdx|vsmacros|vsw|vxd|webpnp|ws|wsc|wsf|wsh|xbap|xlam|xll|xlsm|xltm|xnk|z|zip)$/i).test(fileAttachement)) message.channel.send("Cette extension est prohibée !");
    return message.deletable ? message.delete().catch(err => console.log(`Erreur lors de la suppresion d'un fichier interdit :` + err)) : console.log("Impossible de supprimer le fichier interdit !");
  };
  //#endregion antiFile
};