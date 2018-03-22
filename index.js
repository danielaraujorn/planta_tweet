var app = require("express")();
var http = require("http").Server(app);
var Twitter = require("twitter");
var client = new Twitter({
  consumer_key: "JiZnINKVsiyiu2DttCgRnVChV",
  consumer_secret: "Kqsnvt3p2Qsxfnj5dFOsjIAJhMbBUc7ZiB4kbcC91lmQ4Qgq9A",
  access_token_key: "976809861487964162-S9IP4Ni5ZZqJ6NTh8GVVKcx7OQmX6s0",
  access_token_secret: "zvwmtHTmzWJSrvGpqYwIHZyOCu7EjoKih7SQTDNdLz6kO"
});
var stream = client.stream("statuses/filter", { track: "@bloomsuculenta" });

stream.on("data", function(element) {
  console.log(element && element.text);
  client.post(
    "statuses/update",
    {
      status: "fala ai @" + element.user.screen_name,
      in_reply_to_status_id: element.id_str
    },
    function(error, tweet, response) {
      if (!error) {
      } else console.log(error);
    }
  );
});

const nomes = ["ricardo", "imautentic_", "d4mmit"];

const sort = array => {
  return array[Math.floor(Math.random() * array.length)];
};
const confiante = [
  `mamãe passou adubo em mim`,
  `gordinha não! suculenta ( ͡° ͜ʖ ͡°)`,
  `projeto fitness #AduboOrganico`,
  `#JogandoPlantsVsZombie`,
  `cada dia mais suculenta!`
];
const raiva = [
  `Ninguém merece acordar com esse sol na cara`,
  `Vegano fdp, você tá protegendo a galera errada!`
];
const carente = [
  `alguém gostaria de adotar uma plantinha sem dono? @${sort(
    nomes
  )} se liga que tem quem queira`,
  `alguma plantinha por ai querendo trocar fluidos? #seliga`,
  `@${sort(nomes)}, você é minha sopinha de abóbora!`
];

const luz = [
  `preciso de luz na minha vida... @${sort(nomes)} abre a janela por favor!`
];
const sede = [
  `@${sort(
    nomes
  )}, você achou que eu não teria mais sede? achou errado otário!`,
  `tudo que eu queria era alguem pra me dar água =(`,
  `eu preciso de água @${sort(nomes)}, seu merda`,
  `cadê minha água? @${sort(nomes)} seu arrombado! #otario`,
  `Me sirva, @${sort(nomes)} otário!`,
  `Libera o fluxo de água aí, Simone! @${sort(nomes)}`
];
const frase = {
  sede: () => sort(sede),
  luz: () => sort(luz),
  confiante: () => sort(confiante),
  raiva: () => sort(raiva),
  carente: () => sort(carente)
};

// client.get("search/tweets", { q: "@bloomsuculenta" }, function(
//   error,
//   tweets,
//   response
// ) {
//   tweets.statuses.forEach(element => {
//     console.log(element);
//     client.post(
//       "statuses/update",
//       {
//         status: "fala ai @" + element.user.screen_name,
//         in_reply_to_status_id: element.id_str
//       },
//       function(error, tweet, response) {
//         if (!error) {
//           console.log(tweet);
//         } else console.log(error);
//       }
//     );
//   });
// });
app.get("/", function(req, res) {
  res.send("fala ai seu arrombado");
});
app.post("/publicar/:humor", function(req, res) {
  let myfrase = frase[req.params.humor]();
  console.log(myfrase);
  //   client.post(
  //     "statuses/update",
  //     { status: myfrase },
  //     function(error, tweet, response) {
  //       if (error) throw error;
  //       console.log(tweet); // Tweet body.
  //     }
  //   );
  res.send(myfrase);
});
const port = Number(process.env.PORT || 3000);
http.listen(port, function() {
  console.log("Example app listening on port " + port);
});
