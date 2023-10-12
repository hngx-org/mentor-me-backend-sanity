import DefaultLayout from "@/email-templates/layouts/default-layout";
import { Text, Heading, Section } from "@react-email/components";

interface EmailProp {
    firstName: string;
    verificationCode: string;
}

export default function Email({ firstName, verificationCode }: EmailProp) {
    return (
        <DefaultLayout>
            <Section style={{ padding: "16px 16px 0px 16px" }}>
                <Heading as="h3">Verify your Email</Heading>

                <Text>Hi {firstName},</Text>

                <Text>Click the link below to verfiy your account.</Text>

                <Heading as="h3" style={{ textAlign: "center", letterSpacing: "2px", fontSize: "20px" }}>
                    {verificationCode}
                </Heading>

                <Text>Thanks!</Text>
            </Section>
        </DefaultLayout>
    );
}
