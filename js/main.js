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