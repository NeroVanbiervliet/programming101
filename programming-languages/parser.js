const Queue = require("./Queue");

function parse(tokens) {
    const q = new Queue(tokens);
    return parseProgram(q);
}

// program             : function_definition* expression ';'                ;
function parseProgram(q) {
    const functions = parseFunctionDefinitionList(q);
    const expression =  parseExpression(q);
    parseSemicolon(q); // ignore, but do parse !

    if (q.hasMore()) {
        let next = JSON.stringify(q.peek());
        throw new Error(`Parse error: reached end of program, but still found tokens (next: ${next})`);
    }

    return {
        type: "program",
        functions: functions,
        expression: expression
    };
}

function parseFunctionDefinitionList(q) {
    return []; // todo: implement (now only accept programs without functions.
}

function parseExpression(q) {
    return parseInteger(q); // todo: there exist more kinds of expressions
}

function parseInteger(q) {
    const integer = q.consume();
    if (integer.type !== "integer") {
        throw new Error(`Parse error: expected an integer but got a token of type ${integer.type}.`);
    }
    return {
        type: "integer",
        value: integer.value
    };
}

function parseSemicolon(q) {
    const semicolon = q.consume();
    if (semicolon.type !== "symbol" || semicolon.value !== ";") {
        throw new Error(`Parse error: expected the symbol ';'  but got ${semicolon.value} of type ${semicolon.type}.`);
    }
    return semicolon;
}


module.exports = parse;