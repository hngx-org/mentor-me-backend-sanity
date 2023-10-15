import DefaultLayout from "@/email-templates/layouts/default-layout";
import { Text, Heading, Section } from "@react-email/components";

interface EmailProp {
    fullName: string;
    verificationCode: string;
}

export default function Email({ fullName, verificationCode }: EmailProp) {
    return (
        <DefaultLayout>
            <Section style={{ padding: "16px 16px 0px 16px" }}>
                <Heading as="h2">Hi {fullName}, ⚡️</Heading>

                <Text>We're really excited to have you on board.</Text>

                <Text>We need you to verify the email address you used in signing up. We'll be sending notifications, tips and updates to this email address. Please click the button below to verify.</Text>

                <Heading as="h3" style={{ textAlign: "center", letterSpacing: "2px", fontSize: "20px" }}>
                    {verificationCode}
                </Heading>

                <Text>Thanks!</Text>
            </Section>
        </DefaultLayout>
    );
}
