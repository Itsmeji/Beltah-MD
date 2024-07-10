const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkdJRExNL3Jaa2xERWxnR3drbllMN05rQ05MVzFvc3dSeDNBZDBRSk0zQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1QvcW02TTk3RkM4ekw3eDBRK3g1MWtpLzNUR3NMR3NkcG9kS0F6cXpERT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSFMrR3hPREZnU3FFc0JienBTVjdJTGhpYy9tUy90QUJsL0cvaE11RFZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFWXBESG45dXJ4VUtwNWtBM0prQjRrSXdhZ2pVZTF6ZFlMQTJlYktNRzFZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVDeG5wV3Uwam1Xd0RzbldxNit6S3FvNGVaN2UrMnlCVjZLdWZTbG9JblU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii8vR3U5T2s5UkJNdzU5OWRZOXBDUmtzTVlsWXNQc0tmMVBGR3ZkRzNVSGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMktYT0tYNFVZODYvaE5ZRFQ0eCt4SSttL0VLWk1UaTM1T2Y1Ym9YZm1IVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibG9GQjIxcDFaeDdycGxnQk9lSHhJVzhyTzFVN3JZTzFZMzJnTlUva3JuYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxMSSthdCtNbFhoZ2YrelN0aUVpWGhZKytrcnlxdkFnUUxmZUZORFZZMGRLTEc5KzhkOUFwYVQ5VkVMWHkyV1FiOXVMRURrbjREOSt2SU0rcXpOM0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkxLCJhZHZTZWNyZXRLZXkiOiJWTmpZZ3BjM2NmYlI0RWtMa050TEZvekNiQWJCQ0IwS21ZMzVjVjNmcW04PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNQjg4MVhDQVFRQzdnR3loZ3hwRXZ3IiwicGhvbmVJZCI6IjY3MDVmNTA1LTJkZmEtNGE2Mi04NzVkLWYxMWRmZmMzYTI1NSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZVNQRkc2c1lEWDBBUUNZeFdWS1M1ME5haXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWTV4VVkrYm9GNWtKVEZkWCtiK3ZqdjZXSnA0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IldKUlBYNTRUIiwibWUiOnsiaWQiOiIyMjg5OTg2OTYwMTo1NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHJjdUp3REVKeWZ2TFFHR0E0Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia1hBWTVpWHJjeDN4MjI1NWgreVB3eEgwL2paZXBmQjUycSttcG15ZlBDZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiV0xjaGhpS3dib1hyVjBWelp0eWxMWHRZYmxwcUdjbUdrcjEwc0RWaWV1dFREWGM3VS9HekEvdzNCODI0Z0FHQ2JDWjFMeEVmcVdMeVBwODhDcHM3QUE9PSIsImRldmljZVNpZ25hdHVyZSI6IkozKzB2VE8yQ1BlTVR1MTNjcThhc0t4SUNudU1sb1RWWGJ6bnI2UzRVbVJSNGU0UHFVRUdxSGRZNDNsdUx6TXJoNXpsUGZVQ3ZReU9yOGFhRVlYUEFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI4OTk4Njk2MDE6NTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWkZ3R09ZbDYzTWQ4ZHR1ZVlmc2o4TVI5UDQyWHFYd2VkcXZwcVpzbnp3byJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDY1MTY4OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCa1QifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Israfel Kurosaki",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "22896870256",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'oui',
    BOT : process.env.BOT_NAME || 'SCP foundation Bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/f44ffa62b6f875dfed72f.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '2',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
