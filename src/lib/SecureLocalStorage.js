import SecureLS from "secure-ls";

export const LS = new SecureLS({
  encodingType: "rc4",
  encryptionSecret: "ECartS1",
  isCompression: false,
});
