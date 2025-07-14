const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol
} = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');

// 🔐 Environment variables
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = 'product-images';

// 🔗 Clients and credentials
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);
const sharedKeyCredential = new StorageSharedKeyCredential(
  AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_ACCOUNT_KEY
);

// 📦 Upload and return temporary SAS URL
async function uploadImageToAzure(buffer, mimetype, originalName) {
  const extension = originalName.split('.').pop();
  const blobName = `${uuidv4()}.${extension}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: {
      blobContentType: mimetype,
    },
  });

  // 📅 Set SAS expiry to 12 months from now
  const expiresOn = new Date();
  expiresOn.setFullYear(expiresOn.getFullYear() + 1); // 12 months from now

  const sasToken = generateBlobSASQueryParameters({
    containerName,
    blobName,
    permissions: BlobSASPermissions.parse('r'), // Read-only
    expiresOn,
    protocol: SASProtocol.Https,
  }, sharedKeyCredential).toString();

  return `${blockBlobClient.url}?${sasToken}`;
}
module.exports = { uploadImageToAzure };