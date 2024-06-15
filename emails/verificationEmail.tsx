import { Html, Head, Preview, Heading, Row, Section, Text, Button } from "@react-email/components";

interface verificationEmailProps{
    username: string,
    otp:string,
}

export default function VerificationEmail({username,otp}:verificationEmailProps) {
    return (
        <Html lang="en">
            <Head>
                <title>Verification Code</title>
            </Head>
            <Preview>Here&apos;s your verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering. Please use the following verification code to complete your registration.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        {otp}
                    </Text>
                </Row>
                <Row>
                    <Text>
                        If you did not request this code, please ignore this email.
                    </Text>
                </Row>
            </Section>
        </Html>
    )
}