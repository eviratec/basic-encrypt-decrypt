
module.exports = {
  encrypt: encryptBytes,
  decrypt: decryptBytes
};

function encryptBytes (bytes) {
  let buf = Buffer.from(bytes);
  return buf.swap16().swap32();
}

function decryptBytes (bytes) {
  let buf = Buffer.from(bytes);
  return buf.swap32().swap16();
}
