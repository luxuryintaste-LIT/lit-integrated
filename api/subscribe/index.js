const { CosmosClient } = require("@azure/cosmos");
const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
    context.log('🔵 Starting newsletter subscription process');

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': context.req.headers.origin || '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Max-Age': '86400'
            }
        };
        return;
    }

    try {
        // Get email from request body
        const email = req.body.email;
        context.log('📨 Email received from request body:', email);

        if (!email) {
            context.log('❌ No email provided in the request');
            context.res = {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': context.req.headers.origin || '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: { error: "Email is required" }
            };
            return;
        }

        // Initialize Cosmos DB client
        const cosmosEndpoint = process.env.COSMOS_DB_ENDPOINT;
        const cosmosKey = process.env.COSMOS_DB_KEY;
        context.log('🔧 Cosmos DB endpoint:', cosmosEndpoint ? '✔️ Found' : '❌ Missing');
        context.log('🔧 Cosmos DB key:', cosmosKey ? '✔️ Found' : '❌ Missing');

        const cosmosClient = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
        const database = cosmosClient.database("luxuryintaste");
        const container = database.container("subscribers");
        context.log('✅ Connected to Cosmos DB');

        // Check if email already exists
        context.log(`🔍 Checking if email ${email} already exists in DB`);
        const { resources: existingSubscribers } = await container.items
            .query(`SELECT * FROM c WHERE c.email = "${email}"`)
            .fetchAll();

        if (existingSubscribers.length > 0) {
            context.log('⚠️ Email already exists in subscribers list');
            context.res = {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': context.req.headers.origin || '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: { error: "Email already subscribed" }
            };
            return;
        }

        // Add new subscriber to Cosmos DB
        const subscriber = {
            id: email,
            email: email,
            subscriptionDate: new Date().toISOString(),
            status: "pending"
        };

        await container.items.create(subscriber);
        context.log('✅ New subscriber saved in Cosmos DB');

        // Initialize Azure Communication Services Email client
        const connectionString = process.env.ACS_CONNECTION_STRING;
        const senderEmail = process.env.EMAIL_SENDER_ADDRESS;
        const confirmationUrl = process.env.CONFIRMATION_URL || 'https://black-moss-014630a10.6.azurestaticapps.net/api/confirm';

        context.log('🔧 Email connection string:', connectionString ? '✔️ Found' : '❌ Missing');
        context.log('📤 Sender address:', senderEmail || '❌ Not found');
        context.log('🔗 Confirmation URL:', confirmationUrl || '❌ Not found');

        const emailClient = new EmailClient(connectionString);

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
                <!-- LIT Logo -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <img src="https://luxuryintaste.blob.core.windows.net/images/lit-logo-white.png" alt="LIT Logo" style="width: 100px; height: auto;">
                </div>

                <!-- Welcome Text -->
                <h1 style="color: #9333EA; text-align: center; font-size: 28px; margin-bottom: 20px;">
                    Welcome to LIT - Your Weekly Fashion Fix!
                </h1>

                <!-- Subtitle -->
                <h2 style="color: #ffffff; text-align: center; font-size: 24px; margin-bottom: 30px;">
                    Confirm Your Subscription
                </h2>

                <!-- Main Content -->
                <p style="color: #a0a0a0; font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: left;">
                    Thank you for subscribing to LIT's fashion-forward community! To complete your subscription and start receiving our weekly updates on Fast Fashion, Luxury Fashion, Sustainable Fashion, and the Sneaker Market, please confirm your email address.
                </p>

                <p style="color: #a0a0a0; font-size: 16px; line-height: 1.6; margin-bottom: 30px; text-align: left;">
                    Click the button below to confirm your subscription:
                </p>

                <!-- Confirmation Button -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <a href="${confirmationUrl}?email=${email}" style="display: inline-block; background-color: #9333EA; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                        Confirm Subscription
                    </a>
                </div>

                <p style="color: #a0a0a0; font-size: 14px; line-height: 1.6; margin-bottom: 20px; text-align: left;">
                    If the button doesn't work, you can also copy and paste this link into your browser:
                </p>
                <p style="color: #9333EA; font-size: 14px; line-height: 1.6; margin-bottom: 30px; text-align: left; word-break: break-all;">
                    ${confirmationUrl}?email=${email}
                </p>

                <!-- Team Signature -->
                <p style="color: #9333EA; text-align: center; font-size: 18px; margin-bottom: 20px;">
                    LIT Team
                </p>

                <!-- Social Media Section -->
                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #9333EA; font-size: 18px; margin-bottom: 20px;">
                        Follow Us on Socials
                    </p>
                    <div style="display: inline-block;">
                        <a href="https://linkedin.com/company/luxuryintaste" style="text-decoration: none; margin: 0 10px;">
                            <img src="https://luxuryintaste.blob.core.windows.net/images/linkedin.png" alt="LinkedIn" style="width: 40px; height: 40px;">
                        </a>
                        <a href="https://instagram.com/luxuryintaste" style="text-decoration: none; margin: 0 10px;">
                            <img src="https://luxuryintaste.blob.core.windows.net/images/instagram.png" alt="Instagram" style="width: 40px; height: 40px;">
                        </a>
                        <a href="https://facebook.com/luxuryintaste" style="text-decoration: none; margin: 0 10px;">
                            <img src="https://luxuryintaste.blob.core.windows.net/images/facebook.png" alt="Facebook" style="width: 40px; height: 40px;">
                        </a>
                        <a href="https://twitter.com/luxuryintaste" style="text-decoration: none; margin: 0 10px;">
                            <img src="https://luxuryintaste.blob.core.windows.net/images/twitter.png" alt="Twitter" style="width: 40px; height: 40px;">
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Send confirmation email
        const emailMessage = {
            senderAddress: senderEmail,
            content: {
                subject: "Confirm Your LIT Newsletter Subscription",
                html: htmlContent,
                plainText: `
Welcome to LIT - Your Weekly Fashion Fix!

Confirm Your Subscription

Thank you for subscribing to LIT's fashion-forward community! To complete your subscription and start receiving our weekly updates on Fast Fashion, Luxury Fashion, Sustainable Fashion, and the Sneaker Market, please confirm your email address.

Click the following link to confirm your subscription:
${confirmationUrl}?email=${email}

LIT Team

Follow Us on Socials:
LinkedIn: https://linkedin.com/company/luxuryintaste
Instagram: https://instagram.com/luxuryintaste
Facebook: https://facebook.com/luxuryintaste
Twitter: https://twitter.com/luxuryintaste
                `
            },
            recipients: {
                to: [{ address: email }]
            }
        };

        context.log('📨 Sending confirmation email...');
        const poller = await emailClient.beginSend(emailMessage);
        const result = await poller.pollUntilDone();

        context.log('✅ Confirmation email sent');

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': context.req.headers.origin || '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: { message: "Subscription successful! Please check your email to confirm." }
        };
    } catch (error) {
        context.log.error('❗️ Error during subscription process:', error);
        context.res = {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': context.req.headers.origin || '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: { error: "An error occurred while processing your subscription" }
        };
    }
};
