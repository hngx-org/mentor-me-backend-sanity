import { CONFIGS } from "@/configs";
import DefaultLayout from "@/email-templates/layouts/default-layout";
import { Text, Button, Heading, Section } from "@react-email/components";

interface EmailProp {
    fullName: string;
    resetLink: string;
}

export default function Email({ fullName, resetLink }: EmailProp) {
    return (
        <DefaultLayout>
            <Section style={{ padding: "16px 16px 0px 16px" }}>
                <Heading as="h3">Reset Password</Heading>

                <Text>Hi {fullName}, ⚡️</Text>

                <Text>
                    Click the link below to reset your password. This link expires in <b>{(Number(CONFIGS.DEFAULT_DB_TOKEN_EXPIRY_DURATION) / 60000).toFixed(0)} minutes.</b>
                </Text>

                <Button
                    href={resetLink}
                    style={{
                        width: "180px",
                        height: "45px",
                        padding: "10px 20px",
                        backgroundColor: "#121212",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "10px",
                        textAlign: "center",
                        fontWeight: "bold",
                        position: "relative",
                    }}
                >
                    <span
                        style={{
                            display: "block",
                            paddingTop: "14.5px",
                        }}
                    >
                        Reset your password
                    </span>
                </Button>
                <Text>Thanks!</Text>
            </Section>
        </DefaultLayout>
    );
}
