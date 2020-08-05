function generateRandomSeed(bytes) {
    bytes = bytes || 32;
    const generatedBytes = getRandomBytes(bytes);

    var res = "";
    for (var i = 0; i < bytes; i++) res += String.fromCharCode(parseInt(generatedBytes[i]));
    return res;
}

function getRandomBytes(bytes) {  
    bytes = bytes || 32;     
    var byteArray = new Uint8Array(bytes);
    window.crypto.getRandomValues(byteArray);
    return byteArray;
}

function bytesToHex(bytes) {
    const buf = Buffer.from(bytes);
    return buf.toString('hex');
}

function generateRandomPassword(seed, length) {
    length = length || 24;
    if (!seed) return false;

    const rng = new Math.seedrandom(seed);
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_=+\\|/?.>,<`~!@#$%^&*()[{]}";
    
    var res = "";
    for (var i = 0; i < length; i++) res += chars[Math.floor(rng() * chars.length)];

    return res;
}

async function fromInput(input, length, rounds) {
    length = length || 24;
    rounds = rounds || 2^8;

    rounds = rounds * length;
    
    var hash = stringToArray(input);
    for (var i = 0; i < rounds; i++) {
        if (i % 2 === 0) hash = await crypto.subtle.digest('SHA-256', hash);
        else await crypto.subtle.digest('SHA-512', hash);
    }

    console.log(bufferToHex(hash));

    var mnemonic = bip39.entropyToMnemonic(hash);
    var seed = bufferToHex(await crypto.subtle.digest('SHA-512', stringToArray(mnemonic)));
    const password = generateRandomPassword(seed, length);
    return password;
}

function bufferToHex (buffer) {
    return [...new Uint8Array (buffer)].map (b => b.toString (16).padStart (2, "0")).join ("");
}

function stringToArray(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }