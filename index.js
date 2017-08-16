const { cmds, handlers } = require("effects-as-data-universal");
const { call } = require("effects-as-data");

function* getPeople() {
  const [a, b] = yield [cmds.randomNumber(), cmds.randomNumber()];
  const randomIdA = Math.floor(a * 50);
  const randomIdB = Math.floor(b * 50);
  const people = yield [
    cmds.call(getPerson, randomIdA),
    cmds.call(getPerson, randomIdB)
  ];
  return people;
}

function* getPerson(id) {
  return yield cmds.httpGet(`https://swapi.co/api/people/${id}`);
}

const config = {
  onCall: console.log,
  onCallComplete: console.log,
  onCommand: console.log,
  onCommandComplete: console.log
};

call(config, handlers, getPeople).then(console.log).catch(console.error);
