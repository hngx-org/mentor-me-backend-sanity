import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import AWS from "aws-sdk";
import { CONFIGS } from "@/configs";

let transporter: Transporter;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createTransporter(): void {
    if (!CONFIGS.MAILER.SMTP_HOST) throw new Error("SMTP_HOST config not found");
    if (!CONFIGS.MAILER.SMTP_PORT) throw new Error("SMTP_PORT config not found");
    if (!CONFIGS.MAILER.SMTP_USER) throw new Error("SMTP_USER config not found");
    if (!CONFIGS.MAILER.SMTP_PASSWORD) throw new Error("SMTP_PASSWORD config not found");

    AWS.config.update({
        accessKeyId: CONFIGS.AWS.ACCESS_KEY_ID,
        secretAccessKey: CONFIGS.AWS.SECRET_ACCESS_KEY,
        region: CONFIGS.AWS.REGION,
    });

    transporter = nodemailer.createTransport({
        SES: new AWS.SES({ apiVersion: "2010-12-01" }),
    });
}

export async function verifyConnection(): Promise<void> {
    if (!transporter) {
        createTransporter();
    }

    return transporter.verify().then(() => {
        console.log(`:::> Connected to mail server - ${CONFIGS.MAILER.SMTP_HOST}:${CONFIGS.MAILER.SMTP_PORT}`);
    });
}

export async function sendMail(mailOptions: SendMailOptions): Promise<any> {
    if (!transporter) {
        createTransporter();
    }

    // Set default
    mailOptions = {
        ...mailOptions,
        from: mailOptions.from || CONFIGS.DEFAULT_EMAIL_FROM,
    };

    return transporter.sendMail(mailOptions).then((info) => {
        console.log(`:::> Mail sent: ${info.messageId}`);
        // console.log(":::> Mail info:", info);

        // Preview only available when sending through an Ethereal account
        if (CONFIGS.MAILER.SMTP_HOST === "smtp.ethereal.email") {
            console.log(`:::> Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        }

        return info;
    });
}
